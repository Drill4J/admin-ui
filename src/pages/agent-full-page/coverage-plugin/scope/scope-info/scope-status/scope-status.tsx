import { BEM } from '@redneckz/react-bem-helper';

import { ScopeTimer } from '../..';

import styles from './scope-status.module.scss';

interface Props {
  className?: string;
  active: boolean;
  loading: boolean;
  enabled: boolean;
  started: number;
  finished: number;
}

const scopeStatus = BEM(styles);

export const ScopeStatus = scopeStatus(({
  className, active, enabled, started, finished,
}: Props) => (
  <div className={className}>
    {active
      ? <Active data-test="scope-status:active">Active</Active>
      : (
        <>
          {enabled
            ? <span data-test="scope-status:finished">Finished</span>
            : <span data-test="scope-status:ignored">Ignored</span>}
        </>
      )}
    <ScopeTimer started={started} finished={finished} active={active} size="small" />
  </div>
));

const Active = scopeStatus.active('div');
