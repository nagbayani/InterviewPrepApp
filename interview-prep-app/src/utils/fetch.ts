export const fetchAllDecks = async (cookieHeader: string) => {
  // fetch data using api route
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/decks`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("In Page, Decks Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Decks.");
  }
};

export const fetchSingleDeck = async (deckId: string, cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/decks/${deckId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("FETCH Decks Data: ", data);
    // console.log(data.data.deck, "FETCH DECK DATA");
    // console.log(data.data.cards, "FETCH DECK CARDS");

    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving the deck.");
  }
};

export const fetchAllCards = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/cards`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("In Page, Cards Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Cards.");
  }
};

export const fetchSingleCard = async (cardId: string, cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    console.log("FETCH Single Card Data: ", data);
    return data.card;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving the card.");
  }
};
