import { Modal } from "@/containers/modal/CardModal";
import CardModalContent from "@/components/card/CardModalContent";
import { fetchSingleCard } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import type { CardData } from "@/types/data-types";
import { getTagsByUserId } from "@/data/tags";
import CardDisplay from "@/components/card/Card-Display";

type Props = {
  params: {
    cardId: string;
  };
};

const CardPage = async ({ params: { cardId } }: Props) => {
  const userSession = await currentUser();

  const cardData: CardData = await fetchSingleCard(
    cardId,
    userSession.cookieHeader
  );
  console.log("Card Data in Modal", cardData);

  const userTags = await getTagsByUserId(userSession.session?.user.id ?? "");

  // if (!cardData?.id) {
  //   return <h1 className='text-center'>No Data Found for that Card ID.</h1>;
  // }
  // Check if data is not yet loaded and return loading state
  const isLoading = !cardData;

  return (
    <>
      <Modal data={cardData}>
        {/* // <CardModalContent cardData={cardData!} userTags={userTags} /> */}
        <CardDisplay cardDb={cardData} userTags={userTags} />
      </Modal>
    </>
  );
};

export default CardPage;
