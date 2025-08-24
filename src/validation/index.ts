import * as yup from 'yup';
import { countries } from '../store/formsSlice';
import type { Gender } from '../types';

const MAX_SIZE_PICTURE = 1024 * 1024; // 1MB
const VALID_TYPES_PICTURE = ['png', 'jpeg'];

const schema = yup.object({
  name: yup
    .string()
    .required()
    .test(
      'first-uppercase',
      'first letter should be uppercased',
      (value) => !!value && /^[A-Z]$/.test(value[0])
    ),
  age: yup
    .string()
    .required()
    .test(
      'number-no-negative-values',
      'should be number, no negative values',
      (value) => !!value && /^[1-9]\d*$/.test(value)
    ),
  email: yup.string().required().email(),
  gender: yup.string<Gender>().required(),
  country: yup.string().required().oneOf(countries),
  password: yup
    .string()
    .required()
    .test(
      'one-number',
      'should be one number',
      (value) => !!value && /[0-9]/.test(value)
    )
    .test(
      'one-uppercase-letter',
      'should be one uppercase letter',
      (value) => !!value && /[A-Z]/.test(value)
    )
    .test(
      'one-lowercase-letter',
      'should be one lowercase letter',
      (value) => !!value && /[a-z]/.test(value)
    )
    .test(
      'one-special-character',
      'should be one special character',
      (value) => !!value && /[!@#$%^&*(),.?":{}|<>]/.test(value)
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'passwords must match'),
  picture: yup
    .mixed<FileList>()
    .required()
    .test(
      'picture-not-selected',
      'select a picture',
      (value) => !!value?.length
    )
    .test(
      'picture-type',
      'invalid picture type (allow png/jpeg)',
      (value) =>
        !!value.length &&
        VALID_TYPES_PICTURE.some((ext) => ext === value[0].type.split('/')[1])
    )
    .test(
      'picture-size',
      'max allowed size is 1MB',
      (value) => !!value.length && value[0].size <= MAX_SIZE_PICTURE
    ),
  conditionsAgreement: yup
    .boolean()
    .required()
    .oneOf([true], 'accept terms and conditions agreement'),
});

export default schema;
