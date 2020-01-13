export interface ColumnProps {
  name: string;
  label?: string;
  HeaderCell?: React.ComponentType<any>;
  Cell?: React.FC<any>;
}
