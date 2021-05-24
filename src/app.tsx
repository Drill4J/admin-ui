/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import { PageSwitcher } from './routes';
import { NotificationManager } from './notification-manager';
import { configureAxios } from './common/connection';

import './index.css';

configureAxios();

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    ${tw`w-full h-full m-0 p-0 box-border text-monochrome-black`}
  }

  body {
    ${tw`font-regular`};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  h2 {
    ${tw`font-light text-monochrome-default text-18 leading-24`};
  }

  b {
    ${tw`font-bold`};
  }
`;

export const App = () => (
  <Router>
    <GlobalStyle />
    <NotificationManager>
      <PageSwitcher />
    </NotificationManager>
  </Router>
);
