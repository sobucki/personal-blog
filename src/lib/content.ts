import path from "path";
import fs from "fs";
import { remark } from "remark";
import matter from "gray-matter";
import html from "remark-html";
import { PostData, PostMeta } from "./types";
import { POSTS_DIRECTORY } from "./config";

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);

  let fileContents: string;

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(
        `O post "${id}" não foi encontrado no diretório de posts.`
      );
    } else {
      throw new Error(
        `Erro ao ler o arquivo do post "${id}": ${(error as Error).message}`
      );
    }
  }

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const { title, date } = matterResult.data as {
    title: string;
    date: string;
  };

  if (!title || !date) {
    throw new Error(`O post "${id}" está faltando o campo "title" ou "date".`);
  }

  return {
    id,
    contentHtml,
    ...(matterResult.data as PostMeta),
  };
}
