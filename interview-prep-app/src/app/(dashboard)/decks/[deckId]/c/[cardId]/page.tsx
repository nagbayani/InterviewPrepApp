import CardDisplay from "./CardDisplay";
import { CardData } from "@/types/CardData";
import { currentUser } from "@/lib/auth";
import { fetchSingleCard } from "@/utils/fetch";
// import { Modal } from "@/containers/modal/Modal";
// import { ModalProvider } from "@/containers/modal/ModalContext";

type Props = {
  params: {
    cardId: string;
  };
};

export default async function Card({ params: { cardId } }: Props) {
  const userSession = await currentUser();

  const cardData: CardData = await fetchSingleCard(
    cardId,
    userSession.cookieHeader
  );
  // console.log(cardData, "CARD DATA IN CARD PAGE");

  if (!cardData?.id) {
    return <h1 className='text-center'>No Data Found for that Card ID.</h1>;
  }
  return (
    <div className='mt-2 grid place-content-center'>
      <CardDisplay data={cardData} />
    </div>
  );
}
