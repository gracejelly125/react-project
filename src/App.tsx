import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import Router from "./shared/Router";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    Sentry.init({
      dsn: "https://0d2e8db2c14f4fbf732b1736eaaa5e49@o4508821675048960.ingest.de.sentry.io/4508821681274960",
      integrations: [
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1.0,
      tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }, []);

  return <Router />;
};

export default App;
