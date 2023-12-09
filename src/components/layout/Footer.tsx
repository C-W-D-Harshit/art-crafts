/* eslint-disable react/no-unescaped-entities */
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Separator } from "../ui/separator";
import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full bg-primary text-white py-6">
      <MaxWidthWrapper>
        <div className="w-full flex flex-wrap gap-10 md:gap-40 py-3 justify-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">Need help</h3>
            <Link href={"/contact-us"}>
              <p className="mb-1 text-slate-200">Contact Us</p>{" "}
            </Link>
            <Link href={"/track-order"}>
              <p className="mb-1 text-slate-200"> Track Order</p>
            </Link>
            <Link href={"/return-&-refunds"}>
              <p className="mb-1 text-slate-200"> Returns & Refunds</p>
            </Link>
            <Link href={"/faqs"}>
              <p className="mb-1 text-slate-200"> FAQ's</p>
            </Link>
            <Link href={"/attributes"}>
              <p className="mb-1 text-slate-200"> Attributes</p>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <Link href={"/about-us"}>
              <p className="mb-1 text-slate-200">About Us</p>{" "}
            </Link>
            <Link href={"/track-order"}>
              <p className="mb-1 text-slate-200"> Track Order</p>
            </Link>
            <Link href={"/return-&-refunds"}>
              <p className="mb-1 text-slate-200"> Returns & Refunds</p>
            </Link>
            <Link href={"/faqs"}>
              <p className="mb-1 text-slate-200"> FAQ's</p>
            </Link>
            <Link href={"/attributes"}>
              <p className="mb-1 text-slate-200"> Attributes</p>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">More Info</h3>
            <Link href={"/terms-and-conditions"}>
              <p className="mb-1 text-slate-200">Terms and Conditions</p>{" "}
            </Link>
            <Link href={"/privacy-policy"}>
              <p className="mb-1 text-slate-200">Privacy Policy</p>
            </Link>
            <Link href={"/sitemap"}>
              <p className="mb-1 text-slate-200">Sitemap</p>
            </Link>
            <Link href={"/faqs"}>
              <p className="mb-1 text-slate-200"> FAQ's</p>
            </Link>
            <Link href={"/attributes"}>
              <p className="mb-1 text-slate-200"> Attributes</p>
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <Link href={"mailto:support@domain.com"}>
              <p className="mb-1 text-slate-200">support@domain.com</p>
            </Link>
            <p className="mb-1 text-slate-200">Address Line 1</p>
            <p className="mb-1 text-slate-200">Address Line 2</p>
          </div>
        </div>
        <Separator />
        <div className="w-full flex items-center justify-center py-3">
          <p className="font-semibold flex items-center gap-1.5 text-sm">
            Copyright{" "}
            <span>
              <CopyrightIcon size={18} />
            </span>{" "}
            {currentYear} Arts & Crafts. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
