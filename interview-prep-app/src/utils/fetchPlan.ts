type Membership = {
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | Date;
};

export const planLimitPUT = async (
  actionType: "generateQuestion" | "generateAnswer" | "generateFeedback",
  membership: Membership
) => {
  // Check if the user has an active subscription
  if (!membership?.status || membership.status !== "active") {
    try {
      // If no active subscription, make a PUT request to /api/plan-limits to check free plan limits
      const planCheckResponse = await fetch("/api/plan-limits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionType, // Use the actionType passed to the function
        }),
      });

      const planCheckData = await planCheckResponse.json();

      // Check if the request failed (status code not 200)
      if (planCheckData.status !== 200) {
        console.log("Error in planLimitPUT:", planCheckData.error.message);
        alert(planCheckData.error.message);
        return false; // Return false if the plan check failed
      }

      // Return true if the request was successful
      return true;
    } catch (error) {
      console.error("Error in planLimitPUT:", error);
      alert("An error occurred while checking your plan limits.");
      return false;
    }
  } else {
    // If the user has an active subscription, no need to check limits
    return true;
  }
};
