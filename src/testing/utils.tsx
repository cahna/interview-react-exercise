import { ReactNode } from "react";
import { IntlProvider } from "react-intl";

export const withIntlProvider = (children: ReactNode) => (
  <IntlProvider locale="en">{children}</IntlProvider>
);
