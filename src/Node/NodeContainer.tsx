import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";
import styles from "./NodeContainer.module.css";
type NodeContainerProps = {
  node: NodeData;
  index: number;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
};

export const NodeContainer = ({
  node,
  index,
  isFocused,
  updateFocusedIndex,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });
  const { changeNodeValue, changeNodeType, removeNodeByIndex } = useAppState();
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}
      />
    </div>
  );
};
