import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5c036f4fe70f7c225e429f58cc761f66@o4510109756162048.ingest.us.sentry.io/4510109757210624",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});