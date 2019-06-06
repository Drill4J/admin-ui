import { field } from './field';
import { dropdownField } from './dropdown-field';
import { Input, Textarea } from '../../components';

export const Fields = {
  Input: field(Input),
  Textarea: field(Textarea),
  Dropdown: dropdownField,
};
