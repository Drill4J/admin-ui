import * as React from 'react';

import { Section } from './section';

interface Props {
  risks?: number;
}

export const RisksSection = ({ risks = 0 }: Props) => (
  <Section
    label="Risks"
    info={risks}
  />
);
