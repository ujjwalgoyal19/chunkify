export const CHUNKING_METHODS = [
  { code: "cts", name: "Character Split", category: "Basic" },
  { code: "rcts", name: "Recursive Character", category: "Basic" },
  { code: "mcrcts", name: "Code/Markup Recursive", category: "Basic" },
  { code: "tts", name: "Token Text Splitter", category: "Basic" },
  { code: "sem", name: "Semantic Chunker", category: "Semantic" },
  { code: "hier", name: "Hierarchical Chunker", category: "Semantic" },
  { code: "llm", name: "LLM-guided Chunker", category: "Semantic" },
  { code: "entity", name: "Entity-based Chunker", category: "Content-Aware" },
  { code: "topic", name: "Topic-based Chunker", category: "Content-Aware" },
  { code: "adaptive", name: "Adaptive Chunker", category: "Adaptive" },
  { code: "sliding", name: "Sliding Window Chunker", category: "Adaptive" },
  { code: "html", name: "HTML Structure-aware", category: "Structure-Aware" },
  { code: "json", name: "JSON Structure-aware", category: "Structure-Aware" },
  { code: "csv", name: "CSV Structure-aware", category: "Structure-Aware" },
  { code: "pdf", name: "PDF Layout-aware", category: "Structure-Aware" },
  { code: "sentence", name: "Sentence Boundary", category: "Content-Aware" },
  { code: "paragraph", name: "Paragraph Boundary", category: "Content-Aware" },
];

export const DEFAULTS = {
  tokenEncoding: "cl100k_base",
  semanticThreshold: 0.78,
  maxPreviewChunks: 200,
};

// lightweight metadata for UI
export const METHOD_METADATA: Record<string, { desc: string; recommended: string }> = {
  cts: { desc: "Simple fixed-size character chunks.", recommended: "When you need deterministic boundaries." },
  rcts: { desc: "Recursive character splitting by separators.", recommended: "When preserving logical separators is important." },
  mcrcts: { desc: "Code-aware recursive splitting.", recommended: "Use for source code and markup." },
  tts: { desc: "Token-based splitting (encoding aware).", recommended: "When integrating with LLM token budgets." },
  sem: { desc: "Semantic similarity based chunking.", recommended: "When semantic coherence matters." },
};

export default CHUNKING_METHODS;
import {
  CPlusPlusIcon,
  GoIcon,
  HTMLIcon,
  JavaIcon,
  JavascriptIcon,
  LatexIcon,
  MarkdownIcon,
  PHPIcon,
  PythonIcon,
  RubyIcon,
  RustIcon,
  ScalaIcon,
} from "@/assets/images";
import { ChunkMethod, Language } from "@/types";

export const ChunkingMethods = [
  { code: "cts" as ChunkMethod, name: "Character Text Splitter" },
  { code: "rcts" as ChunkMethod, name: "Recursive Text Splitter" },
  {
    code: "mcrcts" as ChunkMethod,
    name: "Code & Markdown Recursive Character Text Splitter",
  },
];

export const LangchainSplitterLanguages = [
  { code: "cpp" as Language, name: "C++", icon: CPlusPlusIcon },
  { code: "go" as Language, name: "GoLang", icon: GoIcon },
  { code: "java" as Language, name: "Java", icon: JavaIcon },
  { code: "js" as Language, name: "Javascript", icon: JavascriptIcon },
  { code: "php" as Language, name: "PHP", icon: PHPIcon },
  { code: "python" as Language, name: "Python", icon: PythonIcon },
  { code: "ruby" as Language, name: "Ruby", icon: RubyIcon },
  { code: "rust" as Language, name: "Rust", icon: RustIcon },
  { code: "scala" as Language, name: "Scala", icon: ScalaIcon },
  // { code: "swift", name: "Swift", icon: Swif },
  { code: "markdown" as Language, name: "Markdown", icon: MarkdownIcon },
  { code: "latex" as Language, name: "Latex", icon: LatexIcon },
  { code: "html" as Language, name: "HTML", icon: HTMLIcon },
];
