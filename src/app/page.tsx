import CardPost from "@/components/CardPost";
import { getSortedPostsData } from "@/lib/posts";
import { PostData } from "@/lib/types";
import Link from "next/link";

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();
  console.log(allPostsData);

  return (
    <>
      <div className="space-y-4">
        {allPostsData.map(({ id, date, title, cover, summary }) => (
          <CardPost
            description={summary}
            title={title}
            key={id}
            postId={id}
            image={cover}
          />
        ))}
      </div>
    </>
  );
}
