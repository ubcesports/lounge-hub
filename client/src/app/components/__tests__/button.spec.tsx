import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../button";

describe("Button component", () => {
  it("should render a button with the correct label", () => {
    render(<Button onClick={() => {}} label="Click me" />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });
});
