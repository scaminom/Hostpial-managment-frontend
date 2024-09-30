export interface Column {
  field: string;
  header: string;
  pipe?: {
    name: string;
    args?: any[];
  };
}
