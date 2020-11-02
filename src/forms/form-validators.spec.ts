import { required, sizeLimit, composeValidators, toError, handleFieldErrors } from './form-validators';

describe('toError', () => {
  it('should return final form error format by provided fieldname and erorr', () => {
    expect(toError('foo.bar.buz', 'error')).toEqual({ foo: { bar: { buz: 'error' } }});

    expect(toError('foo', 'error')).toEqual({ foo: 'error' });
  });
})

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
  })

  it('should return errors object if field errors no empty', () => {
    expect(handleFieldErrors([
      {field: 'username', message: 'required'},
      {field: 'password', message: 'incorrect'}
    ])).toEqual({username: 'required', password: 'incorrect'});
  })
})
