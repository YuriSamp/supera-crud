import { atom } from 'jotai';
import { user } from '../schema/form';

export const userAtom = atom<user[]>([]);
