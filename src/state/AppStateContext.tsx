import { createContext, use } from "react";
import type { ReactNode } from "react";
import { usePageState } from "./usePageState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

type AppStateProviderProps = {
  children: ReactNode;
  initialPage: Page;
};

export const AppStateProvider = ({
  children,
  initialPage,
}: AppStateProviderProps) => {
  const pageStateHandler = usePageState(initialPage);
  return <AppStateContext value={pageStateHandler}>{children}</AppStateContext>;
};

export const useAppState = () => {
  const context = use(AppStateContext);
  if (!context) {
    throw new Error(
      "usePageState must be used within a AppStateContextProvider",
    );
  }
  return context;
};
