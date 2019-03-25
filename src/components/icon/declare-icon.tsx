import React from 'react';
import { GenericIcon } from './generic-icon';

interface Settings {
  viewBox?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  fillRule?: 'inherit' | 'nonzero' | 'evenodd';
}

interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
}

export function declareIcon(path: string, settings: Settings = {}) {
  const { defaultWidth = 16, defaultHeight = 16, fillRule = 'evenodd', viewBox } = settings;
  return ({ width = defaultWidth, height = defaultHeight, ...rest }: Props) => (
    <GenericIcon
      path={path}
      width={width}
      height={height}
      viewBox={viewBox || `0 0 ${defaultWidth} ${defaultHeight}`}
      fillRule={fillRule}
      {...rest}
    />
  );
}
