import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { LinkButton } from '@drill4j/ui-kit';

import { Methods } from 'types/methods';
import { InfoCard } from 'components';
import { RisksModal } from '../risks-modal';

import styles from './project-methods-card.module.scss';

interface Props {
  className?: string;
  methods: Methods;
}

const projectMethodsCard = BEM(styles);

export const ProjectMethodsCard = projectMethodsCard(
  ({
    className,
    methods: {
      all, new: newMethods, modified, deleted, risks,
    },
  }: Props) => {
    const [risksFilter, setRisksFilter] = React.useState<string>('');
    return (
      <div className={className}>
        <InfoCard
          label="ALL METHODS"
          covered={all?.covered}
          totalCount={all?.total}
        />
        <InfoCard
          label="NEW"
          covered={newMethods?.covered}
          totalCount={newMethods?.total}
        >
          {Boolean(risks?.new) && (
            <LinkButton size="small" onClick={() => setRisksFilter('new')} data-test="info-card:link-button:new:risks">
              {risks?.new} risks
            </LinkButton>
          )}
        </InfoCard>
        <InfoCard
          label="MODIFIED"
          covered={modified?.covered}
          totalCount={modified?.total}
        >
          {Boolean(risks?.modified) && (
            <LinkButton size="small" onClick={() => setRisksFilter('modified')} data-test="info-card:link-button:modified:risks">
              {risks?.modified} risks
            </LinkButton>
          )}
        </InfoCard>
        <InfoCard
          label="DELETED"
          covered={deleted?.covered}
          totalCount={deleted?.total}
        />
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
