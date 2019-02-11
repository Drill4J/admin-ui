import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { LoginLayout } from '../../layouts';
import { Input, Button, Icons } from '../../components';

import styles from './login-page.module.scss';

interface Props {
  className?: string;
}

const loginPage = BEM(styles);

export const LoginPage = loginPage(({ className }: Props) => (
  <LoginLayout>
    <div className={className}>
      <Title>Welcome to Drill4J Portal</Title>
      <SubTitle>Login is temporarily unavailable. Click "Сontinue as guest" to continue</SubTitle>
      <SignInForm>
        <Input placeholder="User ID" rounded icon={<Icons.Account />} />
        <Input placeholder="Password" rounded icon={<Icons.Lock />} />
        <SignInButton type="primary">
          Sign in <Icons.Arrow />
        </SignInButton>
      </SignInForm>
      <ForgotPasswordLink>Forgot your password?</ForgotPasswordLink>
      <Button type="secondary">Continue as guest (read only)</Button>
      <Copyright>{`© ${new Date().getFullYear()} Drill4J. All rights reserved.`}</Copyright>
    </div>
  </LoginLayout>
));

const Title = loginPage.title('div');
const SubTitle = loginPage.subTitle('div');
const SignInForm = loginPage.signInForm('div');
const SignInButton = loginPage.signInButton(Button);
const ForgotPasswordLink = loginPage.forgotPassword('div');
const Copyright = loginPage.copyright('div');
