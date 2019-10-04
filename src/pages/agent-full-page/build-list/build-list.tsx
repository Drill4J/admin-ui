import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Table, Column } from '../../../components';
import { useAgent } from '../../../hooks';
import { setBuildVersion, usePluginDispatch } from '../store';

import styles from './build-list.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const buildList = BEM(styles);

export const BuildList = withRouter(
  buildList(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const { buildVersions = [] } = useAgent(agentId) || {};
    const dispatch = usePluginDispatch();

    return (
      <div className={className}>
        <Table data={buildVersions as any}>
          <Column
            name="name"
            label="Name"
            Cell={({ value, item: { id } }) => (
              <NameCell
                onClick={() => {
                  dispatch(setBuildVersion(id));
                  push(`/full-page/${agentId}/dashboard`);
                }}
              >
                {value || id}
              </NameCell>
            )}
          />
          <Column name="id" label="ID" />
        </Table>
      </div>
    );
  }),
);

const NameCell = buildList.nameCell('div');
