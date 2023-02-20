import PlausibleProvider from "next-plausible"

import "../styles/globals.scss"

const App = ({ Component, pageProps }) => (
  <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>
    <Component {...pageProps} />
  </PlausibleProvider>
)

export default App
