import { useEffect, useRef, useState } from "react";

export default function useWebWorker(workerUrl?: string) {
  const workerRef = useRef<Worker | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!workerUrl) return;
    const w = new Worker(workerUrl, { type: "module" });
    workerRef.current = w;
    w.onmessage = (e) => {
      const data = e.data;
      if (data?.progress) setProgress(data.progress);
    };
    return () => {
      w.terminate();
      workerRef.current = null;
    };
  }, [workerUrl]);

  const post = (msg: any) => workerRef.current?.postMessage(msg);

  return { post, progress, worker: workerRef.current };
}
