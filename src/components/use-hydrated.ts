import { useState, useEffect } from "react";
export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}
