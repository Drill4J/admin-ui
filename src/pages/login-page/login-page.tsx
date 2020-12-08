import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Inputs, Button, GeneralAlerts, Panel,
} from '@drill4j/ui-kit';

import { LoginLayout } from 'layouts';
import { defaultAdminSocket, defaultTest2CodePluginSocket, getSocketUrl } from 'common/connection';
import { TOKEN_HEADER, TOKEN_KEY } from 'common/constants';

import styles from './login-page.module.scss';

interface Props {
  className?: string;
}

const loginPage = BEM(styles);

export const LoginPage = loginPage(({ className }: Props) => {
  const [error, setError] = React.useState<string | null>(null);
  const { push } = useHistory();

  async function handleLogin() {
    try {
      const response = await axios.post('/login');
      const authToken = response.headers[TOKEN_HEADER.toLowerCase()];
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken);
      }
      defaultAdminSocket.reconnect(getSocketUrl('drill-admin-socket'));
      defaultTest2CodePluginSocket.reconnect(getSocketUrl('/plugins/test2code'));
      push('/');
    } catch ({ response: { data: { message = '' } = {} } = {} }) {
      setError(message || 'There was some issue with an authentication. Please try again later.');
    }
  }

  return (
    <LoginLayout>
      <div className={className}>
        <Content align="center" direction="column">
          <Title>Welcome to Drill4J</Title>
          <SubTitle>Click &quot;Continue as a guest&quot; to entry Admin Panel with admin privilege</SubTitle>
          {error && <Error type="ERROR">{`${error}`}</Error>}
          <SignInForm>
            <Inputs.Text placeholder="User ID" disabled />
            <Inputs.Text placeholder="Password" disabled />
          </SignInForm>
          <LoginButton type="primary" size="large" disabled>
            Sign in
          </LoginButton>
          <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
          <LoginAsGuestButton type="secondary" size="large" onClick={handleLogin}>
            Continue as a guest (read only)
          </LoginAsGuestButton>
        </Content>
        <Copyright>{`© ${new Date().getFullYear()} Drill4J. All rights reserved.`}</Copyright>
      </div>
    </LoginLayout>
  );
});

const Content = loginPage.content(Panel);
const Title = loginPage.title('div');
const SubTitle = loginPage.subTitle('div');
const Error = loginPage.error(GeneralAlerts);
const SignInForm = loginPage.signInForm('div');
const ForgotPasswordLink = loginPage.forgotPassword('div');
const LoginButton = loginPage.loginButton(Button);
const LoginAsGuestButton = loginPage.loginAsGuestButton(Button);
const Copyright = loginPage.copyright('div');
