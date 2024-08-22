"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./ToastProvider";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();
export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
