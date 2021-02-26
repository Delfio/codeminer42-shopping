import React from 'react';
import Home from './pages/Home';
import GlobalStyle from './assets/global';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Home />
    </AppProvider>
  </>
);

export default App;
