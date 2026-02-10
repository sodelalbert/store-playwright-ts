import { Locator, Page } from "@playwright/test";

export class CommunityPoll {
  readonly root: Locator;
  readonly options: Locator;
  readonly voteButton: Locator;

  constructor(page: Page) {
    this.root = page.locator(".block-poll");
    this.options = this.root.locator('input[type="radio"]');
    this.voteButton = this.root.getByRole("button", { name: "Vote" });
  }

  async vote(optionLabel: string) {
    await this.root.getByLabel(optionLabel).check();
    await this.voteButton.click();
  }

  async voteFirst() {
    await this.options.first().check();
    await this.voteButton.click();
  }
}
