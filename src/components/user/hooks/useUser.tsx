import { useQueryClient } from 'react-query';
import { User } from '../../../types';
import { queryKeys } from '../../../react-query/constants';
import { clearStoredUser } from '../../../user-storage';

export function useUser() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(queryKeys.user) as User;

  const updateUser = (newUser: User) => {
    queryClient.setQueryData(queryKeys.user, [newUser?.email]);
  };

  const clearUser = () => {
    clearStoredUser();
  };

  return { user, updateUser, clearUser };
}
