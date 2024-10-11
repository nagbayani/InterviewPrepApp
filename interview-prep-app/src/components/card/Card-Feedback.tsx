import { useState, useEffect } from "react";
import { useCardStore } from "@/_store/index";
import { Button } from "../ui/button";
import GenAnswerButton from "../buttons/gen-answer-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  cardId: string;
}

// Feedback Object from API Response, holding feedback keys
interface Feedback {
  strengths: FeedbackPoint[];
  weaknesses: FeedbackPoint[];
  tipsForImprovement: FeedbackPoint[];
}
// Each feedback key holds an array of FeedbackPoint objects
interface FeedbackPoint {
  point: string;
  explanation: string;
}

const CardFeedback = ({ cardId }: Props) => {
  // Updated state to hold structured feedback
  const [feedback, setFeedback] = useState<Feedback>({
    strengths: [],
    weaknesses: [],
    tipsForImprovement: [],
  });
  const { card } = useCardStore((state) => ({
    card: state.cards[cardId],
  }));

  console.log("Card Feedback", card.feedback);

  const [genFeedbackStatus, setGenFeedbackStatus] = useState<
    "idle" | "saving" | "saved"
  >("idle");

  // Utility function to safely parse JSON
  const safeParseFeedback = (feedbackString: string) => {
    try {
      return JSON.parse(feedbackString);
    } catch (error) {
      console.error("Failed to parse feedback JSON", error);
      return null; // If parsing fails, return null
    }
  };
  // Initialize feedback from card's existing feedback when the component mounts
  useEffect(() => {
    if (card?.feedback) {
      const parsedFeedback = safeParseFeedback(card.feedback);
      if (parsedFeedback) {
        setFeedback(parsedFeedback); // Update state only if parsing succeeds
      }
    }
  }, [card]);

  const handleGenerateFeedback = async () => {
    setGenFeedbackStatus("saving"); // Set status to saving

    try {
      const response = await (
        await fetch("/api/generate-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: card.question,
            answer: card.answer,
            cardId,
          }),
        })
      ).json();

      if (response.status === 201) {
        setFeedback(response.feedback);
        setGenFeedbackStatus("saved"); // Set status to saved
      }
    } catch (error) {
      console.error("Error generating feedback", error);
      setGenFeedbackStatus("idle"); // Reset to idle on error
    }
  };

  return (
    <div
      className='flex-1 lg:basis-1/3 bg-gray-100 p-4 rounded-lg shadow-md max-h-[500px] overflow-y-auto pointer-events-auto'
      style={{ userSelect: "text" }}
    >
      <Button onClick={handleGenerateFeedback} className='w-full'>
        {" "}
        {genFeedbackStatus === "idle" && "Generate Feedback"}
        {genFeedbackStatus === "saving" && "Generating..."}
        {genFeedbackStatus === "saved" && "Regenerate Feedback"}
      </Button>
      {/* Feedback Box Content */}

      <Tabs defaultValue='strengths' className='mt-4 pointer-events-auto'>
        <TabsList>
          <TabsTrigger value='strengths'>Strengths</TabsTrigger>
          <TabsTrigger value='weaknesses'>Weaknesses</TabsTrigger>
          <TabsTrigger value='tipsForImprovement'>
            Tips for Improvement
          </TabsTrigger>
        </TabsList>

        {/* Strengths Tab Content */}
        <TabsContent value='strengths'>
          <h2 className='text-lg font-semibold mb-2'>Strengths</h2>
          <ul className='text-gray-700'>
            {feedback.strengths.length > 0 ? (
              feedback.strengths.map((strength, idx) => (
                <li key={idx} className='mb-3'>
                  <p className='font-semibold'>• {strength.point}</p>
                  <p className='text-sm text-gray-600'>
                    {strength.explanation}
                  </p>
                </li>
              ))
            ) : (
              <li>No strengths available</li>
            )}
          </ul>
        </TabsContent>

        {/* Weaknesses Tab Content */}
        <TabsContent value='weaknesses'>
          <h2 className='text-lg font-semibold mb-2'>Weaknesses</h2>
          <ul className='text-gray-700'>
            {feedback.weaknesses.length > 0 ? (
              feedback.weaknesses.map((weakness, idx) => (
                <li key={idx} className='mb-3'>
                  <p className='font-semibold'>• {weakness.point}</p>
                  <p className='text-sm text-gray-600'>
                    {weakness.explanation}
                  </p>
                </li>
              ))
            ) : (
              <li>No weaknesses available</li>
            )}
          </ul>
        </TabsContent>

        {/* Tips for Improvement Tab Content */}
        <TabsContent value='tipsForImprovement'>
          <h2 className='text-lg font-semibold mb-2'>Tips for Improvement</h2>
          <ul className='text-gray-700'>
            {feedback.tipsForImprovement.length > 0 ? (
              feedback.tipsForImprovement.map((tip, idx) => (
                <li key={idx} className='mb-3'>
                  <p className='font-semibold'>• {tip.point}</p>
                  <p className='text-sm text-gray-600'>{tip.explanation}</p>
                </li>
              ))
            ) : (
              <li>No tips for improvement available</li>
            )}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardFeedback;
