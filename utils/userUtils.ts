export const getThemeIcon = (theme: string, actualTheme: string) => {
  if (theme === "system") return "phone-portrait";
  return actualTheme === "dark" ? "sunny" : "moon";
};

export const getThemeIconColor = (
  theme: string,
  actualTheme: string,
  textColor: string
) => {
  if (theme === "system") return textColor;
  return actualTheme === "dark" ? "yellow" : textColor;
};