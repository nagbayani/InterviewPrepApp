"use client";
import useMockSimulationStore from "@/_store/mock-simulation/simulation-store";
import { useCardStore } from "@/_store";
import CardFeedback from "@/components/card/Card-Feedback";
import EditorWrapper from "@/components/text-editor/Editor-wrapper";

interface Props {
  mockTemplateId: string;
}

const MockSimulation = ({ mockTemplateId }: Props) => {
  const {
    currentStageIndex,
    currentQuestionIndex,
    stages,
    goToNextQuestion,
    goToPrevQuestion,
  } = useMockSimulationStore((state) => ({
    currentStageIndex: state.currentStageIndex,
    currentQuestionIndex: state.currentQuestionIndex,
    stages: state.stages,
    goToNextQuestion: state.goToNextQuestion,
    goToPrevQuestion: state.goToPrevQuestion,
  }));
  const { cards } = useCardStore((state) => ({ cards: state.cards }));

  // Get the current stage based on the currentStageIndex
  const currentStage = stages[currentStageIndex] || {};

  // Get the current question based on currentQuestionIndex
  const currentQuestion =
    currentStage?.questions?.[currentQuestionIndex] || null;

  // Find the card for the current question using its id
  const currentCard = currentQuestion ? cards[currentQuestion.id] : null;

  return (
    <div className='flex w-full flex-col  justify-center px-8 py-6 bg-white shadow-lg rounded-lg max-w-8xl mx-auto'>
      <h1 className='font-semibold text-3xl text-gray-800 mb-2'>
        {currentStage.title || "Mock Interview Stage"}
      </h1>
      <p className='text-gray-600 mb-8'>{currentStage.description}</p>

      {currentQuestion ? (
        <div className='w-full'>
          <p className='text-xl font-medium text-gray-800'>
            {currentCard ? currentCard.question : "No Question added"}
          </p>

          <div className='w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mt-8'>
            <div className='flex-1 lg:basis-[63%]'>
              <EditorWrapper
                data={cards[currentQuestion.id]}
                cardId={currentQuestion?.id}
              />{" "}
            </div>
            <div className='flex-1 lg:basis-[37%] '>
              <CardFeedback cardId={currentQuestion?.id} />
            </div>
          </div>
          <div className='flex justify-between mt-6'>
            <button
              onClick={goToPrevQuestion}
              className='bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300'
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300'
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className='text-gray-700'>No questions available for this stage.</p>
      )}
    </div>
  );
};

export default MockSimulation;
