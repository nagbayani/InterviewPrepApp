"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const CancelMembership = () => {
  const [isLoading, setLoading] = useState(false);
  const cancelMembership = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      setLoading(false);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };
  return <Button onClick={cancelMembership}>Cancel Membership</Button>;
};

export default CancelMembership;
