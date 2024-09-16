import React from "react";
import { ContentLayout } from "@/containers/layouts/content-layout";
import { auth } from "../../../../../auth";
import { PlusTier } from "@/components/subscription/PlusTier";
import { FreeTier } from "@/components/subscription/FreeTier";
import CancelMembership from "@/components/subscription/CancelMembership";

const SubscriptionPage = () => {
  return (
    <ContentLayout title={"Subscription"}>
      <div>
        <h1>Subscription Page</h1>
      </div>
      <div className='flex justify-center gap-8'>
        <FreeTier className='max-w-[380px]' />
        <PlusTier className='max-w-[380px]' />
      </div>
      <CancelMembership />
    </ContentLayout>
  );
};

export default SubscriptionPage;
