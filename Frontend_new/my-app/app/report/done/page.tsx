"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";

import MainLayout from "@/components/MainLayout";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [success, setsuccess] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("success");
  if (search === "true") {
    setsuccess(true);
  }
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        {success ? (
          <p className="text-green-500">Success!</p>
        ) : (
          <div>
            <p className="text-red-500 text-3xl">
              Sorry, couldn't upload. Please go back and try again.
            </p>
            <a
              href="/report"
              className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go Back
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Page;
