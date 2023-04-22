import { ADD_CARDS, LIKE } from "../actions/actions";

export type TCard = {
  id: number;
  subjectId: number;
  subjectParentId: number;
  name: string;
  brand: string;
  brandId: number;
  siteBrandId: number;
  supplierId: number;
  sale: number;
  priceU: number;
  salePriceU: number;
  rating: number;
  feedbacks: number;
  graph: [
    {
      date: string;
      amount: number;
    }
  ];
  colors: [
    {
      name: string;
    }
  ];
};

const initialState: TCard[] = [];

export const cardReducer = (
  state: TCard[] = initialState,
  action: { type: string; payload: TCard[] }
): TCard[] => {
  switch (action.type) {
    case ADD_CARDS: {
      
      return [...action.payload];
    }
    case LIKE: {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};
