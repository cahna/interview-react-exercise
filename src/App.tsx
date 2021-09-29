import { FC } from "react";
import { IntlProvider } from "react-intl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Messages } from "components/Messages";

const theme = createTheme();
const TRANSLATIONS = {};

export const App: FC<{}> = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <IntlProvider locale="en" messages={TRANSLATIONS}>
      <Container className="App">
        <Messages />
      </Container>
    </IntlProvider>
  </ThemeProvider>
);
