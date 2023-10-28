import { createContext } from 'react';

interface UserAttributes {
  data: {
    email: string;
    username: string;
    _id: string;
  };
  isLoading: boolean;
}

export const UserContext = createContext<UserAttributes>({
  data: {
    email: '',
    username: '',
    _id: '',
  },
  isLoading: false,
});
