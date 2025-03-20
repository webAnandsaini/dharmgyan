import "../globals.css";
import "../style/style.scss";

export const metadata = {
  title: "DharmGyan",
  description: "Created By Bhaktiras Team",
};

import Header from "../compotents/Header";
import Footer from "../compotents/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="body"
      >
        <main className="wrapper">
        <Header />
         {/* Main Content Start  */}
        <div className="content">
        {children}
        </div>
        <Footer />
        </main>
      </body>
    </html>
  );
}
