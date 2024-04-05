import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/navigation/MainNav.vue";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";

describe("Main Nav", () => {
  const renderMainNav = () => {
    const $route = {
      name: "Home",
    };
    render(MainNav, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcons: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };
  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map((item) => {
      return item.textContent;
    });

    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo Corp",
      "How We Hire",
      "Students",
      "Jobs",
    ]);
  });

  it("displays user profile", async () => {
    renderMainNav();

    let profileImage = screen.queryByRole("img", {
      name: /user profile image/i,
    });

    expect(profileImage).not.toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    await userEvent.click(loginButton);

    profileImage = screen.getByRole("img", {
      name: /user profile image/i,
    });

    expect(profileImage).toBeInTheDocument();
  });
});
