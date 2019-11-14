import { camelToSpaces } from '../utils';

type FormValidationResult = { [key: string]: string } | undefined;
type FormValidator = (formValues: {
  [key: string]: string | string[] | null | undefined;
}) => FormValidationResult;

export function composeValidators(...validators: FormValidator[]): FormValidator {
  return (values) => Object.assign({}, ...validators.map((validator) => validator(values)));
}

export function required(fieldName: string): FormValidator {
  return ({ [fieldName]: value = '' }) =>
    !value || (typeof value === 'string' && !value.trim())
      ? {
          [fieldName]: `${camelToSpaces(fieldName)} is required.`,
        }
      : undefined;
}

export function requiredArray(fieldName: string) {
  return ({ [fieldName]: value = [] }: { [key: string]: string | string[] | null | undefined }) =>
    !value || (typeof value === 'object' && value.filter(Boolean).length === 0)
      ? {
          [fieldName]: `${camelToSpaces(fieldName)} is required.`,
        }
      : undefined;
}

export function sizeLimit(fieldName: string, min: number = 3, max: number = 32): FormValidator {
  return ({ [fieldName]: value = '' }) =>
    (value && typeof value === 'string' && value.trim().length < min) ||
    (value && typeof value === 'string' && value.trim().length > max)
      ? {
          [fieldName]: `${camelToSpaces(
            fieldName,
          )} size should be between ${min} and ${max} characters.`,
        }
      : undefined;
}
