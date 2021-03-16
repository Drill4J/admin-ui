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
import tw, { styled } from 'twin.macro';

interface Props {
  width: number;
  height: number;
  color: string;
  percent: number;
  icon?: React.ReactNode;
}

const isNumber = (value: string | number) => !Number.isNaN(parseFloat(String(value)));

const Path = styled.path`
  ${tw`m-auto`}
  animation: bounce linear 600ms;
  transform-origin: 50% 100%;

  @keyframes bounce {
    0% {
      transform: scaleY(0);
    }

    80% {
      transform: scaleY(1.1);
    }

    100% {
      transform: scaleY(1);
    }
  }
`;

export const SingleBar = ({
  width, height, color, percent, icon,
}: Props) => {
  const y = !isNumber(percent) ? height : height - (height * percent) / 100;

  return (
    <div>
      <div tw="relative mr-1 bg-monochrome-light-tint" style={{ width: `${width}px`, height: `${height}px` }}>
        <div tw="absolute top-2 left-2/4 transform -translate-x-1/2 text-12 leading-20 text-monochrome-default">
          {icon}
        </div>
        <svg width={`${width}px`} height={`${height}px`}>
          <Path d={`M 0 ${height} L 0 ${y} L ${width} ${y} l ${width} ${height} Z`} fill={color} />
        </svg>
      </div>
    </div>
  );
};
