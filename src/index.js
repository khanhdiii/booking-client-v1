import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider, SearchContext } from './context/SearchContex';
import { AuthContextProvider } from './context/AuthContext';
import store from "./redux/store"
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </Provider>,
  </React.StrictMode>
);
