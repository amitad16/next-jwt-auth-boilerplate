import Head from "next/head";
import NavBar from "../NavBar";

function PageLayout({ pageTitle, showNav = true, children }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {showNav && <NavBar />}

        {children}
      </main>
    </>
  );
}

export default PageLayout;
