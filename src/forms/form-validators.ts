import { camelToSpaces } from 'utils';

type FormValidationResult = { [key: string]: string } | undefined;
type FormValidator = (formValues: {
  [key: string]: string | string[] | null | undefined;
}) => FormValidationResult;

export function composeValidators(...validators: FormValidator[]): FormValidator {
  return (values) => Object.assign({}, ...validators.map((validator) => validator(values)));
}

export function required(fieldName: string, fieldAlias?: string): FormValidator {
  return ({ [fieldName]: value = '' }) => (!value || (typeof value === 'string' && !value.trim())
    ? {
      [fieldName]: `${fieldAlias || camelToSpaces(fieldName)} is required.`,
    }
    : undefined);
}

export function requiredArray(fieldName: string, fieldAlias?: string) {
  return ({ [fieldName]: value = [] }: { [key: string]: string | string[] | null | undefined }) =>
    (!value || (typeof value === 'object' && value.filter(Boolean).length === 0)
      ? {
        [fieldName]: `${fieldAlias || camelToSpaces(fieldName)} is required.`,
      }
      : undefined);
}

export function sizeLimit({
  name,
  alias,
  min = 3,
  max = 32,
}: {
  name: string;
  alias?: string;
  min?: number;
  max?: number;
}): FormValidator {
  return ({ [name]: value = '' }) => ((value && typeof value === 'string' && value.trim().length < min)
    || (value && typeof value === 'string' && value.trim().length > max)
    ? {
      [name]: `${alias
            || camelToSpaces(name)} size should be between ${min} and ${max} characters.`,
    }
    : undefined);
}
