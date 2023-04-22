// import { compose, createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/index";

// Наш усилитель
const actionLogger = (store: any) => (next: any) => (action: any) => {
  // Выводим в консоль время события и его содержание
// console.log(`${new Date().getTime()} | Action: ${JSON.stringify(action)}` );
  // Передаём событие «по конвейеру» дальше
return next(action);
};

// Расширитель хранилища принимает в качестве аргумента усилитель
const enhancer = applyMiddleware(actionLogger);

export const store = createStore(rootReducer, enhancer);