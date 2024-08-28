import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RightNav from "./_components/RightNav";
import Header from "./_components/Header";
import NextTopLoader from "nextjs-toploader";
import Providers from "./config/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSB Blog",
  description: "JSB blog Hi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          {props?.modal}
          <Header />
          <RightNav />
          <NextTopLoader />
          <div className="overflow-x-hidden transition-colors dark:bg-zinc-900 bg-gray-50">
            {props?.children}
          </div>
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  );
}
