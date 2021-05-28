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
import {
  required,
  sizeLimit,
  composeValidators,
  toError,
  handleFieldErrors,
  numericLimits,
  positiveInteger,
} from './form-validators';

describe('toError', () => {
  it('should return final form error format by provided fieldname and error', () => {
    expect(toError('foo.bar.buz', 'error')).toEqual({ foo: { bar: { buz: 'error' } } });

    expect(toError('foo', 'error')).toEqual({ foo: 'error' });
  });
});

describe('required', () => {
  const validator = required('username');
  it('should return errors if property dosent exist or empty', () => {
    expect(validator({})).toEqual({ username: 'username is required.' });
    expect(validator({ username: '      ' })).toEqual({
      username: 'username is required.',
    });
    expect(validator({ username: null })).toEqual({
      username: 'username is required.',
    });
    expect(validator({ username: undefined })).toEqual({
      username: 'username is required.',
    });
  });

  it('should return undefined in no errors found', () => {
    expect(validator({ username: 'username' })).toBeUndefined();
  });
});

describe('sizeLimit', () => {
  const validator = sizeLimit({ name: 'username' });
  it('should return errors if property goes beoynd limits', () => {
    expect(validator({ username: '      ' })).toEqual({
      username: 'username size should be between 3 and 32 characters.',
    });
  });

  it('should return undefined if no values provided', () => {
    expect(validator({})).toEqual(undefined);
    expect(validator({ username: null })).toEqual(undefined);
    expect(validator({ username: undefined })).toEqual(undefined);
  });

  it('should return undefined if no errors found', () => {
    expect(validator({ username: 'username' })).toBeUndefined();
  });

  it('Should return <alias> instead of <name> if <alias> is passed', () => {
    const val = sizeLimit({ name: 'field', alias: 'session' });
    expect(val({ field: 'id', session: 'session' })).toEqual({
      field: 'session size should be between 3 and 32 characters.',
    });
  });
});

describe('composeValidators', () => {
  const validator = required('username');
  const secondValidator = sizeLimit({ name: 'password', min: 6, max: 64 });
  const composedValidators = composeValidators(validator, secondValidator);
  it('should compose all validators and return errors', () => {
    expect(composedValidators({ username: null, password: '12' })).toEqual({
      username: 'username is required.',
      password: 'password size should be between 6 and 64 characters.',
    });
  });

  it('should return undefined if no errors found', () => {
    expect(composedValidators({ username: 'username', password: 'password' })).toEqual({});
  });
});

describe('handleFieldErrors', () => {
  it('should return empty object if no field errors', () => {
    expect(handleFieldErrors([])).toEqual({});
  });

  it('should return errors object if field errors no empty', () => {
    expect(
      handleFieldErrors([
        { field: 'username', message: 'required' },
        { field: 'password', message: 'incorrect' },
      ]),
    ).toEqual({ username: 'required', password: 'incorrect' });
  });
});

describe('numericLimits', () => {
  const validator = numericLimits({
    fieldName: 'coverage',
    unit: 'percentages',
    min: 0.1,
    max: 100,
  });
  const error = { coverage: 'coverage should be between 0.1 and 100 percentages.' };

  it('should return undefined if the property does not exceed the limits', () => {
    expect(validator({ coverage: '100' })).toBeUndefined();
    expect(validator({ coverage: '0.2' })).toBeUndefined();
    expect(validator({ coverage: '5.5' })).toBeUndefined();
    expect(validator({ coverage: '0.1' })).toBeUndefined();
    expect(validator({ coverage: '55' })).toBeUndefined();
  });

  it('should return error if property goes beoynd limits or not a number', () => {
    expect(validator({ coverage: '1000' })).toEqual(error);
    expect(validator({ coverage: '0.01' })).toEqual(error);
    expect(validator({ coverage: '-1' })).toEqual(error);
    expect(validator({ coverage: 'Infinity' })).toEqual(error);
    expect(validator({ coverage: '        ' })).toEqual(error);
    expect(validator({ coverage: null })).toEqual(error);
    expect(validator({ coverage: false })).toEqual(error);
  });
});

describe('positiveInteger', () => {
  const validator = positiveInteger('risks', 'Risks');
  const error = { risks: 'Risks number should be positive integer or 0.' };

  it('should return undefined if the value is positive integer or 0', () => {
    expect(validator({ risks: '100' })).toBeUndefined();
    expect(validator({ risks: '10' })).toBeUndefined();
    expect(validator({ risks: '0' })).toBeUndefined();
  });

  it('should return error if property not a positiv number or 0', () => {
    expect(validator({ risks: '-100' })).toEqual(error);
    expect(validator({ risks: '0.1' })).toEqual(error);
    expect(validator({ risks: '-0.1' })).toEqual(error);
    expect(validator({ risks: 'NaN' })).toEqual(error);
    expect(validator({ risks: 'Infinity' })).toEqual(error);
    expect(validator({ risks: '999  foo  999' })).toEqual(error);
    expect(validator({ risks: ',' })).toEqual(error);
    expect(validator({ risks: '.' })).toEqual(error);
    expect(validator({ risks: undefined })).toEqual(error);
  });
});
