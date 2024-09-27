export type PostMeta = {
  title: string;
  date: string;
};

export type PostData = PostMeta & {
  id?: string;
  contentHtml?: string;
};
