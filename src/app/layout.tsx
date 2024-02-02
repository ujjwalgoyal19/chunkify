import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConfigContextProvider from "@/contexts/config-context";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chunkify",
  description: "Langchain Chunking Visualizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConfigContextProvider>{children}</ConfigContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
