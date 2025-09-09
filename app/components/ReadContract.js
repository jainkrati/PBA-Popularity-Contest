"use client";

import React, { useState, useEffect } from "react";
import { getPopularityContract } from "../utils/contract";

const ReadContract = () => {
  const [storedNumber, setStoredNumber] = useState(null);
  const [mostPopularStudent, setMostPopularStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to read data from the blockchain
    const fetchData = async () => {
      try {
        setLoading(true);
        const popularityContract = getPopularityContract();

        const mostPopularStudent =
          await popularityContract.getMostPopularStudent();
        setMostPopularStudent(mostPopularStudent);

        setError(null);
      } catch (err) {
        console.error("Error fetching stored number:", err);
        setError("Failed to fetch data from the contract");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll for updates every 10 seconds to keep UI in sync with blockchain
    const interval = setInterval(fetchData, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-pink-500 rounded-lg p-4 shadow-md bg-white text-pink-500 max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">PBA 7 Data</h2>
      {loading ? (
        <div className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="text-center">
          <p className="text-sm font-mono bg-pink-100 px-2 py-1 rounded-md text-pink-700">
            <strong>Most Popular Student:</strong> {mostPopularStudent}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadContract;
