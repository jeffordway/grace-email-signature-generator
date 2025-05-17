"use client";
import React from "react";

export interface SignatureFormProps {
  fullName: string;
  title: string;
  mobile: string;
  office: string;
  onChange: (field: string, value: string) => void;
}

export default function SignatureForm({
  fullName,
  title,
  mobile,
  office,
  onChange,
}: SignatureFormProps) {
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
              className="w-full border border-[--color-primary] rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2"
              value={mobile}
              onChange={e => onChange("mobile", e.target.value)}
              placeholder="e.g., +1-555-0102"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="office" className="block mb-2 font-semibold text-[--color-foreground]">Office Phone <span className="text-gray-400">(Optional)</span>:</label>
            <input
              type="tel"
              id="office"
              className="w-full border border-[--color-primary] rounded px-3 py-2 bg-[--color-white] text-[--color-foreground] focus:outline-none focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary] mb-2"
              value={office}
              onChange={e => onChange("office", e.target.value)}
              placeholder="e.g., +1-555-0103"
              autoComplete="tel"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
