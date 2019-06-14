import { required, sizeLimit, composeValidators } from './form-validators';

describe('required', () => {
  const validator = required('username');
  it('should return errors if property dosent exist or empty', () => {
    expect(validator({})).toEqual({ username: 'Username is required.' });
    expect(validator({ username: '      ' })).toEqual({
      username: 'Username is required.',
    });
    expect(validator({ username: null })).toEqual({
      username: 'Username is required.',
    });
    expect(validator({ username: undefined })).toEqual({
      username: 'Username is required.',
    });
  });

  it('should return undefined in no errors found', () => {
    expect(validator({ username: 'username' })).toBeUndefined();
  });
});

describe('sizeLimit', () => {
  const validator = sizeLimit('username');
  it('should return errors if property goes beoynd limits', () => {
    expect(validator({})).toEqual({
      username: 'Username size should be between 3 and 32 characters.',
    });
    expect(validator({ username: '      ' })).toEqual({
      username: 'Username size should be between 3 and 32 characters.',
    });
    expect(validator({ username: null })).toEqual({
      username: 'Username size should be between 3 and 32 characters.',
    });
    expect(validator({ username: undefined })).toEqual({
      username: 'Username size should be between 3 and 32 characters.',
    });
  });

  it('should return undefined in no errors found', () => {
    expect(validator({ username: 'username' })).toBeUndefined();
  });
});

describe('composeValidators', () => {
  const validator = required('username');
  const secondValidator = sizeLimit('password');
  const composedValidators = composeValidators(validator, secondValidator);
  it('should compose all validators and return errors', () => {
    expect(composedValidators({})).toEqual({
      username: 'Username is required.',
      password: 'Password size should be between 3 and 32 characters.',
    });
  });

  it('should return undefined if no errors found', () => {
    expect(composedValidators({ username: 'username', password: 'password' })).toEqual({});
  });
});
