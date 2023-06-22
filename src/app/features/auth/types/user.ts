export type CreateUserData = {
  name: string;
  email: string;
  password?: string;
};

export type LoginUserData = Omit<CreateUserData, 'name'>;

export type UserResponse = {
  user: CreateUserData;
  token: string;
};
