import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";
const initialPage = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider initialPage={initialPage}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider initialPage={initialPage}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
