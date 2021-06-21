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
export const SET_IS_NEW_SESSION = 'SET_IS_NEW_SESSION';
export const SET_SINGLE_OPERATION = 'SET_SINGLE_OPERATION';
export const SET_BULK_OPERATION = 'SET_BULK_OPERATION';

export type OperationType = 'abort' | 'finish';

type SingleOperation = {
  id: string;
  operationType: OperationType;
}

type BulkOperation = {
  isProcessing: boolean;
  operationType: OperationType;
}

export interface SessionsPaneState {
  singleOperation: SingleOperation;
  bulkOperation: BulkOperation;
  isNewSession: boolean;
}

export type Action = ReturnType<typeof setSingleOperation | typeof setIsNewSession | typeof setBulkOperation>;

export const setSingleOperation = (operationType: OperationType, id: string) => ({
  type: SET_SINGLE_OPERATION,
  payload: { id, operationType },
} as const);

export const setBulkOperation = (operationType: OperationType, isProcessing: boolean) => ({
  type: SET_BULK_OPERATION,
  payload: { isProcessing, operationType },
} as const);

export const setIsNewSession = (isNewSession: boolean) => ({
  type: SET_IS_NEW_SESSION,
  payload: isNewSession,
} as const);

export const sessionPaneReducer = (state: SessionsPaneState, action: Action): SessionsPaneState => {
  switch (action.type) {
    case SET_BULK_OPERATION:
      return {
        ...state,
        bulkOperation: action.payload,
      };
    case SET_SINGLE_OPERATION:
      return {
        ...state,
        singleOperation: action.payload,
      };
    case SET_IS_NEW_SESSION:
      return {
        ...state,
        isNewSession: action.payload,
      };
    default:
      return state;
  }
};
