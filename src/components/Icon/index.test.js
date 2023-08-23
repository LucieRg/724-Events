import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

describe("Icon component", () => {
  describe("When a icon is created with name twitch", () => {
    it("the icon contain this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
      render(<Icon name="twitch" />);
      expect(md5(screen.getByTestId("icon").getAttribute("d"))).toEqual(
        "327fbc38c8e878259c3ec35ef231517a"
      );
    });
  });
  describe("When an icon is created with name 'facebook'", () => {
    it("the icon contains the expected path hash value", () => {
      render(<Icon name="facebook" />);
      const expectedHash = "bbea4c9e40773b969fdb6e406059f853";
      const iconPath = screen.getByTestId("icon").getAttribute("d");
      const pathHash = md5(iconPath);
      expect(pathHash).toEqual(expectedHash);
    });
  });

  describe("When an icon is created with name 'twitter'", () => {
    it("the icon contains the expected path hash value", () => {
      render(<Icon name="twitter" />);
      const expectedHash = "82f5be4a5c07199cb75dacec50b90b2a";
      const iconPath = screen.getByTestId("icon").getAttribute("d");
      const pathHash = md5(iconPath);
      expect(pathHash).toEqual(expectedHash);
    });
  });
});
