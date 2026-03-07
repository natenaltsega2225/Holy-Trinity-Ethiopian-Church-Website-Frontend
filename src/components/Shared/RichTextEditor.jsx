import React, { useEffect, useMemo, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

/**
 * RichTextEditor (Quill v2) — React 19 compatible (no react-quill)
 *
 * Props:
 * - label?: string
 * - value: string (HTML)
 * - onChange: (html: string) => void
 * - placeholder?: string
 * - height?: number (px)
 */
export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Enter details...",
  height = 220,
}) {
  const hostRef = useRef(null);
  const quillRef = useRef(null);
  const lastHtmlRef = useRef("");

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "align",
      "link",
      "image",
    ],
    []
  );

  // Init Quill once
  useEffect(() => {
    if (!hostRef.current) return;
    if (quillRef.current) return;

    const q = new Quill(hostRef.current, {
      theme: "snow",
      placeholder,
      modules,
      formats,
    });

    // Match your screenshot: compact + clean
    q.root.setAttribute("spellcheck", "true");

    // Set initial HTML
    const initial = value || "";
    q.clipboard.dangerouslyPasteHTML(initial);
    lastHtmlRef.current = q.root.innerHTML;

    // Emit changes
    q.on("text-change", () => {
      const html = q.root.innerHTML;
      if (html === lastHtmlRef.current) return;
      lastHtmlRef.current = html;

      // Quill uses <p><br></p> for empty
      const normalized = html === "<p><br></p>" ? "" : html;
      onChange(normalized);
    });

    quillRef.current = q;
  }, [formats, modules, onChange, placeholder, value]);

  // Keep editor synced if parent changes value (e.g. open edit modal)
  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;

    const incoming = value || "";
    const current = q.root.innerHTML;

    // Avoid infinite loops
    if (incoming === current) return;
    if (incoming === "" && current === "<p><br></p>") return;

    const sel = q.getSelection();
    q.clipboard.dangerouslyPasteHTML(incoming);
    lastHtmlRef.current = q.root.innerHTML;

    if (sel) q.setSelection(sel);
  }, [value]);

  return (
    <div className="rte">
      {label ? <div className="rte-label">{label}</div> : null}

      <div className="rte-shell" style={{ ["--rte-h"]: `${height}px` }}>
        <div ref={hostRef} />
      </div>
    </div>
  );
}