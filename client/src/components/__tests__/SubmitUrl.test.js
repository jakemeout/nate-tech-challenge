import { render, screen , fireEvent} from "@testing-library/react";
import SubmitUrl from "../SubmitUrl";

test("renders SubmitURLForm submit button", () => {
  render(<SubmitUrl />);
  expect(screen.getByTestId("submiturl-form")).toBeInTheDocument();
  expect(screen.getByTestId("form-submit")).toHaveTextContent("Submit");
});

test("updates input form upon change", () => {
  render(<SubmitUrl />);
  const input = screen.getByTestId("form-input");
  fireEvent.change(input, {
    target: { value: "testy" },
  });
  expect(screen.getByDisplayValue(/testy/i)).toBeInTheDocument();
});
