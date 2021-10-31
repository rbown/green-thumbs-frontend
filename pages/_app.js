import '../styles/globals.css'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout title={Component.title}>
      <Component {...pageProps} />
    </Layout>
  )
}
