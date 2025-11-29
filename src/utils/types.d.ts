type NodeType =
  | "text"
  | "image"
  | "list"
  | "page"
  | "code"
  | "heading1"
  | "heading2"
  | "heading3";

type NodeData = {
  id: string;
  type: NodeType;
  value: string;
};

type Page = {
  id: string;
  slug: string;
  title: string;
  nodes: NodeData[];
  cover: string;
};
