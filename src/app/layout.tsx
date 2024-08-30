import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RightNav from "./_components/RightNav";
import Header from "./_components/Header";
import NextTopLoader from "nextjs-toploader";
import Providers from "./config/providers";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

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
          <RightNav />
          <NextTopLoader />
          <Header />  
          
          <div className="overflow-x-hidden transition-colors dark:bg-zinc-900 bg-gray-50 min-h-[100%]">
            {props?.children}
          </div>
          <footer className="bg-gray-50 dark:bg-zinc-900 h-fit z-20 relative text-center flex m-auto p-2">
            <div className="m-auto flex text-center">
              <div>
              <Link href={"https://github.com/JSBzz/blog"} className="w-fit m-auto flex"><FaGithub size={"30"}/></Link>
              <span className="text-gray-800 dark:text-white">Copyright © 2024 JSB All right reserverd.</span>
              {/* <address className="inline-block text-white">Contact info wntjdqls9818@gmail.com</address> */}
              </div>
            </div>
            </footer>
          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  );
}
