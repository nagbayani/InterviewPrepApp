import { Modal } from "@/containers/modal/Modal";
import CardModalContent from "./CardModalContent";
import { fetchSingleCard } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import type { CardData } from "@/types/data-types";

type Props = {
  params: {
    cardId: string;
  };
};

const Card = async ({ params: { cardId } }: Props) => {
  const userSession = await currentUser();

  const cardData: CardData = await fetchSingleCard(
    cardId,
    userSession.cookieHeader
  );

  if (!cardData?.id) {
    return <h1 className='text-center'>No Data Found for that Card ID.</h1>;
  }

  return (
    <>
      <Modal data={cardData}>
        <CardModalContent cardData={cardData} />
      </Modal>
    </>
  );
};

export default Card;
