import * as React from 'react';

import { Section } from './section';

interface Props {
  testsToRun?: { groupedTets?: { [testType: string]: string[] }; count?: number };
}

export const TestsToRunSection = ({ testsToRun: { count = 0 } = {} }: Props) => (
  <Section
    label="Tests to run"
    info={count}
  />
);
