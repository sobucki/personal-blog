import mock from "mock-fs";
import { getPostData } from "../content";
import { POSTS_DIRECTORY } from "../config";
import PostDataScenarios from "./fixture/posts_data_scenarios.json";

describe("content loader", () => {
  afterEach(() => {
    mock.restore();
  });

  beforeEach(() => {
    mock({
      [POSTS_DIRECTORY]: PostDataScenarios,
    });
  });

  it("should read the correct file and return its data", async () => {
    const postData = await getPostData("valid-post");

    expect(postData).toEqual({
      id: "valid-post",
      title: "Valid Post",
      date: "2024-09-27",
      contentHtml: "<p>This is a sample content for a valid post.</p>\n",
    });
  });

  it("should throw an error if the file does not exist", async () => {
    await expect(getPostData("non-existent-post")).rejects.toThrow(
      `O post "non-existent-post" não foi encontrado no diretório de posts.`
    );
  });

  it("should throw an error if the front matter is missing 'title' or 'date'", async () => {
    await expect(getPostData("missing-fields")).rejects.toThrow(
      'O post "missing-fields" está faltando o campo "title" ou "date".'
    );
  });

  it("should process empty Markdown content without errors", async () => {
    const postData = await getPostData("empty-content");

    expect(postData).toEqual({
      id: "empty-content",
      title: "Empty Content",
      date: "2024-09-27",
      contentHtml: "",
    });
  });
});
