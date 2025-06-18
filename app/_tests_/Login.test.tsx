import React from 'react';
import { render } from '@testing-library/react';
import Login from "../Login"


const customRender = (ui: React.ReactElement) => {
  return render(ui);
};

describe('LoginScreen', () => {
  it('visar inputfält för email', () => {
    const { getByTestId } = customRender(<Login />);
    const emailInput = getByTestId('email-input');
    expect(emailInput).toBeTruthy();
  });

  it('visar inputfält för password', () => {
    const { getByTestId } = customRender(<Login />);
    const passwordInput = getByTestId('password-input');
    expect(passwordInput).toBeTruthy();
  });
});
