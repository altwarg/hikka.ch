import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'nprogress/nprogress.css';

import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

// Top progress bar shown after click some internal link
NProgress.configure({ showSpinner: true });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
