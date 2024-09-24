// src/app/success/page.tsx
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // You can fetch additional details about the session if needed
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
      <p>Session ID: {sessionId}</p>
    </div>
  );
}
