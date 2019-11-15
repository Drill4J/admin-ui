import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';
import { AxiosError } from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LoginLayout } from '../../layouts';
import { Icons } from '../../components';
import { Inputs, Button } from '../../forms';
import { defaultAdminSocket, defaultPluginSocket, getSocketUrl } from '../../common/connection';
import { TOKEN_HEADER, TOKEN_KEY } from '../../common/constants';
import { ErrorPanel } from './error-panel';

import styles from './login-page.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
}

const loginPage = BEM(styles);

export const LoginPage = withRouter(
  loginPage(({ className, history: { push } }: Props) => {
    const [error, setError] = React.useState<AxiosError | null>(null);

    async function handleLogin() {
      await axios
        .post('/login')
        .then((response) => {
          const authToken = response.headers[TOKEN_HEADER.toLowerCase()];
          if (authToken) {
            localStorage.setItem(TOKEN_KEY, authToken);
          }
          defaultAdminSocket.reconnect(getSocketUrl('drill-admin-socket'));
          defaultPluginSocket.reconnect(getSocketUrl('drill-plugin-socket'));
          push('/');
        })
        .catch((err: AxiosError) => setError(err));
    }

    return (
      <LoginLayout>
        <div className={className}>
          <Logo />
          <Title>Welcome to Drill4J</Title>
          <SubTitle>Click "Continue as a guest" to entry Admin Panel with admin privilege</SubTitle>
          {error && <Error>{`${error.message}`}</Error>}
          <SignInForm>
            <Inputs.Text placeholder="User ID" disabled rounded icon={<Icons.Account />} />
            <Inputs.Text placeholder="Password" disabled rounded icon={<Icons.Lock />} />
            <SignInButton disabled type="primary" data-test="login-page:sign-in-button">
              Sign in <Icons.Arrow />
            </SignInButton>
          </SignInForm>
          <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
          <Button
            type="secondary"
            onClick={handleLogin}
            data-test="login-page:button-continue-as-a-guest"
          >
            Continue as a guest (read only)
          </Button>
          <Copyright>{`© ${new Date().getFullYear()} Drill4J. All rights reserved.`}</Copyright>
        </div>
      </LoginLayout>
    );
  }),
);

const Logo = loginPage.logo('div');
const Title = loginPage.title('div');
const SubTitle = loginPage.subTitle('div');
const Error = loginPage.error(ErrorPanel);
const SignInForm = loginPage.signInForm('div');
const SignInButton = loginPage.signInButton(Button);
const ForgotPasswordLink = loginPage.forgotPassword('div');
const Copyright = loginPage.copyright('div');
