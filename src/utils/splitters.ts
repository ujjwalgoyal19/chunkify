import { Language, useConfigContext } from "@/contexts/config-context";
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  TokenTextSplitter,
} from "langchain/text_splitter";

import type * as tiktoken from "js-tiktoken";

export const splitTextByCharacter = async (
  text: string,
  separator: string,
  chunkSize: number,
  chunkOverlap: number
) => {
  const splitter = new CharacterTextSplitter({
    separator: separator.replace("\\n", "\n").replace("\\t", "\t"),
    chunkSize: chunkSize,
    chunkOverlap: chunkOverlap,
    keepSeparator: true,
  });
  const output = await splitter.createDocuments([text]);
  return output;
};

export const splitTextRecursivelyByCharacter = async (
  text: string,
  separators: string[],
  chunkSize: number,
  chunkOverlap: number
) => {
  // console.log(separator);
  const splitter = new RecursiveCharacterTextSplitter({
    separators: separators.map((separator) =>
      separator.replace("\\n", "\n").replace("\\t", "\t")
    ),
    chunkSize: chunkSize,
    chunkOverlap: chunkOverlap,
    keepSeparator: true,
  });
  const output = await splitter.createDocuments([text]);
  return output;
};

export const splitCodeMarkupRecursivelyByCharacter = async (
  text: string,
  language: Language,
  chunkSize: number,
  chunkOverlap: number
) => {
  const splitter = RecursiveCharacterTextSplitter.fromLanguage(language, {
    chunkSize: chunkSize,
    chunkOverlap: chunkOverlap,
    keepSeparator: true,
  });
  const output = await splitter.createDocuments([text]);
  return output;
};

export const splitTextByTokens = async (
  chunkOverlap: number = 0,
  chunkSize: number = 25,
  encodingName: tiktoken.TiktokenEncoding = "cl100k_base",
  keepSeparator: boolean = true
) => {
  const splitter = new TokenTextSplitter({
    chunkOverlap: chunkOverlap,
    chunkSize: chunkSize,
    encodingName: encodingName,
    keepSeparator: keepSeparator,
  });
};
