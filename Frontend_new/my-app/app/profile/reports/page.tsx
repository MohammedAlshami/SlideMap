'use client';

import React, { useEffect, useState } from 'react';
import ProfileLayout from "../../components/ProfileLayout/ProfileLayout";

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session_auth='));
      const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
      
      const apiUrl = 'http://127.0.0.1:5000/personal_reports';
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: sessionValue })
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <ProfileLayout><p>Error: {error}</p></ProfileLayout>;
  }

  if (isLoading) {
    return <ProfileLayout><p>Loading...</p></ProfileLayout>;
  }

  return (
    <ProfileLayout>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? data.map((news, index) => (
            <a
              key={index}
              href={`/news/article?index=${news.index}`}
              className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              {news.images && news.images[0] && (
                <div className="aspect-w-16 aspect-h-11">
                  <img
                    className="w-full object-cover rounded-xl"
                    src={news.images[0]}
                    alt="Image Description"
                  />
                </div>
              )}
              <div className="my-6">
                <div className="flex w-full justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                    {news.title}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                    {news.landslide_size}kmsq
                  </h3>
                </div>
                <p className="mt-5 text-gray-600 dark:text-gray-400">
                  {news.details}
                </p>
              </div>
            </a>
          )) : <p>No data available.</p>}
        </div>
      </div>
    </ProfileLayout>
  );
}

export default Page;
