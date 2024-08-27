/** Rendering Tests:
 *    Test if DeckIdPage renders without crashing.
 *    Test if DeckIdPage fetches the correct deck and cards data based on the deckId parameter.
 *    Test if DeckIdPage correctly renders the Deck component with the fetched deck data.
 *    Test if DeckIdPage renders the ContentLayout with the correct title based on the deck data.
 */

/** Behavior Tests:
 *    Mock the currentUser function to simulate authenticated and unauthenticated states.
 *    Mock the fetchSingleDeck function to simulate successful and failed data fetching scenarios.
 */

/** Integration Tests:
 *    Ensure that DeckIdPage passes the correct props to the Deck component.
 *    Test that DeckIdPage handles errors in data fetching gracefully, e.g., by showing an error message or fallback UI.
 *    Verify that HydrateStore is correctly rendered with the appropriate data for cards, tags, and cardTags.
 */
