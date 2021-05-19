/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { formatMsToDate } from 'utils';

interface Props {
  started: number;
  active: boolean;
}

interface State {
  hours: number;
  minutes: number;
  seconds: number;
}

export const MonitotingDuration = ({ started, active }: Props) => {
  const [{ hours, minutes, seconds }, setDuration] = useState<State>(
    getTimeDifference(started),
  );

  useEffect(() => {
    function updateTimer() {
      setDuration(getTimeDifference(started));
    }

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  return (
    <div tw="flex items-center gap-x-1 text-12 leading-16 font-bold">
      {active && <div tw="w-2.5 h-2.5 rounded-full bg-red-default animate-blinker" />}
      Duration:
      <span tw="font-regular text-monochrome-default">
        {`${lessThanTen(hours)}:${lessThanTen(minutes)}:`}
        <Seconds active={active}>{lessThanTen(seconds)}</Seconds>
      </span>
    </div>
  );
};

function lessThanTen(value: number) {
  return value < 10 ? `0${value}` : value;
}

function getTimeDifference(started: number) {
  const duration = Date.now() - started;

  return formatMsToDate(duration);
}

const Seconds = styled.span`
  ${({ active }: { active: boolean }) => active && tw`font-bold text-green-default`}
`;
