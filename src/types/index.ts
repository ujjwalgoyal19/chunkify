export type ChunkMethod =
  | "cts"
  | "rcts"
  | "mcrcts"
  | "tts"
  | "sem"
  | "hier"
  | "llm"
  | "entity"
  | "topic"
  | "adaptive"
  | "sliding"
  | "html"
  | "json"
  | "csv"
  | "pdf"
  | "sentence"
  | "paragraph";

export type Language =
  | "cpp"
  | "go"
  | "java"
  | "js"
  | "ts"
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
  | "sol"
  | "c"
  | "cs";

// Token encoding options (simplified)
export type TokenEncoding = "cl100k_base" | "p50k_base" | string;

// Method specific configurations
export type TokenSplitterOptions = {
  chunkSize: number;
  chunkOverlap: number;
  encoding?: TokenEncoding;
  keepSeparator?: boolean;
};

export type SemanticOptions = {
  embeddingModel?: string; // model or local strategy
  similarityThreshold?: number; // 0..1
  minChunkSize?: number;
  maxChunkSize?: number;
};

export type HierarchicalOptions = {
  levels: number; // number of granularities
  baseChunkSize: number;
  overlap?: number;
};

export type LLMOptions = {
  model?: string;
  promptTemplate?: string;
  maxTokens?: number;
};

export type EntityOptions = {
  nerModel?: string;
  preserveEntities?: boolean;
  window?: number;
};

export type TopicOptions = {
  numTopics?: number;
  windowSize?: number;
};

export type AdaptiveOptions = {
  minSize: number;
  maxSize: number;
  scoringFactor?: number;
};

export type SlidingOptions = {
  chunkSize: number;
  overlap: number;
};

export type StructureOptions = {
  preserveTags?: boolean;
  tableAware?: boolean;
};

export type ChunkConfig = {
  method: ChunkMethod;
  language?: Language;
  chunkSize?: number;
  chunkOverlap?: number;
  separators?: string[];
  tokenOptions?: TokenSplitterOptions;
  semanticOptions?: SemanticOptions;
  hierarchicalOptions?: HierarchicalOptions;
  llmOptions?: LLMOptions;
  entityOptions?: EntityOptions;
  topicOptions?: TopicOptions;
  adaptiveOptions?: AdaptiveOptions;
  slidingOptions?: SlidingOptions;
  structureOptions?: StructureOptions;
};

export type FileMeta = {
  name: string;
  size: number;
  type: string;
  text?: string;
};
