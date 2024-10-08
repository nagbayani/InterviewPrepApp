import React, { useState } from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { usePathname, useRouter } from "next/navigation";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage-instance";

interface MockLinkProps {
  mockId: string;
  path: string;
}
const MockLink = ({ mockId, path }: MockLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mockTemplate, mockTemplates } = useMockTemplateStore((state) => ({
    mockTemplate: state.mockTemplates[mockId],
    mockTemplates: state.mockTemplates,
  }));

  return (
    <div
      onDoubleClick={() => router.push(path)}
      className='max-w-[300px] cursor-pointer p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200'
    >
      <h2 className='text-lg font-semibold text-gray-800'>
        {mockTemplate.title}
      </h2>
    </div>
  );
};

export default MockLink;
