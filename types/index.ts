export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  image?: string;
  createdAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface GraphQLContext {
  userId?: number;
  email?: string;
}
