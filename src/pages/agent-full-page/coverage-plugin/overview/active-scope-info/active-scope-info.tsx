import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { NavLink, useParams } from 'react-router-dom';
import {
  Panel, Button, Icons, SessionIndicator,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { usePluginState } from '../../../store';

import styles from './active-scope-info.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope | null;
}

const activeScopeInfo = BEM(styles);

export const ActiveScopeInfo = activeScopeInfo(({
  className,
  scope,
}: Props) => {
  const {
    id: scopeId,
    coverage: { ratio = 0, overlap: { percentage: overlapCoverage = 0 } = {} } = {},
  } = scope || {};
  const { agentId, buildVersion, pluginId } = useParams();
  const dispatch = useCoveragePluginDispatch();
  const { loading } = usePluginState();

  return (
    <div className={className}>
      <Panel align="space-between">
        <Title>ACTIVE SCOPE</Title>
        <div>
          <Link
            to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scopeId}`}
            data-test="active-scope-info:scope-details-link"
          >Details
          </Link>
          &nbsp;&#124;&nbsp;
          <Link
            to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/`}
            data-test="active-scope-info:all-scopes-link"
          >All scopes
          </Link>
        </div>
      </Panel>
      <CoverageInfo>
        <ScopeCoverage data-test="active-scope-info:scope-coverage">{`${percentFormatter(ratio)}%`}</ScopeCoverage>
        <OverlappedCoverage
          data-test="active-scope-info:overlapped-coverage"
        >
          <b>{`${percentFormatter(overlapCoverage)}%`}</b> overlapped with build
        </OverlappedCoverage>
      </CoverageInfo>
      <Panel align="space-between">
        <Button
          type="primary"
          size="large"
          onClick={() => dispatch(openModal('FinishScopeModal', scope))}
          data-test="active-scope-info:finish-scope-button"
        >
          <Icons.Complete />
          <span>Complete Active Scope</span>
        </Button>
        <SessionIndicator active={loading} />
      </Panel>
    </div>
  );
});

const Title = activeScopeInfo.title('div');
const Link = activeScopeInfo.link(NavLink);
const CoverageInfo = activeScopeInfo.coverageInfo('div');
const ScopeCoverage = activeScopeInfo.scopeCoverage('div');
const OverlappedCoverage = activeScopeInfo.overlappedCoverage('div');
