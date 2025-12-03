import { useState, useEffect, createContext, use } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
type AuthSessionContextValue = {
  session: Session | null;
  loading: boolean;
};

const AuthSessionContext = createContext<AuthSessionContextValue>(
  {} as AuthSessionContextValue,
);

type AuthSessionProviderProps = {
  children: ReactNode;
};
export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
        setLoading(false);
      } else {
        console.log(error);
      }
    };
    auth();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);
  return (
    <AuthSessionContext value={{ session, loading }}>
      {children}
    </AuthSessionContext>
  );
};

export const useAuthSession = () => {
  const context = use(AuthSessionContext);
  if (!context) {
    throw new Error("useAuthSession must be used within a AuthSessionProvider");
  }
  return context;
};
