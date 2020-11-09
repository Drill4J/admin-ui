import { Search } from 'types/search';
import { Sort } from 'types/sort';

export interface TableActionsState {
  search: Search[];
  sort: Sort[];
}
