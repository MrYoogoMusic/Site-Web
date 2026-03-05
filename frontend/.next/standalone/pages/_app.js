import '../src/index.css';
import { Toaster } from '../src/components/ui/sonner';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
