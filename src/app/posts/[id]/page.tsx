import { getAllPostIds, getPostData, PostData } from "@/lib/posts";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function Post({ params }: PostPageProps) {
  const postData: PostData = await getPostData(params.id);

  return (
    <div>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    id: post.id,
  }));
}
