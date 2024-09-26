import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { PostData, PostMeta } from "./types";

export const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: PostData[] = fileNames
    .filter((fileName) => /\.md$/.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as PostMeta),
      };
    });

  return allPostsData;
}

export function sortPostsByDate(posts: PostData[]): PostData[] {
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getSortedPostsData(): PostData[] {
  const allPostsData = getAllPostsData();
  return sortPostsByDate(allPostsData);
}

export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as PostMeta),
  };
}
