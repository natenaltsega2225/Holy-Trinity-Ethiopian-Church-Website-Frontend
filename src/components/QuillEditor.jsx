import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const rootRef = useRef(null);
  const quillRef = useRef(null);
  const lastValueRef = useRef(value || "");

  useEffect(() => {
    if (!rootRef.current || quillRef.current) return;

    const q = new Quill(rootRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "blockquote", "code-block"],
          [{ align: [] }],
          ["clean"],
        ],
      },
    });

    quillRef.current = q;

    q.on("text-change", () => {
      const html = rootRef.current.querySelector(".ql-editor")?.innerHTML || "";
      lastValueRef.current = html;
      onChange?.(html);
    });

    // initial
    if (value) q.clipboard.dangerouslyPasteHTML(value);
  }, [onChange]);

  // external value updates (edit item)
  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;

    const incoming = value || "";
    if (incoming === lastValueRef.current) return;

    const sel = q.getSelection();
    q.clipboard.dangerouslyPasteHTML(incoming);
    lastValueRef.current = incoming;
    if (sel) q.setSelection(sel);
  }, [value]);

  return <div className="neQuillRoot" ref={rootRef} />;
}