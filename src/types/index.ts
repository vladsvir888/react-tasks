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
  conditionsAgreement: boolean;
};

export type FormStore = Omit<Form, 'picture'> & {
  type: FormType;
  pictureSrc: string;
};
