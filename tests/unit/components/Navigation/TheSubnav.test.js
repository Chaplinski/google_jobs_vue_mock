import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/navigation/TheSubnav.vue";
import { it } from "vitest";

describe("The Subnav", () => {
  const renderTheSubnav = (routeName) => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const $routeName = "JobResults";

      renderTheSubnav($routeName);

      const jobCount = screen.queryByText("1653");

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does not display job count", () => {
      const $routeName = "Home";

      renderTheSubnav($routeName);

      const jobCount = screen.queryByText("1653");

      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
