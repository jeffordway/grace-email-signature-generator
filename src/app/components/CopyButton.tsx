"use client";
import React from "react";

export interface CopyButtonProps {
  signatureHtml: string;
  copied: boolean;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CopyButton({ signatureHtml, copied, setCopied }: CopyButtonProps) {
  // Handles copying the signature HTML to clipboard
  const handleCopy = () => {
    if (navigator.clipboard && window.ClipboardItem) {
      const blob = new Blob([signatureHtml], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
      navigator.clipboard.write([clipboardItem]).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        // Fallback to plain text
        navigator.clipboard.writeText(signatureHtml).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      });
    } else {
      // Fallback for browsers without ClipboardItem
      navigator.clipboard.writeText(signatureHtml).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <button
      className="w-full bg-[--color-primary] hover:bg-[#1b295c] text-white font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2"
      type="button"
      onClick={handleCopy}
    >
      {copied ? "Copied!" : "Copy Signature"}
    </button>
  );
}

