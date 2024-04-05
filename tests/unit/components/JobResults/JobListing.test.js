import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { it } from "vitest";

describe("Job Listing", () => {
  const createJobProps = (jobProps) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Code"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };
  it("renders job title", () => {
    const jobProps = createJobProps();
    renderJobListing(jobProps);

    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJobProps();
    renderJobListing(jobProps);
    expect(screen.getByText("AirBnB")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({
      locations: ["Orlando", "Jacksonville"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("Jacksonville")).toBeInTheDocument();
  });

  it("redners job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});
