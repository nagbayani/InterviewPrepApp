import React from "react";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useCardStore } from "@/_store"; // Import useCardStore to access card data
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MockCarouselProps {
  template: MockTemplateData;
}

const MockCarousel = ({ template }: MockCarouselProps) => {
  const { mockTemplateCards } = useMockTemplateStore((state) => ({
    mockTemplateCards: state.mockTemplateCards,
  }));

  const { cards } = useCardStore((state) => ({
    cards: state.cards, // Access all cards from the card store
  }));

  // Get the template cards for the current template ID
  const templateCards = mockTemplateCards?.[template.id];

  // Log for debugging
  console.log("Template Cards:", templateCards);
  console.log(
    "Template Cards with Questions:",
    templateCards
      ? Object.values(templateCards).map(
          (templateCard) => cards[templateCard.cardId]
        )
      : []
  );

  return (
    <div className='mock-carousel'>
      <Carousel className='w-full max-w-lg'>
        <CarouselContent>
          {templateCards && Object.values(templateCards).length > 0 ? (
            Object.values(templateCards).map((mockTemplateCard, index) => {
              const card = cards[mockTemplateCard.cardId]; // Get the card details using the cardId
              console.log(
                "carousel cards length",
                Object.values(templateCards).length
              );

              if (!card) {
                console.warn(
                  `Card with ID ${mockTemplateCard.cardId} not found in the store.`
                );
                return null; // Skip rendering if the card isn't found
              }

              return (
                <CarouselItem key={mockTemplateCard.cardId}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <div>
                          <h2 className='text-2xl font-semibold'>
                            {card.question || `Card ${index + 1}`}
                          </h2>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })
          ) : (
            <p>No cards added to this template.</p> // Display a message if there are no cards
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MockCarousel;
