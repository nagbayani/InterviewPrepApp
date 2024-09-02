import React from "react";
import { auth } from "../../../../auth";
import "../../../styles/dashboard.css";
import InterviewsWrapper from "@/containers/interviews/InterviewsWrapper";
import { ContentLayout } from "@/containers/layouts/content-layout";
import { InterviewData } from "@/types/data-types";
import { cookies } from "next/headers";

const getInterviewData = async (cookieHeader: string) => {
  // Fetch data using API route
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/interviews`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data: any = await res.json();
    return data;
  } catch (error) {
    console.log(error, "Something went wrong retrieving interviews.");
  }
};

const InterviewsPage = async () => {
  // Retrieve session, if user, pass userID
  const session = await auth();

  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const data = await getInterviewData(cookieHeader);

    return (
      <ContentLayout title={"Interviews"}>
        <InterviewsWrapper interviews={data.interviews} />
      </ContentLayout>
    );
  }

  return (
    <section className='dashboard-wrapper'>
      <h1 className='ml-[0]'>Interviews List - you must sign in.</h1>
    </section>
  );
};

export default InterviewsPage;
