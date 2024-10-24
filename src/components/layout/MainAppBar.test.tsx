import { render, screen } from "@testing-library/react";
import MainAppBar from "./MainAppBar";

describe("main app bar", () => {
  it("should rendeer the main app bar", () => {
    render(<MainAppBar></MainAppBar>);

    const appBarLogo = screen.getByRole("img");

    expect(appBarLogo).toBeInTheDocument();
    expect(appBarLogo.getAttribute("src")).toContain("assets/logo.svg");
  });
});
