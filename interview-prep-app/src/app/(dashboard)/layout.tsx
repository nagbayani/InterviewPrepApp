import React from "react";
// import Sidebar from "../../containers/sidebar-section/Sidebar";
import DashboardLayout from "@/containers/layouts/dashboard-layout";
import Navbar from "@/components/Navbar";
import "../../styles/dashboard.css";
import { auth } from "../../../auth";
import {
  fetchAllDecks,
  fetchAllCards,
  fetchAllTags,
  fetchAllMockTemplates,
} from "@/utils/fetch";
import { cookies } from "next/headers";
import { useDeckStore, useCardStore } from "@/_store";
import HydrateDashboard from "@/_store/HydrateDashboard";
import {
  DeckData,
  CardData,
  TagData,
  MockTemplateData,
} from "@/types/data-types";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Access cookie store to verify user session
 * @returns
 */
const authCheck = async () => {
  const session = await auth();
  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const decksDb = await fetchAllDecks(cookieHeader);
    const cardsDb = await fetchAllCards(cookieHeader);
    const tagsDb = await fetchAllTags(cookieHeader);
    const mockTemplatesDb = await fetchAllMockTemplates(cookieHeader);

    const decks = decksDb.decks;
    // const cards = cardsDb.cards;
    const tags = tagsDb.tags;
    const mockTemplates = mockTemplatesDb.mockTemplates;
    // console.log("DECKS in Layout", decks);
    // console.log("TAGS in Layout", tags);
    // console.log("CARDS in Layout", cardsDb);

    // add cards
    // add mock templates
    // add tags
    const userData = {
      session,
      decks,
      cards: cardsDb,
      tags,
      mockTemplates,
    };
    return userData;
  }
  return null;
};

export default async function Layout({ children }: LayoutProps) {
  const data = await authCheck();
  const decks = data?.decks ?? [];
  const cards = data?.cards ?? [];
  const tags = data?.tags ?? [];
  const mockTemplates = data?.mockTemplates ?? [];
  // const decks = data?.decksData.decks;
  // const user = data?.session?.user;
  console.log("DECKS in Layout", decks);

  return (
    // <div className='dashboard-container'>
    // <div>
    <>
      <HydrateDashboard
        decks={decks}
        cards={cards}
        tags={tags}
        mockTemplates={mockTemplates}
      ></HydrateDashboard>
      <DashboardLayout>{children}</DashboardLayout>
    </>
    // </div>
  );
}
