import * as React from 'react';
import { BEM, tag } from '@redneckz/react-bem-helper';

import packageJson from '../../../package.json';
import { Panel } from '../../layouts';

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
            <span>© Drill4J {new Date().getFullYear()}</span>
            <span>Build {packageJson.version}</span>
            <span>All rights reserved.</span>
          </AdminInfo>
          <span>
            {socialLinks.map(({ name, link }, index) => (
              <FooterLink name={name} link={link} key={index} />
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
