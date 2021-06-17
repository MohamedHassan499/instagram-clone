import React from 'react';
import ReactDOM from 'react-dom';

import { firebase, FieldValue } from './lib/firebase';
import App from './App';
import FirebaseContext from './contexts/FirebaseContext'

ReactDOM.render(
    <FirebaseContext.Provider value= {{ firebase, FieldValue}}>
      <App />
    </FirebaseContext.Provider>,
     document.getElementById('root')
);

