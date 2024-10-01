export type PostMeta = {
  title: string;
  date: string;
  summary: string;
  cover: string;
};

export type PostData = PostMeta & {
  id: string;
  contentHtml?: string;
};
