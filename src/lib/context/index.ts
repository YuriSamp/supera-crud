import { atom } from 'jotai';
import { user } from '../schema/form';

export const userAtom = atom<user[]>([]);
export const deleteModalAtom = atom(false);
export const userId = atom('0');
