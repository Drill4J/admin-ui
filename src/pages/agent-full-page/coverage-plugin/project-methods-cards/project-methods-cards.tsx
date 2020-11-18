import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { LinkButton } from '@drill4j/ui-kit';

import { Methods } from 'types/methods';
import { BuildMethodsCard } from 'components';
import { RisksModal } from '../risks-modal';

import styles from './project-methods-cards.module.scss';

interface Props {
  className?: string;
  methods: Methods;
}

const projectMethodsCards = BEM(styles);

export const ProjectMethodsCards = projectMethodsCards(
  ({
    className,
    methods: {
      all, new: newMethods, modified, deleted, risks,
    },
  }: Props) => {
    const [risksFilter, setRisksFilter] = React.useState<string>('');
    return (
      <div className={className}>
        <BuildMethodsCard
          totalCount={all?.total}
          covered={all?.covered}
          label="TOTAL METHODS"
        >
          {deleted?.total} <Deleted>deleted</Deleted>
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={newMethods?.total}
          covered={newMethods?.covered}
          label="NEW"
        >
          {Boolean(risks?.new) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('new')}
              data-test="project-methods-cards:link-button:new:risks"
            >
              {risks?.new} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
        <BuildMethodsCard
          totalCount={modified?.total}
          covered={modified?.covered}
          label="MODIFIED"
        >
          {Boolean(risks?.modified) && (
            <LinkButton
              size="small"
              onClick={() => setRisksFilter('modified')}
              data-test="project-methods-cards:link-button:modified:risks"
            >
              {risks?.modified} risks
            </LinkButton>
          )}
        </BuildMethodsCard>
        {risksFilter && (
          <RisksModal
            isOpen={Boolean(risksFilter)}
            onToggle={() => setRisksFilter('')}
            filter={risksFilter}
          />
        )}
      </div>
    );
  },
);

const Deleted = projectMethodsCards.deleted('span');
