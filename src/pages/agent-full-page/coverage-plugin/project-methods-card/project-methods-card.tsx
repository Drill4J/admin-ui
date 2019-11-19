import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../../components';
import { Panel } from '../../../../layouts';
import { Card } from '../card';
import { MethodsSection } from './methods-section';
import { Methods } from '../../../../types/methods';

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
      totalMethods = {},
      newMethods = {},
      deletedMethods = {},
      allModifiedModified = {},
      deletedCoveredMethodsCount = 0,
    },
  }: Props) => {
    return (
      <div className={className}>
        <Card
          header={
            <CardHeader>
              <Icons.Total />
              Total
            </CardHeader>
          }
        >
          <MethodsSection title="TOTAL" methodsInfo={totalMethods} />
        </Card>
        <Card
          header={
            <CardHeader>
              <Icons.Add />
              New
            </CardHeader>
          }
        >
          <MethodsSection title="NEW" methodsInfo={newMethods} />
        </Card>
        <Card
          header={
            <CardHeader>
              <Icons.Edit />
              Modified
            </CardHeader>
          }
        >
          <MethodsSection title="MODIFIED" methodsInfo={allModifiedModified} />
        </Card>
        <Card
          header={
            <CardHeader>
              <Icons.Delete />
              Deleted
            </CardHeader>
          }
        >
          <MethodsSection
            title="DELETED"
            methodsInfo={deletedMethods}
            additionalInfo={
              <DeletedMethodsAdditionalInfo>
                {`${deletedCoveredMethodsCount} of ${deletedMethods.totalCount ||
                  0} deleted methods were covered in previous build.`}
              </DeletedMethodsAdditionalInfo>
            }
          />
        </Card>
      </div>
    );
  },
);

const CardHeader = projectMethodsCard.cardHeader(Panel);
const DeletedMethodsAdditionalInfo = projectMethodsCard.deletedMethodsAdditionalInfo('span');
