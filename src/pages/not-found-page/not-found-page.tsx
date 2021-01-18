import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as NotFoundSvg } from './not-found.svg';

import styles from './not-found-page.module.scss';

interface Props {
  className?: string;
}

const notFoundPage = BEM(styles);

export const NotFoundPage = notFoundPage(({ className }: Props) => (
  <div className={className}>
    <ContentWrapper>
      <Title>Oops!</Title>
      <Message>Sorry, we cannot find the page you’re looking for.</Message>
      <ErrorCode>Error code: 404</ErrorCode>
    </ContentWrapper>
    <LogoWrapper>
      <NotFoundSvg />
    </LogoWrapper>
  </div>
));

const ContentWrapper = notFoundPage.contentWrapper('div');
const LogoWrapper = notFoundPage.logoWrapper('div');
const Title = notFoundPage.title('div');
const Message = notFoundPage.message('div');
const ErrorCode = notFoundPage.errorCode('div');
