import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Panel, Icons } from '@drill4j/ui-kit';

import { Methods } from 'types/methods';
import { Card } from '../card';
import { MethodsSection } from './methods-section';

import styles from './project-methods-card.module.scss';

interface Props {
  className?: string;
  methods: Methods;
  showDeletedMethods?: boolean;
}

const projectMethodsCard = BEM(styles);

export const ProjectMethodsCard = projectMethodsCard(
  ({
    className,
    methods: {
      all, new: newMethods, modified, deleted,
    },
  }: Props) => (
    <div className={className}>
      <Card
        header={(
          <CardHeader>
            <Icons.Total />
            Total
          </CardHeader>
        )}
      >
        <MethodsSection title="TOTAL" methodsCount={all} type="all" />
      </Card>
      <Card
        header={(
          <CardHeader>
            <Icons.Add />
            New
          </CardHeader>
        )}
      >
        <MethodsSection title="NEW" methodsCount={newMethods} type="new" />
      </Card>
      <Card
        header={(
          <CardHeader>
            <Icons.Edit />
            Modified
          </CardHeader>
        )}
      >
        <MethodsSection title="MODIFIED" methodsCount={modified} type="modified" />
      </Card>
      <Card
        header={(
          <CardHeader>
            <Icons.Delete />
            Deleted
          </CardHeader>
        )}
      >
        <MethodsSection
          title="DELETED"
          methodsCount={deleted}
          additionalInfo={(
            <DeletedMethodsAdditionalInfo>
              {`${deleted?.covered} of ${deleted?.total
                  || 0} deleted methods were covered in previous build.`}
            </DeletedMethodsAdditionalInfo>
          )}
          type="deleted"
        />
      </Card>
    </div>
  ),
);

const CardHeader = projectMethodsCard.cardHeader(Panel);
const DeletedMethodsAdditionalInfo = projectMethodsCard.deletedMethodsAdditionalInfo('span');
