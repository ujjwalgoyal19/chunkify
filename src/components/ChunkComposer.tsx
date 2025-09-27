import Configuration from "./Configuration";
import { Textarea } from "./ui/textarea";
import { useConfigContext } from "@/contexts/config-context";

const ChunkComposer = () => {
  const config = useConfigContext();
  if (!config) return;
  const { text, changeText } = config;
  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    changeText(e.currentTarget.value);
  };
  return (
    <div className="flex flex-row gap-4 h-full">
      <div className="w-full h-80 flex flex-col gap-2">
        <h3 className="text-sm">Input</h3>
        <Textarea
          className="h-full bg-white/[0.01] resize-none"
          onInput={handleTextAreaInput}
          value={text}
          placeholder="Start writing or Ctrl+V to paste text here."
        />
      </div>
      <div className="w-full mt-8">
        <Configuration />
      </div>
    </div>
  );
};

export default ChunkComposer;
