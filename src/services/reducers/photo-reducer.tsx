import { ADD_PHOTOS, LIKE } from "../actions/actions";

export type TPhoto = {
  [key: number]: string;
};

const initialState: TPhoto = {};

export const photoReducer = (
  state: TPhoto = initialState,
  action: { type: string; payload: TPhoto }
): TPhoto => {
  console.log(action.payload)
  switch (action.type) {
    case ADD_PHOTOS: {
      
      return {...action.payload};
    }
    case LIKE: {
      return {...action.payload};
    }
    default: {
      return state;
    }
  }
};