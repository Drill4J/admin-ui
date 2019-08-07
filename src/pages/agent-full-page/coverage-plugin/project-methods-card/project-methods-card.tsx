import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Card } from '../card';
import { MethodsSection } from './methods-section';
import { MethodsModal } from '../methods-modal';
import { combineModifiedMethods } from './combine-modified-methods';
import { Methods } from '../../../../types/methods';

import styles from './project-methods-card.module.scss';

interface Props {
  className?: string;
  methods: Methods;
  header?: React.ReactNode;
}

const projectMethodsCard = BEM(styles);

export const ProjectMethodsCard = projectMethodsCard(
  ({
    className,
    header,
    methods: {
      totalMethods = {},
      newMethods = {},
      deletedMethods = {},
      modifiedBodyMethods = {},
      modifiedDescMethods = {},
      modifiedNameMethods = {},
    },
  }: Props) => {
    const modifiedMethods = combineModifiedMethods(
      modifiedBodyMethods,
      modifiedDescMethods,
      modifiedNameMethods,
    );

    return (
      <div className={className}>
        <Card header={header}>
          <MethodsSection title="TOTAL" methodsInfo={totalMethods} />
          <MethodsSection title="MODIFIED" methodsInfo={modifiedMethods} />
          <MethodsSection title="NEW" methodsInfo={newMethods} />
          <MethodsSection title="DELETED" methodsInfo={deletedMethods} />
        </Card>
      </div>
    );
  },
);
