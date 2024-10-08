import React from "react";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useCardStore } from "@/_store"; // Import useCardStore to access card data
import { Card, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    // <div className='mock-carousel'>
    <Carousel
      className=''
      orientation='vertical'
      opts={{
        align: "center",
      }}
    >
      <CarouselContent className='max-h-[500px] '>
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
              <CarouselItem
                key={mockTemplateCard.cardId}
                className='w-[400px] my-8'
              >
                <div className='p-1'>
                  {/* <Card className='border-none shadow-none'> */}
                  <Card className=''>
                    <CardContent className='relative flex flex-col justify-center aspect-square p-6'>
                      <div>
                        <h2 className='text-xl '>
                          {card.question || `Card ${index + 1}`}
                        </h2>
                      </div>
                      <Button
                        variant='textIcon'
                        className='absolute bottom-4 right-4'
                      >
                        <Mic />
                        <span>Record answer</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })
        ) : (
          <CarouselItem>
            <Card className=''>
              <CardContent className='relative flex flex-col justify-center aspect-square p-6'>
                <p className='text-xl '> No cards added to this template.</p>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    // </div>
  );
};

export default MockCarousel;
