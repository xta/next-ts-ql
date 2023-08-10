import Header from "./header"
import Footer from "./footer"

import Head from 'next/head'
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>NextQL</title>
        <meta name='description' content='Next, React, TS, GraphQL' />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
