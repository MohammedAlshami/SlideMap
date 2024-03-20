"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import MainLayout from "@/components/MainLayout";

const Article = () => {
  const searchParams = useSearchParams();

  const [article, setArticle] = useState(null);
  const search = searchParams.get("index");

  useEffect(() => {
    // Fetch data from API endpoint
    fetch(`http://127.0.0.1:5000/?index=${search}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if the data is an object
        if (typeof data === "object" && data !== null) {
          // Set the article data
          setArticle(data);
        } else {
          console.error("Data is not in the expected format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <MainLayout>
        {article && (
          <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-2xl">
              <div className="space-y-5 md:space-y-8">
                <h2 className="text-2xl font-bold md:text-3xl dark:text-white pt-24">
                  {article.title}
                </h2>
                {article.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-800 dark:text-gray-200"
                  >
                    {paragraph}
                  </p>
                ))}

            

                <div className="mt-4">
                  <h2 className="text-1xl font-bold md:text-3xl dark:text-white pt-8">
                    Location
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200 pt-4">
                    {article.location}
                  </p>
                  <div style={{ width: "100%" }}>
                    <iframe
                      width="100%"
                      height="600"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${article.coordinates[0]},${article.coordinates[1]}&t=&z=14&ie=UTF8&iwloc=B&output=embed&maptype=satellite`}
                      >
                      <a
                        href={`https://www.google.com/maps/@${article.coordinates[0]},${article.coordinates[1]},14z`}
                      >
                        View Larger Map
                      </a>
                    </iframe>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold dark:text-white">
                    Sources:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {article.urls.map((url, index) => (
                      <li key={index}>
                        <a href={url} className="text-blue-600 hover:underline">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Article;
