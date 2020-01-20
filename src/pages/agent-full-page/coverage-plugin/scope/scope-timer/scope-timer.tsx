import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './scope-timer.module.scss';

interface Props {
  className?: string;
  started: number;
  finised?: number;
  active?: boolean;
  type?: 'primary' | 'small';
}

interface State {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const scopeTimer = BEM(styles);

export const ScopeTimer = scopeTimer(({
  className, started, finised, active,
}: Props) => {
  const [{
    days, hours, minutes, seconds,
  }, setDuration] = React.useState<State>(
    getTimeDifference(started, finised),
  );

  React.useEffect(() => {
    function updateTimer() {
      setDuration(getTimeDifference(started, finised));
    }

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [started, finised]);

  return (
    <span className={className}>
      <Duration>{`${days}d ${hours}h ${minutes}m`}</Duration>
      {active && (
        <Timer>
          {seconds < 10 ? ` :0${seconds}` : `: ${seconds}`}
        </Timer>
      )}
    </span>
  );
});

function getTimeDifference(started: number, finished?: number) {
  const duration = finished ? finished - started : Date.now() - started;

  const days = Math.floor(duration / 86400000);
  const hours = Math.floor((duration - days * 86400000) / 3600000);
  const minutes = Math.floor((duration - days * 86400000 - hours * 3600000) / 60000);
  const seconds = Math.floor(
    (duration - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000,
  );

  return {
    days, hours, minutes, seconds,
  };
}

const Duration = scopeTimer.duration('span');
const Timer = scopeTimer.timer('span');
