export type Gender = 'male' | 'female';

export type FormType = 'controlled' | 'uncontrolled';

export type Form = {
  name: string;
  age: string;
  email: string;
  gender: Gender;
  country: string;
  password: string;
  passwordConfirmation: string;
  picture: FileList;
  conditionsAgreement: boolean | 'on';
};
export type FormKeys = keyof Form;

export type FormStore = Omit<Form, 'picture'> & {
  type: FormType;
  pictureSrc: string;
};

export type FormError = {
  [Property in FormKeys]?: {
    message: string;
  };
};
