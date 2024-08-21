import CardDisplay from "../../../../../../components/card/Card-Display";
import { CardData } from "@/types/data-types";
import { currentUser } from "@/lib/auth";
import { fetchSingleCard, fetchAllDecks } from "@/utils/fetch";
import { getTagsByUserId, getCardTagsByCardId } from "@/data/tags";

type Props = {
  params: {
    cardId: string;
  };
};

export default async function CardPage({ params: { cardId } }: Props) {
  const userSession = await currentUser();

  const cardData: CardData = await fetchSingleCard(
    cardId,
    userSession.cookieHeader
  );

  const userTags = await getTagsByUserId(userSession.session?.user.id ?? "");
  // const cardTags = await getCardTagsByCardId(cardId);

  // const allDecks = await fetchAllDecks(userSession.cookieHeader);

  // console.log(cardData, "CARD DATA IN CARD PAGE");

  if (!cardData?.id) {
    return <h1 className='text-center'>No Data Found for that Card ID.</h1>;
  }
  return (
    <div className='mt-2 grid place-content-center'>
      <CardDisplay cardDb={cardData} userTags={userTags} />
    </div>
  );
}
