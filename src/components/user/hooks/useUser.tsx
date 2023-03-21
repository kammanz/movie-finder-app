import { useQueryClient } from 'react-query';
import { TUser } from '../../../types';
import { queryKeys } from '../../../react-query/constants';
import { clearStoredUser } from '../../../user-storage';

export function useUser() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(queryKeys.user) as TUser;

  const updateUser = (newUser: TUser) => {
    queryClient.setQueryData(queryKeys.user, [newUser?.email]);
  };

  const clearUser = () => {
    queryClient.setQueryData(queryKeys.user, null);
    clearStoredUser();
  };

  return { user, updateUser, clearUser };
}
