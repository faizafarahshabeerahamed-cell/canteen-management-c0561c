import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { StoreProvider } from "./state/store";
import Landing from "./pages/Landing";
import AppShell from "./components/AppShell";
import Overview from "./pages/Overview";
import Counter from "./pages/Counter";
import Kitchen from "./pages/Kitchen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Overview />} />
            <Route path="counter" element={<Counter />} />
            <Route path="kitchen" element={<Kitchen />} />
          </Route>
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
);
