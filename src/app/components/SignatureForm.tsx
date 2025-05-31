"use client";
import React, { useState } from "react";
import { z } from "zod";
import { formatPhoneNumber } from "../utils/phone";


export interface SignatureFormProps {
  fullName: string;
  title: string;
  mobile: string;
  office: string;
  onChange: (field: string, value: string) => void;
}

const phoneSchema = z.string().optional().refine(
  (val) => {
    if (!val) return true;
    const digits = val.replace(/\D/g, "");
    return digits.length === 10;
  },
  {
    message: "Please enter a valid 10-digit phone number."
  }
);



export default function SignatureForm({
  fullName,
  title,
  mobile,
  office,
  onChange,
}: SignatureFormProps) {
  const [mobileError, setMobileError] = useState<string>("");
  const [officeError, setOfficeError] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    // Always strip to digits, format for display, and validate digits only
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const result = phoneSchema.safeParse(digits);
    if (field === "mobile") {
      setMobileError(result.success ? "" : result.error.issues[0].message);
      onChange(field, digits); // Pass only digits to parent
    } else if (field === "office") {
      setOfficeError(result.success ? "" : result.error.issues[0].message);
      onChange(field, digits);
    } else {
      onChange(field, value);
    }
  };

  return (
    <form className="mb-8" onSubmit={e => e.preventDefault()}>
      <fieldset className="mb-6 p-4 border-2 border-[--color-primary] rounded-xl">
        <legend className="text-lg font-semibold px-2 text-[--color-primary]">Your Details:</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-[--color-foreground]">Full Name:</label>
            <input
              type="text"
              id="name"
              className="w-full border border-[--color-primary] rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2"
              value={fullName}
              onChange={e => onChange("fullName", e.target.value)}
              placeholder="e.g., Alex Stone"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="title" className="block mb-2 font-semibold text-[--color-foreground]">Title/Role:</label>
            <input
              type="text"
              id="title"
              className="w-full border border-[--color-primary] rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2"
              value={title}
              onChange={e => onChange("title", e.target.value)}
              placeholder="e.g., Office Manager"
              autoComplete="organization-title"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-2 font-semibold text-[--color-foreground]">Mobile Phone <span className="text-gray-400">(Optional)</span>:</label>
            <input
              type="tel"
              id="mobile"
              className={`w-full border ${mobileError ? 'border-red-500' : 'border-[--color-primary]'} rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2`}
              value={formatPhoneNumber(mobile)}
              onChange={e => handleInputChange("mobile", e.target.value)}
              placeholder="(555) 555-5555"
              autoComplete="tel"
            />
            {mobileError && <div className="text-red-600 text-sm mb-2">{mobileError}</div>}
          </div>
          <div>
            <label htmlFor="office" className="block mb-2 font-semibold text-[--color-foreground]">Office Phone <span className="text-gray-400">(Optional)</span>:</label>
            <input
              type="tel"
              id="office"
              className={`w-full border ${officeError ? 'border-red-500' : 'border-[--color-primary]'} rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2`}
              value={formatPhoneNumber(office)}
              onChange={e => handleInputChange("office", e.target.value)}
              placeholder="(555) 555-5555"
              autoComplete="tel"
            />
            {officeError && <div className="text-red-600 text-sm mb-2">{officeError}</div>}
          </div>
        </div>
      </fieldset>
    </form>
  );
}
