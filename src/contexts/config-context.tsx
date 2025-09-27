"use client";
import type {
  ChunkConfig,
  ChunkMethod,
  FileMeta,
  Language,
  TokenEncoding,
} from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

type ConfigContextType = {
  // original fields for backward compat
  chunkingMethod: ChunkMethod;
  changeChunkingMethod: (_: ChunkMethod) => void;
  chunkSize: number;
  changeChunkSize: (_: number) => void;
  chunkOverlap: number;
  changeChunkOverlap: (_: number) => void;
  separators: string[];
  changeSeparator: (_: string) => void;
  // legacy single-name alias used across components
  separator: string[];
  // code/markup language selection
  language?: Language;
  changeLanguage: (_: Language) => void;
  text: string;
  changeText: (_: string) => void;
  // new structured config
  chunkConfig: ChunkConfig;
  updateChunkConfig: (patch: Partial<ChunkConfig>) => void;
  // file upload metadata
  files: FileMeta[];
  addFile: (file: FileMeta) => void;
  removeFile: (name: string) => void;
  // performance / advanced
  tokenEncoding: TokenEncoding;
  setTokenEncoding: (enc: TokenEncoding) => void;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export default function ConfigContextProvider({ children }: Props) {
  const [text, setText] = useState("");
  const [chunkingMethod, setChunkingMethod] = useState<ChunkMethod>("cts");
  const [chunkSize, setChunkSize] = useState(300);
  const [chunkOverlap, setChunkOverlap] = useState(0);
  const [separators, setSeparators] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language | undefined>(undefined);

  const [chunkConfig, setChunkConfig] = useState<ChunkConfig>({
    method: "cts",
    chunkSize: 300,
    chunkOverlap: 0,
  });

  const [files, setFiles] = useState<FileMeta[]>([]);
  const [tokenEncoding, setTokenEncodingState] =
    useState<TokenEncoding>("cl100k_base");

  const changeText = useCallback((text: string) => {
    setText(text);
  }, []);

  const changeChunkingMethod = useCallback((code: ChunkMethod) => {
    setChunkingMethod(code);
    setChunkConfig((s) => ({ ...s, method: code }));
  }, []);

  const changeChunkSize = useCallback(
    (cs: number) => {
      setChunkSize(cs);
      setChunkConfig((s) => ({ ...s, chunkSize: cs }));
      if (chunkOverlap >= cs * 0.5) {
        setChunkOverlap(Math.floor(cs * 0.45));
        setChunkConfig((s) => ({ ...s, chunkOverlap: Math.floor(cs * 0.45) }));
      }
    },
    [chunkOverlap]
  );

  const changeChunkOverlap = useCallback(
    (co: number) => {
      if (co >= chunkSize * 0.5) {
        toast(
          `Chunk Overlap can not be greater than ${Math.floor(chunkSize * 0.5)}`
        );
        setChunkOverlap(Math.floor(chunkSize * 0.5));
      } else {
        setChunkOverlap(co);
      }
      setChunkConfig((s) => ({
        ...s,
        chunkOverlap: Math.floor(Math.min(co, chunkSize * 0.5)),
      }));
    },
    [chunkSize]
  );

  const changeSeparator = useCallback((separatorsStr: string) => {
    const parts = separatorsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setSeparators(parts);
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setChunkConfig((s) => ({ ...s, language: lang }));
  }, []);

  const updateChunkConfig = useCallback((patch: Partial<ChunkConfig>) => {
    setChunkConfig((s) => ({ ...s, ...patch }));
  }, []);

  const addFile = useCallback((file: FileMeta) => {
    setFiles((s) => [...s.filter((f) => f.name !== file.name), file]);
  }, []);

  const removeFile = useCallback((name: string) => {
    setFiles((s) => s.filter((f) => f.name !== name));
  }, []);

  const setTokenEncoding = useCallback((enc: TokenEncoding) => {
    setTokenEncodingState(enc);
    setChunkConfig((s) => ({
      ...s,
      tokenOptions: { ...(s.tokenOptions ?? {}), encoding: enc } as any,
    }));
  }, []);

  const ContextValue = useMemo(
    () => ({
      chunkingMethod,
      changeChunkingMethod,
      chunkSize,
      changeChunkSize,
      chunkOverlap,
      changeChunkOverlap,
      separators,
      separator: separators,
      changeSeparator,
      language,
      changeLanguage,
      text,
      changeText,
      chunkConfig,
      updateChunkConfig,
      files,
      addFile,
      removeFile,
      tokenEncoding,
      setTokenEncoding,
    }),
    [
      chunkingMethod,
      changeChunkingMethod,
      chunkSize,
      changeChunkSize,
      chunkOverlap,
      changeChunkOverlap,
      separators,
      changeSeparator,
      language,
      changeLanguage,
      text,
      changeText,
      chunkConfig,
      updateChunkConfig,
      files,
      addFile,
      removeFile,
      tokenEncoding,
      setTokenEncoding,
    ]
  );

  return (
    <ConfigContext.Provider value={ContextValue}>
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
