import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <div>
      <h1>Meu Blog</h1>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
