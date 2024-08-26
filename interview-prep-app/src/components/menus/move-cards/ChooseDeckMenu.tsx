"use client";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { DeckData } from "@/types/data-types";
import { useDeckStore, useCardStore } from "@/_store";
import { moveCardPUT } from "@/utils/fetch";

const FormSchema = z.object({
  deck: z.string({
    required_error: "Please select a deck.",
  }),
});

export function ChooseDeckMenu({
  cardId,
  onMoveCard,
  deckId,
  onBack,
}: {
  cardId: string;
  deckId: string;
  onMoveCard: (cardId: string, newDeckId: string, oldDeckId: string) => void;
  onBack: () => void;
}) {
  const {
    decks: decksData,
    addDeck,
    setDecks,
    updateDeck,
  } = useDeckStore((state) => ({
    decks: state.decks,
    addDeck: state.addDeck,
    setDecks: state.setDecks,
    updateDeck: state.updateDeck,
  }));

  const decksArray = Object.values(decksData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const selectedDeck = decksArray.filter((deck) => deck.title === data.deck);
    try {
      onMoveCard(cardId, selectedDeck[0].id, deckId);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-2'>
        <FormField
          control={form.control}
          name='deck'
          render={({ field }) => (
            <FormItem className='flex flex-col h-[150px] p-4'>
              <FormLabel className='my-2'>Select destination</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        "w-[250px] justify-between text-left overflow-hidden",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-24px)]'>
                        {field.value
                          ? decksArray.find(
                              (deck) => deck.title === field.value
                            )?.title
                          : "Select Deck"}
                      </span>
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                  <Command>
                    <CommandInput placeholder='Search Decks...' />
                    <CommandEmpty>No Deck found. Create Deck...</CommandEmpty>
                    <CommandGroup className='pointer-events-auto overflow-y-auto '>
                      {decksArray.map((deck) => (
                        <CommandItem
                          value={deck.title}
                          key={deck.id}
                          onSelect={() => {
                            form.setValue("deck", deck.title);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              deck.title === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {deck.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end mr-4'>
          <Button type='submit'>Move</Button>
        </div>
      </form>
    </Form>
  );
}
