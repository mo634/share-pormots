import Provider from '@/Provider'
import Nav from '@/components/nav/Nav'
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
    <Provider>
          <main className="main">
      <Nav/>
      <Component {...pageProps} />
    </main>
</Provider>
  )
}