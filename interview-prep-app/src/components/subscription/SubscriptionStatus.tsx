"use client";
import React from "react";
import useMembership from "@/hooks/use-membership";

const SubscriptionStatus = () => {
  const { membership, loading, error } = useMembership();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if membership and status exist before rendering the subscription details
  if (!membership || !membership.status) {
    return (
      <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-red-100 text-center shadow-md'>
        <h2 className='text-xl font-semibold text-red-600'>
          You are not subscribed yet!
        </h2>
        <p className='text-gray-700 mt-2'>
          Subscribe to gain access to premium features.
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md'>
      <h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
        Subscription Details
      </h2>
      <div className='space-y-4'>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>Status:</span>
          <span
            className={`${
              membership.status === "active" ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {membership.status.charAt(0).toUpperCase() +
              membership.status.slice(1)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>
            Cancel at Period End:
          </span>
          <span>{membership.cancelAtPeriodEnd ? "Yes" : "No"}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>Current Period End:</span>
          <span>{new Date(membership.currentPeriodEnd).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
