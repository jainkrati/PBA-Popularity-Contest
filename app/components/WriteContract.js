"use client";

import { useState } from "react";
import { getSignedPopularityContract } from "../utils/contract";
import { ethers } from "ethers";

const WriteContract = ({ account }) => {
  const options = ["A", "B", "C", "D"];
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleStudent(name) {
    const oldStudents = students;
    setStudents(
      (oldStudents) =>
        oldStudents.includes(name)
          ? oldStudents.filter((s) => s !== name) // remove if already selected
          : [...oldStudents, name] // add if not selected
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!account) {
      setStatus({ type: "error", message: "Please connect your wallet first" });
      return;
    }

    if (!students) {
      setStatus({ type: "error", message: "Please enter list of names" });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: "info", message: "Initiating transaction..." });

      // Get a signer from the connected wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getSignedPopularityContract(signer);

      // Send transaction to blockchain and wait for user confirmation in wallet
      setStatus({
        type: "info",
        message: "Please confirm the transaction in your wallet...",
      });

      // Call the contract's voteStudents function
      const tx = await contract.voteStudents(students);

      // Wait for transaction to be mined
      setStatus({
        type: "info",
        message: "Transaction submitted. Waiting for confirmation...",
      });
      const receipt = await tx.wait();

      setStatus({
        type: "success",
        message: `Transaction confirmed! Transaction hash: ${receipt.hash}`,
      });
    } catch (err) {
      console.error("Error updating students:", err);

      // Error code 4001 is MetaMask's code for user rejection
      if (err.code === 4001) {
        setStatus({ type: "error", message: "Transaction rejected by user." });
      } else {
        setStatus({
          type: "error",
          message: `Error: ${err.message || "Failed to send transaction"}`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-pink-500 rounded-lg p-4 shadow-md bg-white text-pink-500 max-w-sm mx-auto space-y-4">
      <h2 className="text-lg font-bold">Vote your favorite students</h2>
      {status.message && (
        <div
          className={`p-2 rounded-md break-words h-fit text-sm ${
            status.type === "error"
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 mb-4">
          {options.map((name) => (
            <label key={name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={name}
                checked={Array.isArray(students) && students.includes(name)}
                onChange={() => toggleStudent(name)}
              />
              <span>{name}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !account}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-300"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
      {!account && (
        <p className="text-sm text-gray-500">
          Connect your wallet to vote your favorite students.
        </p>
      )}
    </div>
  );
};

export default WriteContract;
