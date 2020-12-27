import { camelToSpaces, get } from 'utils';

type FormValidationResult = Record<string, string> | undefined;
export type FormValidator = <T extends Record<string, unknown>>(formValues: T) => FormValidationResult;

export function composeValidators(...validators: FormValidator[]): FormValidator {
  return (values) => Object.assign({}, ...validators.map((validator) => validator(values)));
}

export function required(fieldName: string, fieldAlias?: string): FormValidator {
  return (valitationItem) => {
    const value = get<string>(valitationItem, fieldName);
    return (!value || (typeof value === 'string' && !value.trim())
      ? toError(fieldName, `${fieldAlias || camelToSpaces(fieldName)} is required.`)
      : undefined);
  };
}

export function requiredArray(fieldName: string, fieldAlias?: string) {
  return (valitationItem: Record<string, unknown>) => {
    const value = get<string[]>(valitationItem, fieldName);
    return (!value || (typeof value === 'object' && value?.filter(Boolean).length === 0)
      ? toError(fieldName, fieldAlias || `${camelToSpaces(fieldName)} is required.`)
      : undefined);
  };
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
  return (valitationItem) => {
    const value = get<string>(valitationItem, name);
    return ((value && typeof value === 'string' && value.trim().length < min)
    || (value && typeof value === 'string' && value.trim().length > max)
      ? toError(name, `${alias
        || camelToSpaces(name)} size should be between ${min} and ${max} characters.`)
      : undefined);
  };
}

export function toError(fieldName: string, error: string) {
  const field = fieldName.split('.');
  return field.reduceRight((acc, key, index) => (
    { [key]: index === field.length - 1 ? error : acc }
  ), {});
}

interface FieldError {
  field: string;
  message: string;
}

export function handleFieldErrors(fieldErrors: FieldError[] = []): Record<string, string> {
  return fieldErrors.reduce((acc, current) =>
    ({ ...acc, [current.field]: current.message }), {});
}

export function numericLimits({
  fieldName, fieldAlias = '', unit = '', min, max,
}: {
  fieldName: string;
  fieldAlias?: string;
  unit?: string;
  min: number;
  max: number;
}): FormValidator {
  return (valitationItem) => {
    const value = get(valitationItem, fieldName);
    return !isNumericString(typeof value === 'string' ? value : '') || Number(value) < min || Number(value) > max
      ? toError(fieldName, `${fieldAlias || camelToSpaces(fieldName)} should be between ${min} and ${max} ${unit}.`)
      : undefined;
  };
}

export function positiveInteger(fieldName: string, fieldAlias?: string): FormValidator {
  return (valitationItem) => {
    const value = get(valitationItem, fieldName);
    return !isNumericString(typeof value === 'string' ? value : '') || !Number.isInteger(Number(value)) || Number(value) < 0
      ? toError(fieldName, `${fieldAlias || camelToSpaces(fieldName)} number should be positive integer or 0.`)
      : undefined;
  };
}

export function isNumericString(value: string): boolean {
  return /^[0-9.]+$/.test(value) && !Number.isNaN(Number(value));
}
