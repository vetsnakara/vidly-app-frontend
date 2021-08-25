import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

function init() {
    // todo: extract to separate module (use env variable)
    Sentry.init({
        dsn: "https://946ae83274d14d96bae9190599f11aaa@o229089.ingest.sentry.io/5925582",
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 0,
    })
}

export default {
    init,
    log: Sentry.captureException,
}
