import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Rotas from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<Rotas />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

