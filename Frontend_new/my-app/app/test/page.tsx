"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import('../components/Map/Map'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  })
   
const page = () => {
  return (
    <>
      <DynamicHeader></DynamicHeader>
    </>
  );
};

export default page;
