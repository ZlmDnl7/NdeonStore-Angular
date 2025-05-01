export interface User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  role: 'user' | 'admin';
}
