import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CategoryNavigation } from "../components/category-navigation";
import { CommunityPoll } from "../components/community-poll";
import { FooterMenu } from "../components/footer-menu";
import { HeaderLinks } from "../components/header-links";
import { HeaderMenu } from "../components/header-menu";
import { ManufacturersNavigation } from "../components/manufacturers-navigation";
import { NewsletterInput } from "../components/newsletter-input";
import { PopularTags } from "../components/popular-tags";
import { SearchBox } from "../components/search-box";

export class HomePage extends BasePage {
  readonly searchBox: SearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly manufacturersNavigation: ManufacturersNavigation;
  readonly popularTags: PopularTags;
  readonly newsletterInput: NewsletterInput;
  readonly communityPoll: CommunityPoll;
  readonly footerMenu: FooterMenu;

  constructor(page: Page) {
    super(page);

    this.pageURL = "/";

    // Page components objects initialization
    this.searchBox = new SearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);

    this.categoryNavigation = new CategoryNavigation(page);
    this.manufacturersNavigation = new ManufacturersNavigation(page);
    this.popularTags = new PopularTags(page);

    this.newsletterInput = new NewsletterInput(page);
    this.communityPoll = new CommunityPoll(page);

    this.footerMenu = new FooterMenu(page);
  }

  async goto() {
    await this.page.goto(this.pageURL);
  }
}
