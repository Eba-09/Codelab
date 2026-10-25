'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Бүртгэлгүйгээр ахиц хадгалах — localStorage дээр id-уудын олонлог хадгална.
 * (Бодсон бодлого, үзсэн хичээл гэх мэт). Хуудас хооронд синк хийгдэнэ.
 */
const EVENT = 'local-set-change';

function read(key) {
  try {
    const raw = window.localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return null; // localStorage хаалттай
  }
}

export default function useLocalSet(key) {
  const [set, setSet] = useState(() => new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSet(read(key) ?? new Set());
    setReady(true);

    const sync = (e) => {
      if (e.type === 'storage' && e.key !== key) return;
      if (e.type === EVENT && e.detail !== key) return;
      const fresh = read(key);
      if (fresh) setSet(fresh);
    };
    window.addEventListener('storage', sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(EVENT, sync);
    };
  }, [key]);

  const toggle = useCallback(
    (id) => {
      const next = new Set(read(key) ?? set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* хадгалах боломжгүй (private mode г.м) — санах ойд л хадгална */
      }
      setSet(next);
      // Нэг хуудсан дээрх бусад компонентуудад мэдэгдэнэ
      window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
    },
    [key, set],
  );

  const has = useCallback((id) => set.has(id), [set]);

  return { set, has, toggle, ready, size: set.size };
}

export const STORAGE_KEYS = {
  solved: 'algoacademy:solved',
  watched: 'algoacademy:watched',
};
