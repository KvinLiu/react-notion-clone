import { useImmer } from "use-immer";
import type { ImmerHook } from "use-immer";
import { useRef, useEffect } from "react";

export const useSyncedState = <TState>(
  initState: TState,
  syncCallback: (state: TState) => void,
): ImmerHook<TState> => {
  const [state, setState] = useImmer(initState);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state);
    }
    didMountRef.current = true;
  }, [state, setState, syncCallback]);
  return [state, setState];
};
