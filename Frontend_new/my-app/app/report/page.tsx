"use client";

import { useState } from "react";
import MainLayout from "@/app/components/MainLayout";
import dynamic from "next/dynamic";
import submitFormData from "../components/Controllers/SubmitForm";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import OperationStatusModal from "../components/Modal/OperationStatusModal";

const DynamicHeader = dynamic(() => import("../components/Map/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const MapPage = () => {
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // alert(formData);

    const response = await submitFormData({ formData });
    console.log("Response:", response);
    document.getElementById("my_modal_1").showModal();
    setTimeout(() => {
      router.push("/reports");
    }, 3000);
    // router.push("/");
  };

  return (
    <MainLayout>
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
        <div className="flex flex-col lg:flex-row justify-center items-center md:space-x-8 space-y-12">
          <DynamicHeader onCreate={handleCreate}></DynamicHeader>
          <div className="w-full lg:w-1/2 px-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="landslideName"
                value={formData.landslideName}
                onChange={handleChange}
                placeholder="Landslide Name"
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
                placeholder="Casualties"
                className="input mb-4 border-4 border-gray-200 w-full pt-4 px-4 h-44"
              ></textarea>
              <label className="block mb-4">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:file:bg-blue-500
      dark:hover:file:bg-blue-400 border-4 border-gray-200 p-12 rounded-lg 
    "
                />
              </label>
              <button
                type="submit"
                className="btn w-full bg-purple-400 text-white"
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
