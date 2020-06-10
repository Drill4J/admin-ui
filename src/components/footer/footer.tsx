import * as React from 'react';
import { BEM, tag } from '@redneckz/react-bem-helper';
import nanoid from 'nanoid';
import { Panel } from '@drill4j/ui-kit';

import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { DrillVersion } from 'types/drill-version';
import packageJson from '../../../package.json';

import styles from './footer.module.scss';

interface Props {
  className?: string;
}

interface FooterLinkProps {
  name: string;
  link: string;
}

const FooterLink = ({ name, link }: FooterLinkProps) => (
  <Link href={link} target="_blank" rel="noopener noreferrer">
    {name}
  </Link>
);

const footer = BEM(styles);

export const Footer = footer(({ className }: Props) => {
  const { admin: backendVersion } = useWsConnection<DrillVersion>(defaultAdminSocket, '/version') || {};
  const socialLinks = [
    {
      name: 'Fork us on GitHub',
      link: 'https://github.com/Drill4J',
    },
    {
      name: 'Chat with us on Telegram',
      link: 'https://t.me/drill4j',
    },
    {
      name: 'Contact us',
      link: 'mailto:drill4j@gmail.com',
    },
    {
      name: 'EPAM',
      link: 'https://www.epam.com/',
    },
    {
      name: 'Documentation',
      link: 'https://drill4j.github.io/Wiki/',
    },
  ];

  return (
    <div className={className}>
      <ContentWrapper>
        <Content align="space-between">
          <AdminInfo>
            <span>
              {`© Drill4J ${new Date().getFullYear()}`}
            </span>
            <span>
              {`Admin UI: ${process.env.REACT_APP_VERSION || packageJson.version}`}
            </span>
            {backendVersion && (
              <span>
                {`Admin: ${backendVersion}`}
              </span>
            )}
            <span>All rights reserved.</span>
          </AdminInfo>
          <span>
            {socialLinks.map(({ name, link }) => (
              <FooterLink name={name} link={link} key={nanoid()} />
            ))}
          </span>
        </Content>
      </ContentWrapper>
    </div>
  );
});

const ContentWrapper = footer.contentWrapper('div');
const Content = footer.content(Panel);
const AdminInfo = footer.adminInfo('span');
const Link = footer.link(
  tag('a')({ href: '', rel: '', target: '' } as { href: string; rel: string; target: string }),
);
