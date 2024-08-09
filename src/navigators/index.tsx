import React, { useEffect, useState } from "react";
import LoggedNavigator from "./Logged";
import NotLoggedNavigator from "./NotLogged";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";

const AppNavigator = () => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      setCurrentSession(session);
    });
    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return currentSession ? <LoggedNavigator /> : <NotLoggedNavigator />;
};

export default AppNavigator;
