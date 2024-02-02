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
import { ChunkMethod, Language } from "@/contexts/config-context";

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
