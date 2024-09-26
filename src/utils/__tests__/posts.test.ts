import { getAllPostIds, getAllPostsData, postsDirectory } from "../posts";
import mock from "mock-fs";
import PostsDataCase1 from "./fixture/two_posts.json";

describe("posts", () => {
  afterEach(() => {
    mock.restore();
  });
  describe("getAllPostsData", () => {
    it("should read all files from directory", () => {
      mock({
        [postsDirectory]: PostsDataCase1,
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
        [postsDirectory]: {},
      });

      const postsId = getAllPostsData();
      expect(postsId).toEqual([]);
    });

    it('should ignore files that are not ".md"', () => {
      mock({
        [postsDirectory]: {
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
});
