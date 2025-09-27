// ChunkFetcher.js
import React, { useEffect, useState } from "react";
import {
  splitCodeMarkupRecursivelyByCharacter,
  splitTextByCharacter,
  splitTextRecursivelyByCharacter,
} from "@/utils/splitters";
import { convertDocumentsToChunkData } from "@/utils/chunkUtils";
import { Document } from "langchain/document";
import { useConfigContext } from "@/contexts/config-context";
import { useVisualizationContext } from "@/contexts/visualization-context";

const ChunkFetcher = (props: { children: any }) => {
  const config = useConfigContext();
  const { setChunks } = useVisualizationContext();
  const [chunks, setLocalChunks] = useState<Document<Record<string, any>>[]>([]);
  const { children } = props;

  useEffect(() => {
    const getChunks = async () => {
      if (!config) return;

      const {
        chunkOverlap,
        chunkSize,
        chunkingMethod,
        language,
        text,
        separator,
      } = config;

      let newChunks: Document<Record<string, any>>[] = [];

      if (chunkingMethod === "mcrcts" && language) {
        newChunks = await splitCodeMarkupRecursivelyByCharacter(
          text,
          language,
          chunkSize,
          chunkOverlap
        );
      } else if (chunkingMethod === "cts") {
        newChunks = await splitTextByCharacter(
          text,
          separator.length > 0 ? separator[0] : "",
          chunkSize,
          chunkOverlap
        );
      } else if (chunkingMethod === "rcts") {
        newChunks = await splitTextRecursivelyByCharacter(
          text,
          separator,
          chunkSize,
          chunkOverlap
        );
      }
      
      setLocalChunks(newChunks);
      
      // Convert to ChunkData format for visualization context
      const chunkData = convertDocumentsToChunkData(newChunks);
      setChunks(chunkData);
    };

    getChunks();
  }, [config, setChunks]);

  return (
    <>
      {children(chunks, config?.chunkOverlap || 0, chunks.length, config?.text?.length || 0)}
    </>
  );
};

export default ChunkFetcher;
