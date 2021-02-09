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
import { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Inputs, Button, GeneralAlerts,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { LoginLayout } from 'layouts';
import { TOKEN_HEADER, TOKEN_KEY } from 'common/constants';

const SignInForm = styled.div`
  ${tw`flex flex-col gap-y-6 mt-6`}
  & > * {
    ${tw`h-10 w-88`}
  }
`;

export const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { push } = useHistory();

  async function handleLogin() {
    try {
      const response = await axios.post('/login');
      const authToken = response.headers[TOKEN_HEADER.toLowerCase()];
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken);
      }
      window.location.reload();
    } catch ({ response: { data: { message = '' } = {} } = {} }) {
      setError(message || 'There was some issue with an authentication. Please try again later.');
    }
  }

  useLayoutEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      push('/');
    }
  }, []);

  return (
    <LoginLayout>
      <div tw="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div tw="text-32 leading-40 text-monochrome-black">Welcome to Drill4J</div>
          <div tw="mt-2 px-16 text-16 leading-24 text-monochrome-default text-center">
            Click &quot;Continue as a guest&quot; to entry Admin Panel with admin privilege
          </div>
          {error && (<GeneralAlerts tw="w-full mt-4" type="ERROR">{`${error}`}</GeneralAlerts>)}
          <SignInForm>
            <Inputs.Text placeholder="User ID" disabled />
            <Inputs.Text placeholder="Password" disabled />
          </SignInForm>
          <Button tw="flex justify-center w-88 mt-6" type="primary" size="large" disabled>
            Sign in
          </Button>
          <div tw="mt-6 font-bold text-14 leading-20 text-blue-default opacity-25">Forgot your password?</div>
          <Button tw="flex justify-center w-88 mt-10 " type="secondary" size="large" onClick={handleLogin}>
            Continue as a guest (with admin rights)
          </Button>
        </div>
        <div tw="mb-6 font-regular text-12 leading-24 text-monochrome-default text-center">
          {`© ${new Date().getFullYear()} Drill4J. All rights reserved.`}
        </div>
      </div>
    </LoginLayout>
  );
};
