import { useRef, useEffect } from "react";
import type {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import styles from "./BasicNode.module.css";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { changeNodeValue, removeNodeByIndex, addNode } = useAppState();
  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node, isFocused]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (e.key === "Backspace") {
      if (target.textContent?.length === 0) {
        e.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        e.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <div
      ref={nodeRef}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      contentEditable
      suppressContentEditableWarning
      className={styles.node}
    />
  );
};
