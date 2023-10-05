import { request } from '.';
import { FilterTypes } from '../../components/filters';
import { FormType } from '../../pages/create';
import { user } from '../../types/user';
import { ENDPOINTS } from '../endpoints';

export const getAllUsers = async (page: number) => {
  const { data: users } = await request.get<user[]>(
    ENDPOINTS.GET_ALL_USER(page)
  );
  return users;
};

export const getUniqueUser = async (id: string) => {
  const { data } = await request.get<user[]>(ENDPOINTS.GET_UNIQUE_USER(id));
  return data.at(0);
};

export const getFilteredusers = async ({
  email,
  name,
  userType,
}: FilterTypes) => {
  const queryParams = {} as FilterTypes;

  if (email) {
    queryParams.email = email;
  }
  if (name) {
    queryParams.name = name;
  }
  if (userType) {
    queryParams.userType = userType;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = ENDPOINTS.GET_FILTERED_USERS(queryString);

  const { data } = await request.get(url);

  return data;
};

export const addUser = async (data: user) => {
  await request.post(ENDPOINTS.ADD_USER, data);
};

export const removeUser = async (id: string) => {
  request.delete(ENDPOINTS.REMOVE_USER(id));
};

export const updateUser = async (data: FormType, id: string) => {
  await request.put(ENDPOINTS.UPDATE_USER(id), data);
};
