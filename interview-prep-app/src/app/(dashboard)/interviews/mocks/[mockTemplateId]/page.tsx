import React from "react";
import { currentUser } from "@/lib/auth";
import Mock from "@/containers/interviews/interview-id/dashboard/Mock";
import { ContentLayout } from "@/containers/layouts/content-layout";

const MockIdPage = async ({
  params,
}: {
  params: { mockTemplateId: string };
}) => {
  const userSession = await currentUser();

  return (
    <ContentLayout title={params.mockTemplateId}>
      <Mock mockTemplateId={params.mockTemplateId} />
    </ContentLayout>
  );
};

export default MockIdPage;
