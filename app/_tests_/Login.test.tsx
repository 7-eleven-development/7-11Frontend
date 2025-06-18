import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Login from "../Login";
import AuthProvider from "../../context/auth/AuthProvider";

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
