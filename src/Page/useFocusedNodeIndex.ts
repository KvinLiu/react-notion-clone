import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
type UseFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: UseFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      }
      if (e.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nodes]);
  return [focusedNodeIndex, setFocusedNodeIndex];
};
