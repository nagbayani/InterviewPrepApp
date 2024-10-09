import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MockFormContainer from "./MockFormContainer";
import useMockFormStore from "@/_store/mock-form-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { useTagStore } from "@/_store";
import { useDeckStore } from "@/_store";
import { DeckData, CardData } from "@/types/data-types";
import { Stage } from "@/_store/mock-form-slices/questions-organization-slice";
import { add } from "date-fns";
import GeneratedCard from "@/containers/decks-page/deckId/GeneratedCard";
import { Question } from "@/_store/mock-form-slices/questions-slice";

interface Props {
  interviewId: string;
}
type GeneratedQuestion = {
  question: string;
  tags?: string[];
};

type StageData = {
  value: string;
  label: string;
  questions: GeneratedQuestion[];
};
type OrganizedQuestions = {
  value: string;
  label: string;
  questions: Question[];
};

export default function ChooseQuestions({ interviewId }: Props) {
  const {
    step,
    increaseStep,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
  } = useMockFormStore((state) => state);

  const { interview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
  }));

  const { tags } = useTagStore((state) => ({
    tags: state.tags,
  }));

  const {
    addImportedQuestion,
    addGeneratedQuestion,
    removeImportedQuestion,
    importedQuestions,
    generatedQuestions,
    questionBank,
    stageQuestions,
    setStageQuestions,
    addQuestionToStage,
    removeQuestionFromStage,
  } = useMockFormStore((state) => state);

  const [selectedDeck, setSelectedDeck] = useState<DeckData | null>(null);

  const { decks } = useDeckStore((state) => ({
    decks: state.decks,
  }));

  const handleDeckSelect = (deck: DeckData) => {
    setSelectedDeck(deck);
  };

  const handleBackClick = () => {
    setSelectedDeck(null);
  };

  const isQuestionAdded = (questionId: string) => {
    return importedQuestions.some((question) => question.id === questionId);
  };

  const toggleAddRemoveQuestion = (card: CardData) => {
    if (isQuestionAdded(card.id)) {
      removeImportedQuestion(card.id); // Remove if already added
      removeQuestionFromStage("Questions", card.id);
    } else {
      addImportedQuestion({ id: card.id, text: card.question }); // Add if not already in state
      addQuestionToStage("Questions", { id: card.id, text: card.question });
    }
  };

  const handleGenerateQuestions = async () => {
    // Generate questions
    // Need to add tags, existing question pool
    const tagsToAdd = Object.values(tags).map((tag) => tag.name);

    try {
      const response = await fetch("/api/generate-questions/mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockTitle: mockForm.title,
          mockDescription: mockForm.description,
          mockType: mockForm.type,
          company: interview.company,
          jobPosition: interview.jobPosition,
          jobDescription: interview.jobDescription,
          jobSkills: interview.skills,
          jobQualifications: interview.qualifications,
          tags: tagsToAdd,
          questionPool: importedQuestions.map((question) => question.text),
        }),
      });

      const data = await response.json();
      // Check if the response contains backticks or markdown characters and remove them
      let questionsText = data.questions.replace(/```json|```/g, "").trim();

      // Parse the cleaned-up JSON string
      const generatedQuestions = JSON.parse(questionsText);

      console.log(
        "Generated questions as JavaScript object:",
        generatedQuestions
      );

      // Add generated questions to question bank and respective stages
      generatedQuestions.forEach((stageData: StageData) => {
        const { questions, label: stageLabel } = stageData;

        questions.forEach((question) => {
          const newQuestion = {
            id: crypto.randomUUID(), // Or some unique ID generator
            text: question.question,
            tags: question.tags,
          };

          // Add question to the question bank
          addGeneratedQuestion(newQuestion);

          // Add the question to its respective stage
          addQuestionToStage(stageLabel, newQuestion);
        });
      });
    } catch (error) {
      console.error("Error generating questions:", error);
    }
  };

  const handleNextStep = async () => {
    if (importedQuestions.length === 0) {
      return increaseStep(step);
    }
    // Call api endpoint to organize imported questions into stages
    // get response, add to zustand store of stageQuestions
    try {
      const response = await fetch("/api/generate-questions/organize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          importedQuestions: importedQuestions.map((question) => ({
            id: question.id,
            text: question.text,
          })),
          stages: mockForm.stages,
        }),
      });

      const data = await response.json();

      // Check if the response contains backticks or markdown characters and remove them
      let questionsText = data.organizedQuestions
        .replace(/```json|```/g, "")
        .trim();

      // Parse the cleaned-up JSON string
      const organizedQuestions = JSON.parse(questionsText);

      console.log(
        "Organized questions as JavaScript object:",
        organizedQuestions
      );

      // Add organized questions to question bank and respective stages
      organizedQuestions.forEach((stageData: OrganizedQuestions) => {
        const { questions, label: stageLabel } = stageData;

        questions.forEach((question) => {
          const newQuestion = {
            id: question.id,
            text: question.text,
            tags: question.tags,
          };
          // Add the question to its respective stage
          removeQuestionFromStage("Questions", question.id);
          addQuestionToStage(stageLabel, newQuestion);
          console.log("Adding question to stage", stageLabel, question);
        });
      });
      console.log("Stage questions", stageQuestions);
    } catch (error) {
      console.error("Error organizing questions:", error);
    }
    // After the questions have been successfully added to the stages, increase the step
    increaseStep(step);
  };

  return (
    <MockFormContainer
      onNext={handleNextStep}
      onPreviousStep={() => decreaseStep(step)}
    >
      <Tabs defaultValue='generate'>
        <TabsList>
          <TabsTrigger value='import'>Import Questions</TabsTrigger>
          <TabsTrigger value='generate'>Generate Questions</TabsTrigger>
          <TabsTrigger value='questionBank'>Question Bank</TabsTrigger>
        </TabsList>

        <TabsContent value='import'>
          <Card>
            <CardHeader>
              <CardTitle>Import Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {/* add imported questions to Question Bank */}
                Choose questions from your custom decks to include in this mock
                interview.
              </CardDescription>

              {selectedDeck ? (
                <div className='deck-cards-view'>
                  <Button variant='textIcon' onClick={handleBackClick}>
                    <span>Back</span>
                  </Button>
                  <h2 className='text-2xl mt-4'>{selectedDeck.title}</h2>
                  <ul className='flex-col gap-4'>
                    {selectedDeck.cards.map((card: CardData) => (
                      <li
                        key={card.id}
                        className='flex justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200 my-2'
                      >
                        <span>{card.question}</span>
                        <Button
                          variant='outline'
                          onClick={() => toggleAddRemoveQuestion(card)}
                        >
                          {isQuestionAdded(card.id) ? "Remove" : "Add"}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className='flex-col gap-4'>
                  {Object.values(decks).map((deck: DeckData) => (
                    <li
                      key={deck.id}
                      className='max-w-[600px] flex justify-between mx-auto cursor-pointer p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200 my-2'
                    >
                      {deck.title}

                      <Button
                        variant='outline'
                        onClick={() => handleDeckSelect(deck)}
                        className='self-end'
                      >
                        Open
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='generate'>
          <Card>
            <CardHeader>
              <CardTitle>Generate Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center justify-center'>
                <Button
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors my-4'
                  onClick={handleGenerateQuestions}
                >
                  Generate Questions
                </Button>
              </div>
              {generatedQuestions.length === 0 ? (
                <p className='text-gray-500 mb-4'>No questions generated yet</p>
              ) : (
                <ul className='flex flex-col gap-4'>
                  {generatedQuestions.map((question, index) => (
                    <GeneratedCard
                      key={question.id}
                      question={question.text}
                      generatedTags={question.tags}
                      index={index + 1}
                    />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='questionBank'>
          <Card>
            <CardHeader>
              <CardTitle>All selected questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {/* Display all added questions in the Question Bank */}
                <ul>
                  {questionBank.map((question) => (
                    <li key={question.id}>{question.text}</li>
                  ))}
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MockFormContainer>
  );
}
