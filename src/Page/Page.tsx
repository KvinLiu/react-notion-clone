import { useFocusedNodeIndex } from "./useFocusedNodeIndex";
import { Cover } from "./Cover";
import { Title } from "./Title";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../Node/NodeContainer";
import { nanoid } from "nanoid";
import { useAppState } from "../state/AppStateContext";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Page = () => {
  const {
    title,
    nodes,
    addNode,
    reorderNodes,
    setTitle,
    cover,
    setCoverImage,
  } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };
  return (
    <>
      <Cover filePath={cover} changePageCover={setCoverImage} />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
      </div>
      <DndContext onDragEnd={handleDragEvent}>
        <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
          {nodes.map((node, index) => (
            <NodeContainer
              key={node.id}
              node={node}
              isFocused={focusedNodeIndex === index}
              updateFocusedIndex={setFocusedNodeIndex}
              index={index}
            />
          ))}
        </SortableContext>
        <DragOverlay />
      </DndContext>
      <Spacer
        showHint={!nodes.length}
        handleClick={() =>
          addNode({ type: "text", value: "", id: nanoid() }, nodes.length)
        }
      />
    </>
  );
};
