import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

const renderApplication = () => {
  // debugger
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// if (sessionStorage.getItem("X-CSRF-Token") === undefined) {
  // debugger  
//   sessionStorage.setItem("X-CSRF-Token", null)
// }

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  // debugger
  restoreCSRF().then(renderApplication);
} else {
  // debugger
  renderApplication();
}