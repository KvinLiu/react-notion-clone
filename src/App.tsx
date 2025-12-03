import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";
import { Routes, Route } from "react-router-dom";
const initialPage = createPage();

const Auth = () => <div>Auth</div>;

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <AppStateProvider initialPage={initialPage}>
            <Page />
          </AppStateProvider>
        }
      />
      <Route
        path="/"
        element={
          <AppStateProvider initialPage={initialPage}>
            <Page />
          </AppStateProvider>
        }
      />
    </Routes>
  );
}

export default App;
