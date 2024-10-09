export interface TableColumn {
  field: string;
  header: string;
  pipe?: {
    name: string;
    args?: any[];
  };
}
