"use client";
import "intro.js/introjs.css";

import { useState } from "react";
import MainLayout from "@/app/components/MainLayout";
import dynamic from "next/dynamic";
import submitFormData from "../components/Controllers/SubmitForm";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import OperationStatusModal from "../components/Modal/OperationStatusModal";
import { Steps, Hints } from "intro.js-react";

const DynamicHeader = dynamic(() => import("../components/Map/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const MapPage = () => {
  var steps = [
    {
      title: " Welcome",
      intro: "Welcome to react INTRO JS app",
    },
    {
      element: "#step1",
      intro: "step 2",
    },

    {
      element: "#step2",
      intro: "step 3",
    },
    {
      element: "#step3",
      intro: "step 4",
    },
    {
      element: "#step4",
      intro: "step 5",
    },
    {
      element: "#step5",
      intro: "step 6",
    },
  ];
  const router = useRouter();
  const [geoJSON, setGeoJSON] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleCreate = (data) => {
    setGeoJSON(data);
    // Update form data with GeoJSON (optional, can be done in handleChange)
    setFormData((prevData) => ({
      ...prevData,
      geoJSON: data,
    }));
  };


  const [formData, setFormData] = useState({
    landslideName: "",
    incidentDate: "",
    size: "",
    casualties: "",
    images: [],
    geoJSON: "",
    email: ""
  });

  const handleChange = (e) => {
    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_auth='));
    const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
    
  
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      email: sessionValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle form submission here
    console.log("before sending", formData);
    // alert(formData);
    document.getElementById("my_modal_1").showModal();
    const response = await submitFormData({ formData });
    console.log("Response:", response);
    
    setTimeout(() => {
      router.push("/reports");
    }, 3000);
    // router.push("/");
  };
  const onExit = () => {};

  return (
    //  <div>
         <MainLayout>
      
          {/* <Steps
            enabled={true}
            steps={steps}
            initialStep={0}
            onExit={() => steps = []}
          /> */}
        
          <div className="flex justify-center py-44 px-12">
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                  Awesome, You've just made a report
                </h3>
                <p className="py-4 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4em"
                    height="4em"
                    viewBox="0 0 24 24"
                    className="text-center mx-auto"
                  >
                    <circle cx={12} cy={2} r={0} fill="#8c00ff">
                      <animate
                        attributeName="r"
                        begin={0}
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(45 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.125s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(90 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.25s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(135 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.375s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(180 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.5s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(225 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.625s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(270 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.75s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                    <circle
                      cx={12}
                      cy={2}
                      r={0}
                      fill="#8c00ff"
                      transform="rotate(315 12 12)"
                    >
                      <animate
                        attributeName="r"
                        begin="0.875s"
                        calcMode="spline"
                        dur="1s"
                        keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                        repeatCount="indefinite"
                        values="0;2;0;0"
                      ></animate>
                    </circle>
                  </svg>
                  <br />
                  You're Being Redirect To Reports Page <br /> Hold ON..........{" "}
                </p>
              </div>
            </dialog>
            <div className="flex flex-col lg:flex-row justify-center items-center md:space-x-8 space-y-12" id="step1">
             <div id="step2">
             <DynamicHeader onCreate={handleCreate}></DynamicHeader>
             </div>
              <div className="w-full lg:w-1/2 px-4" id="step3">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="landslideName"
                    value={formData.landslideName}
                    onChange={handleChange}
                    placeholder="Report Title"
                    className="input mb-4 border-4 border-gray-200 w-full"
                  />
                  <input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    placeholder="Incident Date"
                    className="input mb-4 border-4 border-gray-200 w-full"
                  />
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Size (if known)"
                    className="input mb-4 border-4 border-gray-200 w-full"
                  />
                  <textarea
                    name="casualties"
                    value={formData.casualties}
                    onChange={handleChange}
                    placeholder="Details"
                    className="input mb-4 border-4 border-gray-200 w-full pt-4 px-4 h-44"
                  ></textarea>

                  <div className="flex items-center justify-center  mb-6" id="step4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        multiple
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn w-full bg-purple-400 text-white"
                    id="step5"
                  >
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          </div>
        </MainLayout>

  );
};

export default MapPage;
