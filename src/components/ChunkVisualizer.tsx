"use client";
import ChunkPill from "./ChunkPill";
import { useConfigContext } from "@/contexts/config-context";
import ChunkFetcher from "./ChunkFetcher";
import ChunkCharts from "@/components/ChunkCharts";

const ShowConfig = (props: { name: string; value: number | string }) => {
  return (
    <div className="flex flex-col">
      <h6 className="text-base font-medium text-nowrap">{props.name}</h6>
      <p className="text-base">{props.value}</p>
    </div>
  );
};

const ChunkVisualizer = () => {
  const getTextSize = (totalCharacters: number) => {
    if (totalCharacters < 300) {
      return "text-4xl leading-normal";
    } else if (totalCharacters < 500) {
      return "text-3xl leading-normal";
    } else if (totalCharacters < 700) {
      return "text-2xl leading-normal";
    } else {
      return "text-xl leading-relaxed";
    }
  };

  const getChunkOverlapText = (
    text: string,
    index: number,
    chunkOverlap: number,
    totalChunks: number
  ) => {
    let uniquePart = text;
    let overlapPart;
    let overlap = true;
    // for (let sep of config.separator) {
    //   if (sep !== "") {
    //     overlap = false;
    //     break;
    //   }
    // }

    if (overlap) {
      if (index == 0 && index === totalChunks - 1) {
        uniquePart = text;
      } else if (index === 0) {
        uniquePart = text.slice(0, text.length - chunkOverlap);
        overlapPart = text.slice(text.length - chunkOverlap);
      } else if (index !== totalChunks - 1) {
        uniquePart = text.slice(chunkOverlap, text.length - chunkOverlap);
        overlapPart = text.slice(text.length - chunkOverlap);
      } else {
        uniquePart = text.slice(chunkOverlap);
        overlapPart = "";
      }
    }

    return { uniquePart, overlapPart };
  };

  return (
    <div className="w-full flex flex-row-reverse gap-20">
      <ChunkFetcher>
        {(
          chunks: any,
          chunkOverlap: number,
          totalChunks: number,
          totalCharacters: number
        ) => (
          <>
            <div className="flex flex-col gap-6 w-fit pr-6">
              <ShowConfig name="Chunks" value={totalChunks} />
              <ShowConfig name="Characters" value={totalCharacters} />
            </div>
            <div
              className={`${getTextSize(
                totalCharacters
              )} break-words break-all  w-full text-[#d4d4d4]`}
            >
              {chunks.map((chunk: any, index: number) => {
                const { uniquePart, overlapPart } = getChunkOverlapText(
                  chunk.pageContent,
                  index,
                  chunkOverlap,
                  totalChunks
                );
                return (
                  <ChunkPill
                    key={index}
                    variant={(index % 4) as 0 | 1 | 2 | 3 | null | undefined}
                    uniquePart={uniquePart}
                    overlapPart={overlapPart}
                  />
                );
              })}
            </div>
            <ChunkCharts chunks={chunks} />
          </>
        )}
      </ChunkFetcher>
    </div>
  );
};

export default ChunkVisualizer;
