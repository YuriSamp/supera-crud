import { atom } from 'jotai';
import { user } from '../../types/user';

export const userAtom = atom<user[]>([]);
export const userId = atom('0');
