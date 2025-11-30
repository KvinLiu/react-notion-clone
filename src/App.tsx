import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

const initialPage = createPage();

function App() {
  return (
    <AppStateProvider initialPage={initialPage}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
