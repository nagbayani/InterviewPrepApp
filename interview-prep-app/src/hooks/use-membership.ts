"use client";
import React, { useState, useEffect } from "react";

// Define the type for the membership object
type Membership = {
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string; // Or Date if you want to parse it directly as a Date object
};

const useMembership = () => {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const fetchMembership = async () => {
    try {
      const response = await fetch("/api/stripe");

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch membership status");
      }

      const data = await response.json();

      // Set the membership data
      setMembership({
        status: data.subscriptionStatus,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
        currentPeriodEnd: data.currentPeriodEnd,
      });
    } catch (err: any) {
      // Handle any errors
      setError(
        err.message || "An error occurred in fetching membership status"
      );
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch membership once on component mount
    fetchMembership();
  }, []); // Only run once on mount

  return { membership, loading, error };
};

export default useMembership;
