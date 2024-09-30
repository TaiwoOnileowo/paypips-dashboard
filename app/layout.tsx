import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProvider } from "@/context/AppProvider";
import QueryProvider from "./QueryProvider";
import { ModalProvider } from "@/components/ui/AnimatedModal";

export const metadata: Metadata = {
  title: "Paypips",
  description: "The future of forex group management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <QueryProvider>
          <ModalProvider>
            <AppProvider>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              {children}
            </AppProvider>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
