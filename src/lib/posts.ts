import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData, PostMeta } from "./types";
import { POSTS_DIRECTORY } from "./config";

export function getAllPostsData(): PostData[] {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  const allPostsData: PostData[] = fileNames
    .filter((fileName) => /\.md$/.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as PostMeta),
      };
    });

  return allPostsData;
}

function sortPostsByDate(posts: PostData[]): PostData[] {
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

export function getAllPostIds(): { id: string }[] {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ""),
    };
  });
}
