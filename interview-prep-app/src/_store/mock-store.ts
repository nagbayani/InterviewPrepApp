import { create } from "zustand";
import {
  MockTemplateData,
  MockTemplateCardData,
  CardData,

} from "@/types/data-types";

// Zustand Store
// State for MockTemplates and MockTemplateCards
interface MockTemplateState {
  mockTemplates: Record<string, MockTemplateData>;
  mockTemplateCards: Record<string, Record<string, MockTemplateCardData>>;
  updateMockTemplate: (
    templateId: string,
    data: Partial<MockTemplateData>
  ) => void;
  setMockTemplates: (templates: MockTemplateData[]) => void;
  setMockTemplateCards: (mockTemplateCards: MockTemplateCardData[]) => void;
  addMockTemplate: (template: MockTemplateData) => void;
  deleteMockTemplate: (templateId: string) => void;
  addMockTemplateCard: (mockTemplateCard: MockTemplateCardData) => void;
  deleteMockTemplateCard: (templateId: string, cardId: string) => void;
}

export const useMockTemplateStore = create<MockTemplateState>((set) => ({
  mockTemplates: {},
  mockTemplateCards: {},

  updateMockTemplate: (templateId, data) =>
    set((state) => ({
      mockTemplates: {
        ...state.mockTemplates,
        [templateId]: {
          ...state.mockTemplates[templateId],
          ...data,
        },
      },
    })),

  addMockTemplate: (template: MockTemplateData) =>
    set((state) => ({
      mockTemplates: {
        ...state.mockTemplates,
        [template.id]: template,
      },
    })),

  setMockTemplates: (templates: MockTemplateData[]) =>
    set(() => {
      if (!Array.isArray(templates)) {
        console.error(
          "setMockTemplates expected an array but received:",
          templates
        );
        return { mockTemplates: {} };
      }

      return {
        mockTemplates: templates.reduce(
          (acc, template) => ({
            ...acc,
            [template.id]: template,
          }),
          {}
        ),
      };
    }),

  setMockTemplateCards: (mockTemplateCards) => {
    const mockTemplateCardRecord = mockTemplateCards.reduce(
      (acc, mockTemplateCard) => {
        if (!acc[mockTemplateCard.templateId]) {
          acc[mockTemplateCard.templateId] = {};
        }
        acc[mockTemplateCard.templateId][mockTemplateCard.cardId] =
          mockTemplateCard;
        return acc;
      },
      {} as Record<string, Record<string, MockTemplateCardData>>
    );
    set({ mockTemplateCards: mockTemplateCardRecord });
  },

  deleteMockTemplate: (templateId: string) =>
    set((state) => {
      const newMockTemplates = { ...state.mockTemplates };
      delete newMockTemplates[templateId];
      return { mockTemplates: newMockTemplates };
    }),

  addMockTemplateCard: (mockTemplateCard: MockTemplateCardData) =>
    set((state) => {
      const newMockTemplateCards = { ...state.mockTemplateCards };
      if (!newMockTemplateCards[mockTemplateCard.templateId]) {
        newMockTemplateCards[mockTemplateCard.templateId] = {};
      }
      newMockTemplateCards[mockTemplateCard.templateId][
        mockTemplateCard.cardId
      ] = mockTemplateCard;
      return { mockTemplateCards: newMockTemplateCards };
    }),

  deleteMockTemplateCard: (templateId: string, cardId: string) =>
    set((state) => {
      const newMockTemplateCards = { ...state.mockTemplateCards };
      if (newMockTemplateCards[templateId]) {
        delete newMockTemplateCards[templateId][cardId];
        if (Object.keys(newMockTemplateCards[templateId]).length === 0) {
          delete newMockTemplateCards[templateId];
        }
      }
      return { mockTemplateCards: newMockTemplateCards };
    }),
}));
