export type User = {
  email: string;
  password: string;
  name: string;
  id?: string;
};

export type UserLoginT = Omit<User, 'id' | 'name'>;
export type UserRegisterT = Omit<User, 'id'> & {
  confirmPassword: string;
};
