import Login from "@/app/Login";
import AuthProvider from "@/context/auth/AuthProvider";
import { render, waitFor } from "@testing-library/react-native";

const customRender = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe("LoginScreen", () => {
  it("visar inputfält för email", async () => {
    const { getByTestId } = customRender(<Login />);

    await waitFor(() => {
      const emailInput = getByTestId("email-input");
      expect(emailInput).toBeTruthy();
    });
  });

  it("visar inputfält för password", async () => {
    const { getByTestId } = customRender(<Login />);

    await waitFor(() => {
      const passwordInput = getByTestId("password-input");
      expect(passwordInput).toBeTruthy();
    });
  });
});
