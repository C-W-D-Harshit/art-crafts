"use client";

import { updateUserField } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactDetails() {
  const { data: session, update } = useSession();
  let ses: any = session;
  const [actName, setActName] = useState(false);
  const [name, setName] = useState(ses?.user.name);
  const [actPhoneNumber, setActPhoneNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(ses?.user.phoneNumber);

  const updateName = async () => {
    const result: any = await updateUserField({ field: "name", value: name });
    if (result.error) {
      toast.error(result.error);
    }
    toast.success(result.message);
  };
  const updatePhoneNumber = async () => {
    // Assuming phoneNumber is a string or can be converted to a string
    const phoneNumberString = String(phoneNumber);

    if (!phoneNumberString || !/^\d{10}$/.test(phoneNumberString)) {
      toast.error("Invalid phone number");
      return;
    }

    const result: any = await updateUserField({
      field: "phoneNumber",
      value: phoneNumberString,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      update({ phoneNumber });
      setActPhoneNumber(false);
      toast.success(result.message);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">Contact Details</h2>
      <div className="w-full mb-4">
        <p className="text-lg font-semibold text-slate-700">Your Name</p>
        {actName ? (
          <div className="flex justify-between items-center mb-2">
            <input
              className="min-w-max text-lg font-semibold border border-slate-400 rounded-lg px-3 py-2 bg-slate-50 focus-within:border-primary"
              defaultValue={ses?.user.name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <Button
                size={"icon"}
                onClick={() => {
                  setActName(false);
                }}
              >
                <XIcon />
              </Button>
              <Button
                size={"icon"}
                onClick={() => {
                  update({ name });
                  updateName();
                  setActName(false);
                }}
              >
                <CheckIcon />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-2">
            <p className="min-w-max text-lg font-semibold">{ses?.user.name}</p>
            <Button variant={"ghost"} onClick={() => setActName(true)}>
              Change
            </Button>
          </div>
        )}

        <Separator />
      </div>
      <div className="w-full mb-4">
        <p className="text-lg font-semibold text-slate-700">Email Address</p>
        <div className="flex justify-between items-center mb-2">
          <p className="min-w-max text-lg font-semibold">{ses?.user.email}</p>
          <Button variant={"ghost"} disabled>
            Change
          </Button>
        </div>
        <Separator />
      </div>
      <div className="w-full mb-4">
        <p className="text-lg font-semibold text-slate-700">Phone Number</p>
        {actPhoneNumber ? (
          <div className="flex justify-between items-center mb-2">
            <input
              className="min-w-max text-lg font-semibold border border-slate-400 rounded-lg px-3 py-2 bg-slate-50 focus-within:border-primary"
              defaultValue={ses?.user.phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              type="number"
            />
            <div className="flex items-center gap-3">
              <Button
                size={"icon"}
                onClick={() => {
                  setActPhoneNumber(false);
                }}
              >
                <XIcon />
              </Button>
              <Button
                size={"icon"}
                onClick={() => {
                  updatePhoneNumber();
                }}
              >
                <CheckIcon />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-2">
            <p className="min-w-max text-lg font-semibold">
              {ses?.user.phoneNumber ?? 9876543210}
            </p>
            <Button variant={"ghost"} onClick={() => setActPhoneNumber(true)}>
              Change
            </Button>
          </div>
        )}

        <Separator />
      </div>
    </div>
  );
}
