/** Rendering Tests:
 *    Test if Deck renders correctly with the given deck prop.
 *    Test if Deck displays the EditDeckMenu with the correct initial values for title, description, and thumbnail.
 *    Test if Deck renders the Filter, Send, and Add Card buttons.
 *    Test if Deck renders the correct number of DeckCard components based on the cardsData in the Zustand store.
 */

/** Interaction Tests:
 *    Test the interaction with the EditDeckMenu, including changing the title, description, and thumbnail.
 *    Test the functionality of the Add Card button, ensuring it opens the AddCardModal.
 *    Test that clicking the Filter and Send buttons trigger the appropriate actions (e.g., logging or opening a menu).
 *    Test the onUpdateCard and onMoveCard functions, ensuring they correctly update the Zustand store and trigger the correct API calls.
 */

/** State and API Interaction Tests:
 *    Mock the moveCardPUT function to simulate successful and failed card movements.
 *    Test that the Deck component correctly updates the Zustand store when moving cards between decks.
 *    Test error handling when the API requests (e.g., moveCardPUT) fail, ensuring that the UI reacts appropriately.
 */

/** Integration Tests:
 *    Test that Deck correctly passes the necessary props to each DeckCard component and renders them properly.
 *    Ensure that interactions with DeckCard components update the Zustand store correctly and trigger the appropriate functions (e.g., onUpdateCard, onMoveCard).
 */
