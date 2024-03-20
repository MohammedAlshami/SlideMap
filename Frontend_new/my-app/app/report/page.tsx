"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";

const MapPage = () => {
  const [formData, setFormData] = useState({
    landslideName: "",
    incidentDate: "",
    size: "",
    casualties: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <MainLayout>
      <div className="flex justify-center py-44 px-12">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
          <div className="w-full md:w-2/3 lg:w-1/2 mb-8 md:mb-0">
            <iframe
              width="100%"
              className="h-96 md:h-[600px]"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/2 px-4">
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
