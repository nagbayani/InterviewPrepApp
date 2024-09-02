import React from "react";
import { InterviewData } from "@/types/data-types";
import { currentUser } from "@/lib/auth";
import { ContentLayout } from "@/containers/layouts/content-layout";
import Interview from "@/containers/interviews/interview-id/Interview";
import { fetchSingleInterview } from "@/utils/fetch";

// import HydrateStore

interface Response {
  interview: InterviewData;
}
const InterviewPage = async ({
  params,
}: {
  params: { interviewId: string };
}) => {
  const userSession = await currentUser();

  // fetch response for a single deck
  const response: Response = await fetchSingleInterview(
    params.interviewId,
    userSession.cookieHeader
  );
  const { interview } = response;

  // retrieve single interview
  // retrieve mock templates

  return (
    <ContentLayout title={interview.company}>
      <Interview
        interview={interview}
        mockTemplates={interview.mockTemplates}
      ></Interview>
    </ContentLayout>
  );
};

export default InterviewPage;
