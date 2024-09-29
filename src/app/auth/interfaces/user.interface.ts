export interface User {
  success: boolean;
  message: string;
  data: Data;
  errors: any[];
}

interface Data {
  token: string;
}
