import {
  buildSlackPostMessage,
  buildSlackErrorMessage,
} from "../../src/modules/slack";

describe("modules/slack", () => {
  describe("buildSlackPostMessage", () => {
    it("should include all info", () => {
      const result = buildSlackPostMessage(
        ["slackUser1"],
        "title",
        "link",
        "message",
        "sender_github_username"
      );

      expect(result).toEqual(
        `<@slackUser1> __title__ について sender_github_username からメンションされました :bell:
<link|GitHubで詳細を確認する>
> message`
      );
    });

    it("should be correct format with blockquotes", () => {
      const result = buildSlackPostMessage(
        ["slackUser1"],
        "title",
        "link",
        "> message\nhello",
        "sender_github_username"
      );

      expect(result).toEqual(
        `<@slackUser1> __title__ について sender_github_username からメンションされました :bell:
<link|GitHubで詳細を確認する>
>
> > message
> hello`
      );
    });

    it("should be correct format with blockquotes2", () => {
      const result = buildSlackPostMessage(
        ["slackUser1"],
        "title",
        "link",
        "message\n> hello",
        "sender_github_username"
      );

      expect(result).toEqual(
        `<@slackUser1> __title__ について sender_github_username からメンションされました :bell:
<link|GitHubで詳細を確認する>
> message
> > hello`
      );
    });
  });

  describe("buildSlackErrorMessage", () => {
    it("should include all info", () => {
      const e = new Error("dummy error");
      const result = buildSlackErrorMessage(e);

      expect(result.includes("dummy error")).toEqual(true);
    });
  });
});
