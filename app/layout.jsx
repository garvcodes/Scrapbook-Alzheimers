import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "ScrapbookDB",
  description: "Scan, Memorize, then Remember",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body className = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'>
      <Provider>
        <div className='main'>
          <div className='background' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;