"use client";
import React from "react";

export interface SignaturePreviewProps {
  signatureHtml: string;
}

export default function SignaturePreview({ signatureHtml }: SignaturePreviewProps) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-gray-50 overflow-auto" style={{ minHeight: 90 }}>
      <div dangerouslySetInnerHTML={{ __html: signatureHtml }} />
    </div>
  );
}
