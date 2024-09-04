/**  Rendering Tests:
 *    Test if DecksPage renders without crashing.
 *    Test if DecksPage displays the "Decks List - you must sign in" message when no session is present.
 *    Test if DecksPage fetches deck data and passes it correctly to DecksWrapper.
 */

/** Behavior Tests:
 *    Mock the auth function to simulate different session states (signed in and signed out)
 *    Mock the getDeckData function to simulate successful and failed data fetching.
 */

/** Integration Tests:
 *    Ensure that DecksWrapper is correctly rendered with the fetched deck data.
 *    Test that DecksPage handles errors in data fetching gracefully.
 */
