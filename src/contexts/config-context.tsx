"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

export type ChunkMethod = "cts" | "rcts" | "mcrcts";
export type Language =
  | "cpp"
  | "go"
  | "java"
  | "js"
  | "php"
  | "proto"
  | "python"
  | "rst"
  | "ruby"
  | "rust"
  | "scala"
  | "swift"
  | "markdown"
  | "latex"
  | "html"
  | "sol";

type ConfigContext = {
  chunkingMethod: ChunkMethod;
  changeChunkingMethod: (_: ChunkMethod) => void;
  chunkSize: number;
  changeChunkSize: (_: number) => void;
  chunkOverlap: number;
  changeChunkOverlap: (_: number) => void;
  language: Language | undefined;
  changeLanguage: (_: Language) => void;
  separator: string[];
  changeSeparator: (_: string) => void;
};

const ConfigContext = createContext<ConfigContext | null>(null);

export default function ConfigContextProvider({ children }: Props) {
  const [chunkingMethod, setChunkingMethod] = useState<ChunkMethod>("cts");
  const [chunkSize, setChunkSize] = useState(300);
  const [chunkOverlap, setChunkOverlap] = useState(0);
  const [language, setLanguage] = useState<Language>();
  const [separator, setSeparator] = useState<string[]>([]);

  function changeChunkingMethod(code: ChunkMethod) {
    setChunkingMethod(code);
  }

  function changeChunkSize(cs: number) {
    setChunkSize(cs);
    if (chunkOverlap >= cs * 0.5) {
      setChunkOverlap(Math.floor(cs * 0.45));
    }
  }

  function changeChunkOverlap(co: number) {
    if (co >= chunkSize * 0.5) {
      toast(
        `Chunk Overlap can not be greater than ${Math.floor(chunkSize * 0.5)}`
      );
      setChunkOverlap(Math.floor(chunkSize * 0.5));
    } else {
      setChunkOverlap(co);
    }
  }

  function changeLanguage(language: Language) {
    setLanguage(language);
  }

  function changeSeparator(separators: string) {
    setSeparator(separators.split(","));
  }

  return (
    <ConfigContext.Provider
      value={{
        chunkingMethod,
        changeChunkingMethod,
        chunkSize,
        changeChunkSize,
        chunkOverlap,
        changeChunkOverlap,
        language,
        changeLanguage,
        separator,
        changeSeparator,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error(
      "useConfigContext mush be used within ConfigContextProvider"
    );
  }
  return context;
}
