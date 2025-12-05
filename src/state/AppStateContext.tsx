import { createContext, use } from "react";
import type { ReactNode } from "react";
import { usePageState } from "./usePageState";
import { withInitialState } from "./withInitialState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: Page;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }: AppStateProviderProps) => {
    const pageStateHandler = usePageState(initialState);
    return (
      <AppStateContext value={pageStateHandler}>{children}</AppStateContext>
    );
  },
);

export const useAppState = () => {
  const context = use(AppStateContext);
  if (!context) {
    throw new Error(
      "usePageState must be used within a AppStateContextProvider",
    );
  }
  return context;
};
