import { getAllPostIds, getPostData, PostData } from "@/lib/posts";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function Post({ params }: PostPageProps) {
  const postData: PostData = await getPostData(params.id);

  return (
    <article className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-2">{postData.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      ></div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    id: post.id,
  }));
}
