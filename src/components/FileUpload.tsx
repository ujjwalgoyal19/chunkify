"use client";
import React from "react";
import { useConfigContext } from "@/contexts/config-context";

export default function FileUpload() {
  const ctx = useConfigContext();
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // only accept plain text-ish files: text, markdown, html, json, csv, and common code types
    const allowed = [
      "text/plain",
      "text/markdown",
      "text/html",
      "application/json",
      "text/csv",
      "application/javascript",
      "text/javascript",
      "text/x-python",
      "text/x-java-source",
      "text/x-csrc",
      "text/x-c++src",
    ];
    if (!allowed.includes(f.type) && !f.name.match(/\.(md|markdown|txt|json|csv|html|js|ts|py|java|c|cpp|cs|rs|go|php|rb|scala)$/i)) {
      // fallback: read as text but notify user
      const text = await f.text();
      ctx.changeText(text);
      ctx.addFile({ name: f.name, size: f.size, type: f.type, text });
      return;
    }

    const text = await f.text();
    ctx.changeText(text);
    ctx.addFile({ name: f.name, size: f.size, type: f.type, text });
  };
  return (
    <div>
      <label className="block text-sm">Upload</label>
      <input type="file" onChange={onFile} accept=".txt,.md,.markdown,.json,.csv,.html,.htm,.js,.ts,.py,.java,.c,.cpp,.cs,.rs,.go,.php,.rb,.scala" />
    </div>
  );
}
