export interface User {
  id: number;
  usuario: string;
  contrasena: string;
  username?: string;
  password?: string;
  fullname?: string;
  role?: 'user' | 'admin';
}
