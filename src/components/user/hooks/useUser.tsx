import { useQueryClient } from 'react-query';
import { TUser, TUseUser } from '../../../types';
import { queryKeys } from '../../../react-query/constants';

export function useUser(): TUseUser {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(queryKeys.user) as TUser;
  const updateUser = (newUser: TUser) =>
    newUser &&
    queryClient.setQueryData(queryKeys.user, [newUser.email, newUser.uid]);

  const clearUser = () => {
    // todo: reset user to null in query cache
  };

  return { user, updateUser, clearUser };
}
