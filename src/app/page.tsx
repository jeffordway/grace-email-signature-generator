"use client";
import React, { useState } from "react";
import SignatureForm from "./components/SignatureForm";
import SignaturePreview from "./components/SignaturePreview";
import CopyButton from "./components/CopyButton";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [office, setOffice] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Handle changes from the form
  const handleFormChange = (field: string, value: string) => {
    switch (field) {
      case "fullName": setFullName(value); break;
      case "title": setTitle(value); break;
      case "mobile": setMobile(value); break;
      case "office": setOffice(value); break;


      default: break;
    }
    setShowPreview(false); // Reset preview if any field changes
  };

  // Signature HTML for preview and copying
  const signatureHtml = `
<table cellpadding="0" cellspacing="0" style="font-family: Futura, Arial, sans-serif; color: #253d84; background: transparent;">
  <tr>
    <td style="padding-right: 16px;">
      <a href="https://gracesarasota.com" target="_blank" style="display: inline-block; text-decoration: none;">
        <img src="/grace_logo.png" alt="Grace Community Church Logo" style="height: 120px; width: 120px; object-fit: contain; display: block; background: transparent;" />
      </a>
    </td>
    <td style="width: 1px; min-width: 1px; max-width: 1px; padding: 0; border: none; background: #253d84; height: 90px;"></td>
    <td style="vertical-align: middle; background: transparent; padding-left: 16px;">
      <div style="font-size: 1.5em; font-weight: 900; color: #253d84;">${fullName || "Full Name"}</div>
      <div style="font-size: 1.25em; font-weight: 600; color: #253d84;">${title || "Title/Role"}</div>
      <div style="font-size: 1em; font-weight: 500; color: #253d84;">Grace Community Church</div>
      ${mobile ? `<div style="font-size: 0.75em; color: #253d84;">Cell: ${mobile}</div>` : ""}
      ${office ? `<div style="font-size: 0.75em; color: #253d84;">Office: ${office}</div>` : ""}
    </td>
  </tr>
</table>`;



  const handleGenerate = () => {
    setShowPreview(true);
  };

  const mainContent = (
    <main className="min-h-screen flex flex-col items-center py-8 px-2 bg-gradient-to-br" style={{backgroundImage: 'linear-gradient(135deg, #253d84, #008c8c)'}}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-4">
          <img src="/grace_logo.png" alt="Grace Community Church Logo" className="h-24 w-auto" />
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-[--color-primary]">Grace Community Church</h1>
        <h2 className="text-lg font-semibold text-center mb-6 text-[--color-secondary] tracking-wide">Email Signature Generator</h2>
        <p className="text-center text-[--color-foreground] mb-8">
          <span className="block mb-2">How to use:</span>
          <span className="block">1. Fill in your details below.</span>
          <span className="block">2. Click <span className="font-semibold">Generate Signature</span>.</span>
          <span className="block">3. Review your signature preview.</span>
          <span className="block">4. Click <span className="font-semibold">Copy Signature</span>.</span>
          <span className="block">5. Paste it into your email settings.</span>
          <span className="block mt-2 text-sm text-gray-600">Need help? Ask a staff member or contact support.</span>
        </p>
        <SignatureForm
          fullName={fullName}
          title={title}
          mobile={mobile}
          office={office}
          onChange={handleFormChange}
        />
        <button
          className="w-full bg-[--color-primary] hover:bg-[#1b295c] text-white font-bold py-2 px-4 rounded-lg transition-colors mb-8 shadow-sm border border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:ring-offset-2"
          onClick={handleGenerate}
          type="button"
        >
          Generate Signature
        </button>
        {showPreview && (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2 text-[--color-secondary]">Signature Preview</h2>
              <div className="border-2 border-[--color-secondary] rounded p-4 bg-[--color-white] overflow-auto text-[--color-foreground]" style={{ minHeight: 90 }}>
                <SignaturePreview signatureHtml={signatureHtml} />
              </div>
            </div>
            <CopyButton signatureHtml={signatureHtml} copied={copied} setCopied={setCopied} />
          </>
        )}
      </div>
    </main>
  );

  return mainContent;
}


