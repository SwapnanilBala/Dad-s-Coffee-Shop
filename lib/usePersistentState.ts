"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * State backed by localStorage, safe under server rendering.
 *
 * Pages here are statically prerendered, so localStorage cannot be read during
 * render — it does not exist on the server, and reading it in a lazy initialiser
 * would make the client's first render disagree with the prerendered HTML and
 * trigger a hydration mismatch.
 *
 * `useSyncExternalStore` is React's sanctioned answer: it renders the server
 * fallback during hydration, then switches to the stored value. That also avoids
 * the cascading re-render that `setState` inside an effect causes, and gives
 * cross-tab synchronisation for free — two tabs open on the menu stay in step.
 *
 * The in-memory snapshot is authoritative once populated; localStorage is a
 * write-through cache read on first access. This keeps `getSnapshot` returning a
 * stable reference (returning a fresh object each call would loop forever) and
 * keeps the UI responsive when writes fail, as they do in private browsing.
 */

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();
const snapshots = new Map<string, unknown>();

function notify(key: string) {
  const subscribers = listeners.get(key);
  if (subscribers) for (const listener of subscribers) listener();
}

function readStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  // Held in a ref so callers may pass an inline literal without breaking memoisation.
  const fallbackRef = useRef(fallback);

  const subscribe = useCallback((onChange: Listener) => {
    let subscribers = listeners.get(key);
    if (!subscribers) {
      subscribers = new Set();
      listeners.set(key, subscribers);
    }
    subscribers.add(onChange);

    // Another tab wrote this key — drop the snapshot so it is re-read.
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        snapshots.delete(key);
        onChange();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }

    return () => {
      subscribers.delete(onChange);
      if (subscribers.size === 0) listeners.delete(key);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }, [key]);

  const getSnapshot = useCallback((): T => {
    if (snapshots.has(key)) return snapshots.get(key) as T;

    const raw = readStored(key);
    let value = fallbackRef.current;
    if (raw !== null) {
      try {
        value = JSON.parse(raw) as T;
      } catch {
        // Corrupt or legacy non-JSON entry — fall back and let the next write heal it.
      }
    }
    snapshots.set(key, value);
    return value;
  }, [key]);

  const getServerSnapshot = useCallback((): T => fallbackRef.current, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved =
        typeof next === "function" ? (next as (previous: T) => T)(getSnapshot()) : next;

      snapshots.set(key, resolved);
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Quota exceeded or storage blocked. The in-memory snapshot still holds,
        // so the session behaves correctly even though it will not survive a reload.
      }
      notify(key);
    },
    [key, getSnapshot]
  );

  return [value, setValue] as const;
}
