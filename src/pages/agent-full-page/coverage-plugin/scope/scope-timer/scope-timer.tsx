import { useEffect, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { formatMsToDate } from 'utils';

import styles from './scope-timer.module.scss';

interface Props {
  className?: string;
  started: number;
  finished?: number;
  active?: boolean;
  size?: 'normal' | 'small';
}

interface State {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const scopeTimer = BEM(styles);

export const ScopeTimer = scopeTimer(({
  className, started, finished, active,
}: Props) => {
  const [{
    days, hours, minutes, seconds,
  }, setDuration] = useState<State>(
    getTimeDifference(started, finished),
  );

  useEffect(() => {
    function updateTimer() {
      setDuration(getTimeDifference(started, finished));
    }

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [started, finished]);

  return (
    <span className={className}>
      <Duration>{`${days}d ${hours}h ${minutes}m`}</Duration>
      {active && (
        <Timer>
          {seconds < 10 ? ` : 0${seconds}` : ` : ${seconds}`}
        </Timer>
      )}
    </span>
  );
});

function getTimeDifference(started: number, finished?: number) {
  const duration = finished ? finished - started : Date.now() - started;

  return formatMsToDate(duration);
}

const Duration = scopeTimer.duration('span');
const Timer = scopeTimer.timer('span');
