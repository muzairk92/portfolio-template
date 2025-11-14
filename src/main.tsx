import { createRoot } from "@minireact";
import App from "./App";
import { applyTheme, getInitialTheme } from "@utils/theme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container #root is missing from index.html");
}

applyTheme(getInitialTheme());

const root = createRoot(rootElement);
root.render(App);
