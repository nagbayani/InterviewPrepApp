import { Modal } from "@/containers/modal/Modal";
import CardDisplay from "../../../c/[cardId]/CardDisplay";
import { fetchSingleCard } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
type Props = {
  params: {
    cardId: string;
  };
};

const CardModal = async ({ params: { cardId } }: Props) => {
  const userSession = await currentUser();

  const cardData = await fetchSingleCard(cardId, userSession.cookieHeader);

  if (!cardData?.id) {
    return <h1 className='text-center'>No Data Found for that Card ID.</h1>;
  }

  return (
    <Modal>
      <CardDisplay data={cardData} />
    </Modal>
  );
};

export default CardModal;
