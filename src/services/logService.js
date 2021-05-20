// import Raven from "raven-js";

// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://32ced3aecf2e4e388c7faaaf6256e0ee@o684877.ingest.sentry.io/5771927",
  //   integrations: [new Integrations.BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  console.log(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log,
};
