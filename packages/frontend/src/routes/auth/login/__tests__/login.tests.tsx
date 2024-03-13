/**
 * @jest-environment jsdom
 */
import "cross-fetch/polyfill";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";
import { validEmail, validPassword } from "@tm/common/lib/consts";
import { LoginInner } from "../login-inner";
import { loginErrors } from "../validation";

// const mockedUseNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...(jest.requireActual("react-router-dom") as any),
//   useNavigate: () => mockedUseNavigate,
// }));

const submitCallback = jest.fn();

const mockMessage = "mock api error";
const withError = {
  error: { data: { message: mockMessage } },
};

test("should render Login component", async () => {
  const { getByTestId, getByText } = render(
    <LoginInner onSubmit={submitCallback} queryState={withError} />,
  );
  const email = getByTestId("email");
  const password = getByTestId("password");
  const submitButton = getByTestId("loginButton");
  const errorMessage = getByText(mockMessage);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(errorMessage).toBeInTheDocument();
});

test("should have valid default email and password", async () => {
  const { getByText, getByTestId } = render(
    <LoginInner onSubmit={submitCallback} queryState={{}} />,
  );
  const email = getByTestId("email");
  const password = getByTestId("password");

  expect(email).toHaveValue(validEmail);
  expect(password).toHaveValue(validPassword);
});

test("should show validation errors", async () => {
  const { getByText, getByTestId } = render(
    <LoginInner onSubmit={submitCallback} queryState={{}} />,
  );
  const email = getByTestId("email");
  const password = getByTestId("password");
  const submitButton = getByTestId("loginButton");

  await userEvent.clear(email);
  await userEvent.clear(password);
  await userEvent.click(submitButton);

  const emailRequired = getByText(loginErrors.emailRequired);
  const passwordRequired = getByText(loginErrors.passwordRequired);

  expect(emailRequired).toBeInTheDocument();
  expect(passwordRequired).toBeInTheDocument();

  await userEvent.clear(email);
  await userEvent.type(email, "invalid.email.com");
  await userEvent.clear(password);
  await userEvent.type(password, "123");
  await userEvent.click(submitButton);

  const invalidEmail = getByText(loginErrors.invalidEmail);
  const passwordLength = getByText(loginErrors.passwordLength);

  expect(invalidEmail).toBeInTheDocument();
  expect(passwordLength).toBeInTheDocument();
});
