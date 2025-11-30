import { nanoid } from "nanoid";
export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();
  const page: Page = {
    title: "Untitled",
    id,
    slug,
    nodes: [],
    cover: "ztm-cover.png",
  };
  return page;
};
