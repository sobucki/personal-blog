import mock from "mock-fs";
import { getAllPostIds, getAllPostsData, getSortedPostsData } from "../posts";
import PostsDataCase1 from "./fixture/two_posts.json";
import UnsortedPosts from "./fixture/unsorted_posts.json";
import { POSTS_DIRECTORY } from "../config";

describe("lib posts", () => {
  afterEach(() => {
    mock.restore();
  });

  describe("getAllPostsData", () => {
    it("should read all files from directory", () => {
      mock({
        [POSTS_DIRECTORY]: PostsDataCase1,
      });

      const postsId = getAllPostsData();
      expect(postsId).toEqual([
        {
          date: "2022-01-01",
          id: "post1",
          title: "Título do Post 1",
        },
        {
          date: "2022-02-01",
          id: "post2",
          title: "Título do Post 2",
        },
      ]);
    });

    it("should return a empty list when directory is empty", () => {
      mock({
        [POSTS_DIRECTORY]: {},
      });

      const postsId = getAllPostsData();
      expect(postsId).toEqual([]);
    });

    it('should ignore files that are not ".md"', () => {
      mock({
        [POSTS_DIRECTORY]: {
          "file1.md": "content",
          "file2.txt": "content",
        },
      });

      const postsId = getAllPostsData();
      expect(postsId).toEqual([
        {
          id: "file1",
        },
      ]);
    });
  });

  describe("getSortedPostsData", () => {
    it("should sort posts by date Desc", () => {
      mock({
        [POSTS_DIRECTORY]: UnsortedPosts,
      });

      const sortedPosts = getSortedPostsData();

      expect(sortedPosts).toEqual([
        {
          date: "2023-03-08",
          id: "post3",
          title: "Título do Post 3",
        },
        {
          date: "2022-11-30",
          id: "post5",
          title: "Título do Post 5",
        },
        {
          date: "2022-05-10",
          id: "post1",
          title: "Título do Post 1",
        },
        {
          date: "2021-12-15",
          id: "post2",
          title: "Título do Post 2",
        },
        {
          date: "2020-07-22",
          id: "post4",
          title: "Título do Post 4",
        },
      ]);
    });
  });

  describe("getAllPostIds", () => {
    it("should return all post ids", () => {
      mock({
        [POSTS_DIRECTORY]: PostsDataCase1,
      });

      const postsId = getAllPostIds();
      expect(postsId).toEqual([
        {
          id: "post1",
        },
        {
          id: "post2",
        },
      ]);
    });
  });
});
