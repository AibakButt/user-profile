import client from '@/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import 'tailwindcss/tailwind.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
  )
}
