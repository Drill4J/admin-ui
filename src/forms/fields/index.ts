import { field } from './field';
import { dropdownField } from './dropdown-field';
import { Inputs } from '../inputs';

export const Fields = {
  Input: field(Inputs.Text),
  Textarea: field(Inputs.Textarea),
  Checkbox: field(Inputs.Checkbox),
  Dropdown: dropdownField,
};
