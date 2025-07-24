"use client";
import React, { useState } from "react";
import SignatureForm from "./components/SignatureForm";
import { formatPhoneNumber } from "./utils/phone";
import SignaturePreview from "./components/SignaturePreview";
import CopyButton from "./components/CopyButton";
import Image from "next/image";


export default function Home() {

  
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [office, setOffice] = useState("");
  const [officeExt, setOfficeExt] = useState("");
  const [copied, setCopied] = useState(false);
  

  // Handle changes from the form
  const handleFormChange = (field: string, value: string) => {
    switch (field) {
      case "fullName": setFullName(value); break;
      case "title": setTitle(value); break;
      case "mobile": setMobile(value); break;
      case "office": setOffice(value); break;
      case "officeExt": setOfficeExt(value); break;
      default: break;
    }
  };

  // Signature HTML for preview and copying
  const signatureHtml = `
<table cellpadding="0" cellspacing="0" style="font-family: 'Nunito Sans', Arial, sans-serif; color: #253d84; background: transparent;">
  <tr>
    <td style="padding-right: 16px;">
<img alt="" src="data:image/png;base64,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" width="70" height="70" style="max-width:70px; max-height:70px; display:block;" />
    </td>
    <td style="width: 1px; min-width: 1px; max-width: 1px; padding: 0; border: none; background: #253d84; height: 84px;"></td>
    <td style="vertical-align: middle; background: transparent; padding-left: 1rem;">
      <div style="font-size: 1.125rem; font-weight: 900; color: #253d84;">${fullName || "Full Name"}</div>
      <div style="font-size: .875rem; font-weight: 500; color: #253d84;">${title || "Title/Role"}</div>
      <div style="font-size: .75rem; font-weight: 500; color: #253d84;">Grace Community Church</div>
      ${(mobile || office) ? `<div style="font-size: 0.625rem; color: #253d84; display: flex; align-items: center; gap: 4px;">
        ${mobile ? `<span><span style='font-weight: bold;'>Mobile:</span> ${formatPhoneNumber(mobile)}</span>` : ''}
        ${(mobile && office) ? `<span style='font-size:1.2rem; color:#253d84;'>&middot;</span>` : ''}
        ${office ? `<span><span style='font-weight: bold;'>Office:</span> ${formatPhoneNumber(office)}${officeExt ? ` x${officeExt}` : ''}</span>` : ''}
      </div>` : ""}
    </td>
  </tr>
</table>`;


  const mainContent = (
    <main className="min-h-screen flex flex-col items-center py-8 px-2 bg-gradient-to-br" style={{backgroundImage: 'linear-gradient(135deg, #253d84, #008c8c)'}}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-4">
          <Image 
            src="/grace_logo.png" 
            alt="Grace Community Church Logo" 
            width={120} 
            height={120} 
            className="h-24 w-auto" 
            priority
          />
         </div>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-[--color-primary]">Grace Community Church</h1>
        <h2 className="text-lg font-semibold text-center mb-6 text-[--color-secondary] tracking-wide">Email Signature Generator</h2>
        <p className="text-center text-[--color-foreground] mb-8">
          <span className="block mb-2">How to use:</span>
          <span className="block">1. Fill in your details below.</span>
          <span className="block">2. Review your signature preview.</span>
          <span className="block">3. Click <span className="font-semibold">Copy Signature</span>.</span>
          <span className="block">4. <strong>Paste it into your email settings using <u>Ctrl+V</u> (Windows) or <u>Cmd+V</u> (Mac)</strong> for best results. Right-click paste may lose formatting in some email clients.</span>
        </p>
        <SignatureForm
          fullName={fullName}
          title={title}
          mobile={mobile}
          office={office}
          officeExt={officeExt}
          onChange={handleFormChange}
        />
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-[--color-secondary]">Signature Preview</h2>
          <div className="border-2 border-[--color-secondary] rounded p-4 bg-[--color-white] overflow-auto text-[--color-foreground]" style={{ minHeight: 90 }}>
            <SignaturePreview signatureHtml={signatureHtml} />
          </div>
        </div>
        <CopyButton signatureHtml={signatureHtml} copied={copied} setCopied={setCopied} />
      </div>
    </main>
  );

  return mainContent;
}


