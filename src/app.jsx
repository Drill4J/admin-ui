import React from 'react';
import PageSwitcher from 'routes/pageSwitcher';
import { LocalizationContainer } from 'components/localization/localizationContainer';

const App = () => (
  <LocalizationContainer>
    <PageSwitcher />
  </LocalizationContainer>
);

export default App;
