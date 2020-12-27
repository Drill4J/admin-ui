import { Inputs } from '@drill4j/ui-kit';

import { field } from './field';

export const Fields = {
  Input: field(Inputs.Text),
  NumberInput: field(Inputs.Number),
  Search: field(Inputs.Search),
  Textarea: field(Inputs.Textarea),
  Checkbox: field(Inputs.Checkbox),
};
