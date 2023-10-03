import * as yup from 'yup';
import { formSchema } from '../pages/create';

export type user = yup.InferType<typeof formSchema>;
