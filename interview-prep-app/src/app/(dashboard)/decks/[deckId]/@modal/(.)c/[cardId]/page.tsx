import { Modal } from "@/containers/modal/Modal";
import { ModalProvider } from "@/containers/modal/ModalContext";
import CardDisplay from "../../../c/[cardId]/CardDisplay";
import { fetchSingleCard } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import type { CardData } from "@/types/CardData";
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
      <ModalProvider>
        <Modal key={cardData.id} data={cardData}>
          <CardDisplay data={cardData} />
        </Modal>
      </ModalProvider>

      {/* // <ModalWrapper data={cardData} /> */}
    </>
  );
};

export default Card;
