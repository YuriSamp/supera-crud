import { ROW_COUNT } from '../config/constants';

export const ENDPOINTS = {
  GET_ALL_USER: (page: number) => `/user?_page=${page}&_limit=${ROW_COUNT}`,
  GET_UNIQUE_USER: (id: string) => `/user?id=${id}`,
  GET_FILTERED_USERS: (queryString: string) =>
    `/user${queryString ? `?${queryString}` : ''}`,
  ADD_USER: '/user',
  REMOVE_USER: (id: string) => `/user/${id}`,
  UPDATE_USER: (id: string) => `/user/${id}`,
};
