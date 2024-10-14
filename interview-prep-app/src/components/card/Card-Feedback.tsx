import { useState, useEffect } from "react";
import { useCardStore } from "@/_store/index";
import { Button } from "../ui/button";
import GenAnswerButton from "../buttons/gen-answer-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { set } from "date-fns";

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

// Keys for Answer Object
interface AnswerKeys {
  keyTips: AnswerKeyPoint[];
}

interface AnswerKeyPoint {
  tip: string;
  detail: string;
}

const CardFeedback = ({ cardId }: Props) => {
  // Updated state to hold structured feedback
  const [feedback, setFeedback] = useState<Feedback>({
    strengths: [],
    weaknesses: [],
    tipsForImprovement: [],
  });

  // State for keys for answering
  const [keysForAnswer, setKeysForAnswer] = useState<AnswerKeyPoint[]>([]);

  const { card } = useCardStore((state) => ({
    card: state.cards[cardId],
  }));

  console.log("Card Feedback", card.feedback);

  const [genFeedbackStatus, setGenFeedbackStatus] = useState<
    "idle" | "saving" | "saved"
  >("idle");

  const [genKeysStatus, setGenKeysStatus] = useState<
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

  // Utility function to safely parse JSON
  const safeParseKeysForAnswer = (keysForAnswerString: string) => {
    try {
      return JSON.parse(keysForAnswerString);
    } catch (error) {
      console.error("Failed to parse JSON", error);
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
    console.log("Keys for Answer", card.keysForAnswer);
    if (card?.keysForAnswer) {
      const parsedKeysForAnswer = safeParseKeysForAnswer(card.keysForAnswer);
      console.log("Parsed Keys for Answer", parsedKeysForAnswer);
      if (parsedKeysForAnswer) {
        setKeysForAnswer(parsedKeysForAnswer); // Update state only if parsing succeeds
      }
      console.log("The set Keys for Answer", keysForAnswer);
    }
  }, [card]);

  const handleGenerateKeysForAnswer = async () => {
    setGenKeysStatus("saving");
    try {
      const response = await (
        await fetch("/api/generate-feedback/keys-for-answering", {
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
        setKeysForAnswer(response.keyTips);
        setGenKeysStatus("saved");
      }
    } catch (error) {
      console.error("Error generating keys for answer", error);
      setGenKeysStatus("idle");
    }
    setGenKeysStatus("idle");
  };

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
      className='flex-1 bg-gray-100 p-4 rounded-lg shadow-md h-[500px] overflow-y-auto pointer-events-auto'
      style={{ userSelect: "text" }}
    >
      {/* <Button onClick={handleGenerateFeedback} className='w-full'>
        {" "}
        {genFeedbackStatus === "idle" && "Generate Feedback"}
        {genFeedbackStatus === "saving" && "Generating..."}
        {genFeedbackStatus === "saved" && "Regenerate Feedback"}
      </Button> */}
      {/* Feedback Box Content */}

      <Tabs defaultValue='keysForAnswer' className='mt-4 pointer-events-auto'>
        <TabsList>
          <TabsTrigger value='keysForAnswer'>Keys for Answering</TabsTrigger>
          <TabsTrigger value='strengths'>Strengths</TabsTrigger>
          <TabsTrigger value='weaknesses'>Weaknesses</TabsTrigger>
          <TabsTrigger value='tipsForImprovement'>
            Tips for Improvement
          </TabsTrigger>
        </TabsList>
        {/* Keys for Answer Tab Content */}
        <TabsContent value='keysForAnswer'>
          <h2 className='text-lg font-semibold mb-2'>Keys for Answering</h2>
          <ul className='text-gray-700'>
            {keysForAnswer?.length > 0 ? (
              keysForAnswer.map((tip, idx) => (
                <li key={idx} className='mb-3'>
                  <p className='font-semibold'>• {tip.tip}</p>
                  <p className='text-sm text-gray-600'>{tip.detail}</p>
                </li>
              ))
            ) : (
              <li>No keys for answering available</li>
            )}
          </ul>
          <Button onClick={handleGenerateKeysForAnswer} className='w-full'>
            {" "}
            {genKeysStatus === "idle" && "Show Keys for Answering"}
            {genKeysStatus === "saving" && "Generating..."}
            {genKeysStatus === "saved" && "Regenerate Feedback"}
          </Button>
          {/* Feedback Box Content */}
        </TabsContent>

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
          <Button onClick={handleGenerateFeedback} className='w-full'>
            {" "}
            {genFeedbackStatus === "idle" && "Generate Feedback"}
            {genFeedbackStatus === "saving" && "Generating..."}
            {genFeedbackStatus === "saved" && "Regenerate Feedback"}
          </Button>
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
          <Button onClick={handleGenerateFeedback} className='w-full'>
            {" "}
            {genFeedbackStatus === "idle" && "Generate Feedback"}
            {genFeedbackStatus === "saving" && "Generating..."}
            {genFeedbackStatus === "saved" && "Regenerate Feedback"}
          </Button>
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
          <Button onClick={handleGenerateFeedback} className='w-full'>
            {" "}
            {genFeedbackStatus === "idle" && "Generate Feedback"}
            {genFeedbackStatus === "saving" && "Generating..."}
            {genFeedbackStatus === "saved" && "Regenerate Feedback"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardFeedback;
