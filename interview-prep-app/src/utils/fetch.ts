export const fetchAllDecks = async (cookieHeader: string) => {
  // fetch data using api route
  console.log(process.env.AUTH_URL, "AUTH URL");
  try {
    // const res = await fetch(`http://localhost:3000/api/decks`, {
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

// get single deck
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

// get all cards
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

// get single card
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

export const moveCardPUT = async (
  cardId: string,
  newDeckId: string,
  oldDeckId: string
) => {
  try {
    console.log(process.env.NEXT_PUBLIC_AUTH_URL, "NEXT_AUTH_URL");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/cards/move`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId, newDeckId, oldDeckId }),
      }
    );
    const data = await response.json();
    console.log("Move Card Data: ", data);
    return data;
  } catch (error) {
    console.error(error, "Something Went Wrong moving the card.");
    alert("Failed to move the card. Please try again.");
  }
};

export const updateDeckPUT = async () => {};

/**
 * Tags API
 */
export const fetchAllTags = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/cards/tags`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("In Page, Tags Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Tags.");
  }
};

export const fetchAllMockTemplates = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/mock-templates`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    console.log("In Page, MockTemplates Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving MockTemplates.");
  }
};

export const fetchSingleMockTemplate = async (
  mockId: string,
  cookieHeader: string
) => {
  try {
    const res = await fetch(
      `${process.env.AUTH_URL}/api/mock-templates/${mockId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );
    const data = await res.json();
    // console.log("FETCH MockTemplates Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving the mock template.");
  }
};

export const fetchAllInterviews = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/interviews`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("In Page, Interviews Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Interviews.");
  }
};

export const fetchSingleInterview = async (
  interviewId: string,
  cookieHeader: string
) => {
  try {
    const res = await fetch(
      `${process.env.AUTH_URL}/api/interviews/${interviewId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(
      error,
      "Something went wrong with retrieving the interview template"
    );
  }
};

type MockTemplateResponse = {
  message: string;
  status: number;
  template: {
    id: string;
    title: string;
    description: string;
    type: string;
    interviewId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const postMockTemplate = async (
  title: string,
  type: string,
  description: string,
  interviewId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/api/mock-templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, type, description, interviewId }),
      }
    );
    const data: MockTemplateResponse = await response.json();
    console.log("Post Mock Template Data: ", data);
    return data;
  } catch {
    console.log("Error creating mock template");
  }
};
