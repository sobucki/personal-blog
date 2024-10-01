"use client";

import { useRouter } from "next/navigation";
import { CardPostProps } from "./types";

function CardPost({ description, image, title, postId }: CardPostProps) {
  const router = useRouter();
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image || "no-cover.jpg"} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex item-center justify-between">
          <p className="flex-grow">{description}</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/posts/${postId}`)}
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPost;
