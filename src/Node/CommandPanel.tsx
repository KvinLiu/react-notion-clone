import { useState, useEffect } from "react";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import cx from "classnames";
import styles from "./CommandPanel.module.css";
type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading1" },
  { value: "heading2", name: "Heading2" },
  { value: "heading3", name: "Heading3" },
];

export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue)),
    );
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflows,
      })}
    >
      <div className={styles.title}>Block</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = index === selectedItemIndex;
          return (
            <li
              onClick={() => selectItem(type.value)}
              className={cx({ [styles.selected]: selected })}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
