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

  const templateCards = mockTemplateCards[template.id] || {}; // Get cards for this template

  return (
    <div className='mock-carousel'>
      <Carousel className='w-full max-w-lg'>
        <CarouselContent>
          {Object.values(templateCards).map((mockTemplateCard, index) => {
            const card = cards[mockTemplateCard.cardId]; // Get the card details using the cardId

            if (!card) return null; // If card is not found, skip rendering

            return (
              <CarouselItem key={mockTemplateCard.cardId}>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <div>
                        <h2 className='text-2xl font-semibold'>
                          {card.question || `Card ${index + 1}`}
                        </h2>
                        {/* <p>{card.answer}</p>  */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MockCarousel;
