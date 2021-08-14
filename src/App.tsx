import React from 'react';

import GlobalStyle from './styles/global';
import Home from './pages/Home';
import CompanyRegister from './pages/CompanyRegister';

const App: React.FC = () => (
  <>
    <CompanyRegister />
    <GlobalStyle />
  </>
);
export default App;
