import { required, sizeLimit, composeValidators } from './form-validators';

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
  const validator = sizeLimit('username');
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
});

describe('composeValidators', () => {
  const validator = required('username');
  const secondValidator = sizeLimit('password');
  const composedValidators = composeValidators(validator, secondValidator);
  it('should compose all validators and return errors', () => {
    expect(composedValidators({ username: null, password: '12' })).toEqual({
      username: 'username is required.',
      password: 'password size should be between 3 and 32 characters.',
    });
  });

  it('should return undefined if no errors found', () => {
    expect(composedValidators({ username: 'username', password: 'password' })).toEqual({});
  });
});
