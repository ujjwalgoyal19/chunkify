import type { Metadata } from "next";
import "./globals.css";
import ConfigContextProvider from "@/contexts/config-context";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConfigContextProvider>{children}</ConfigContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
