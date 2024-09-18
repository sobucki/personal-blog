import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  contentHtml?: string;
}

const postsDirectory = path.join(process.cwd(), "src", "posts");

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const { title, date, excerpt } = matterResult.data as {
      title: string;
      date: string;
      excerpt?: string;
    };

    if (!title || !date) {
      throw new Error(
        `O post "${id}" está faltando o campo "title" ou "date" no Front Matter.`
      );
    }

    return {
      id,
      title,
      date,
      excerpt,
    };
  });

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllPostIds(): { id: string }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ""),
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

  const { title, date, excerpt } = matterResult.data as {
    title: string;
    date: string;
    excerpt?: string;
  };

  if (!title || !date) {
    throw new Error(
      `O post "${id}" está faltando o campo "title" ou "date" no Front Matter.`
    );
  }

  return {
    id,
    title,
    date,
    excerpt,
    contentHtml,
  };
}
