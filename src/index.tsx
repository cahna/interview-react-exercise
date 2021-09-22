import { render } from "react-dom";
import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/add-all-tz.js";

import { App } from "./App";

const rootElement = document.getElementById("root");

// https://formatjs.io/docs/polyfills/intl-datetimeformat/
if ("__setDefaultTimeZone" in Intl.DateTimeFormat) {
  (Intl.DateTimeFormat as any).__setDefaultTimeZone("America/Los_Angeles");
}

render(<App />, rootElement);
