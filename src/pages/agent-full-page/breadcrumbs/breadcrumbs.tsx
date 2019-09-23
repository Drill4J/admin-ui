import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useAgent } from '../../../hooks';
import { usePluginDispatch, setInitialConfig, usePluginState } from '../store';

import styles from './breadcrumbs.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const breadcrumbs = BEM(styles);

export const Breadcrumbs = withRouter(
  breadcrumbs(({ className, history: { push }, match: { params: { agentId } } }: Props) => {
    const { buildVersion = '', buildVersions = [] } = useAgent(agentId) || {};
    const { buildVersion: selectedBuildVersion } = usePluginState();
    const dispatch = usePluginDispatch();
    const { name = '', id = '' } =
      buildVersions.find(({ id: buildVersionId }) => buildVersionId === selectedBuildVersion) || {};

    // TODO: should be moved from this compenent
    React.useEffect(() => {
      dispatch(setInitialConfig({ agentId, pluginId: 'coverage', buildVersion }));
      // eslint-disable-next-line
    }, [buildVersion]);

    return (
      <div className={className}>
        <Content>
          <Item onClick={() => push(`/full-page/${agentId}/build-list`)}>All builds</Item>
          <Divider>{'>'}</Divider>
          <Item active>{name || id}</Item>
        </Content>
      </div>
    );
  }),
);

const Content = breadcrumbs.content('div');
const Item = breadcrumbs.item(
  div({ onClick: () => {} } as { active?: boolean; onClick?: () => void }),
);
const Divider = breadcrumbs.divider('div');
