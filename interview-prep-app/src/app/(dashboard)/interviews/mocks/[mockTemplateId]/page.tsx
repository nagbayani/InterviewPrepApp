import React from "react";
import { currentUser } from "@/lib/auth";

const MockIdPage = async ({
  params,
}: {
  params: { mockTemplateId: string };
}) => {
  const userSession = await currentUser();

  return (
    <div>
      <p>Mock Template PAge</p>
      <p> {params.mockTemplateId}</p>
    </div>
  );
};

export default MockIdPage;
