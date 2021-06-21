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
import { MethodCoverage } from './method-coverage';

export interface PackageClass {
  assocTestsCount?: number;
  coverage?: number;
  coveredMethodsCount?: number;
  id?: string;
  name?: string;
  path?: string;
  methods?: MethodCoverage[]
}

export interface Package {
  assocTestsCount?: number;
  coverage?: number;
  coveredMethodsCount?: number;
  id?: string;
  coveredClassesCount?: number;
  name?: string;
  totalClassesCount?: number;
  totalCount?: number;
  totalMethodsCount?: number;
  classes?: PackageClass[];
}
