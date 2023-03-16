import { useQuery, useQueryClient } from 'react-query';
import { TUser } from '../../../types';
import { queryKeys } from '../../../react-query/constants';
// import { useAuth } from '../../../context/AuthContext';

// returns a user
const getUser = (user: any) => {
  console.log('in get user');
  // stuff
  if (!user) return null;
  console.log('in getUser, user:', user);
  console.log('in getUser, user.uid:', user.uid);
  return user.uid;
};

// console.log('', getUser);

interface IUseUser {
  user: TUser;
  updateUser: (user: TUser) => void;
  clearUser: () => void;
}

export const useUser = () => {
  // Todo: call useQuery to update data from server
  const queryClient = useQueryClient();
  // const auth = useAuth();
  // console.log('auth', auth);
  let user = null;
  const fallback: any = null;
  // const { data: user = fallback } = useQuery(queryKeys.user, getUser(user));

  // meant to be called from useAuth
  const updateUser = (newUser: TUser) => {
    console.log('updateUser called');
    // todo: update the user in the query cache
    queryClient.setQueryData(queryKeys.user, newUser);
  };

  const clearUser = () => {
    // todo: reset user to null in query cache
  };

  return { user, updateUser, clearUser };
};
