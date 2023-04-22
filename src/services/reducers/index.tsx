import { combineReducers } from 'redux';
import { cardReducer } from './card-reducer';
import { photoReducer } from './photo-reducer';
import { store } from '../store';

export const rootReducer = combineReducers({
  card: cardReducer, 
  photo: photoReducer,
});

export type RootState = ReturnType<typeof store.getState>