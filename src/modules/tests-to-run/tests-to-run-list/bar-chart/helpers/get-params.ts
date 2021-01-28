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
import { graphParams } from '../constants';

export function getParams(duration: number) {
  const durationsMs = graphParams.map(x => x.duration);

  const lesserNeighborIndex = durationsMs.findIndex(x => x <= duration);

  const isOutOfRange = lesserNeighborIndex === -1;
  if (isOutOfRange) {
    const isLessThanRange = duration <= durationsMs[durationsMs.length - 1];
    if (isLessThanRange) {
      return graphParams[graphParams.length - 1];
    }
    return graphParams[0];
  }

  const exactGt = lesserNeighborIndex === durationsMs.length - 1;
  if (exactGt) {
    return graphParams[graphParams.length - 1];
  }

  const exactLt = lesserNeighborIndex === 0;
  if (exactLt) {
    return graphParams[0];
  }

  const lesserError = Math.abs(durationsMs[lesserNeighborIndex] - duration);
  const greaterError = Math.abs(durationsMs[lesserNeighborIndex - 1] - duration);

  const bestNeighborIndex = lesserError < greaterError
    ? lesserNeighborIndex
    : lesserNeighborIndex - 1;

  const step = graphParams[bestNeighborIndex];

  return step;
}
