import { createStore } from 'redux';

// Определяем начальное состояние
const initialState = {
  way: 'http://127.0.0.1:5000/static/Ocean.json',
};

interface wayToMap {
  type: string;
  payload: string;
}

interface AppState {
  way?: string;
  catalog?: string;
  rasterData?: string;
}

// Редюсер для обновления состояния
const rootReducer = (state: AppState = initialState, action: wayToMap): AppState => {
  switch (action.type) {
    case 'way':
      return { ...state, way: action.payload };
    case 'catalog':
      return { ...state, catalog: action.payload };
    case 'rasterData':
      return { ...state, rasterData: action.payload };
    default:
      return state;
  }
};








// Создаем Redux-хранилище
const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
