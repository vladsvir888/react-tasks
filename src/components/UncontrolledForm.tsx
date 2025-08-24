import schema from '../validation';
import Button from './UI/Button';
import ErrorMessage from './UI/ErrorMessage';
import { useState } from 'react';
import type { Form, FormError, FormKeys, FormStore } from '../types';
import { addForm, selectCountries } from '../store/formsSlice';
import { useAppDispatch, useAppSelector } from '../store';
import usePasswordStrength from '../hooks/usePasswordStrength';
import { ValidationError } from 'yup';

type Props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UncontrolledForm = ({ setIsVisible }: Props) => {
  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();
  const { checkPassword, progressValue } = usePasswordStrength();
  const [errors, setErrors] = useState<FormError>({});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData) as unknown as Form;
    data.conditionsAgreement = data.conditionsAgreement === 'on'; // FormData возвращает чекбокс checked как 'on'
    data.picture = event.currentTarget.picture?.files; // FormData не возвращает FileList

    checkPassword(data.password);

    try {
      schema.validateSync(data, { abortEarly: false });

      const { picture, ...rest } = data;
      const resultData: FormStore = {
        ...rest,
        type: 'uncontrolled',
        pictureSrc: '',
      };

      const reader = new FileReader();
      reader.readAsDataURL(data.picture[0]);
      reader.onload = () => {
        resultData.pictureSrc = reader.result as string;
        dispatch(addForm(resultData));
        setIsVisible(false);
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        const errs = {} as FormError;

        error.inner.forEach((errorInner) => {
          const path = errorInner.path as FormKeys;
          if (!errs[path]) errs[path] = { message: errorInner.message };
        });

        setErrors(errs);
      }
    }
  };

  const [pictureName, setPictureName] = useState('Choose a picture');
  const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.files?.[0]?.name ?? 'Choose a picture';
    setPictureName(name);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="border-gray-300 border p-2 rounded"
          name="name"
          data-testid="name"
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          className="border-gray-300 border p-2 rounded"
          name="age"
          data-testid="age"
        />
        <ErrorMessage message={errors.age?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="border-gray-300 border p-2 rounded"
          name="email"
          data-testid="email"
        />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              id="gender-1"
              value="male"
              className="accent-black"
              name="gender"
              data-testid="gender-1"
            />
            <label htmlFor="gender-1">Male</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="radio"
              id="gender-2"
              value="female"
              className="accent-black"
              name="gender"
              data-testid="gender-2"
            />
            <label htmlFor="gender-2">Female</label>
          </div>
        </div>
        <ErrorMessage message={errors.gender?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="country">Countries</label>
        <input
          type="text"
          list="countries"
          id="country"
          className="border-gray-300 border p-2 rounded"
          name="country"
          data-testid="country"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <ErrorMessage message={errors.country?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border-gray-300 border p-2 rounded"
          name="password"
          data-testid="password"
        />
        {!!progressValue && <progress max="100" value={progressValue} />}
        <ErrorMessage message={errors.password?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input
          id="passwordConfirmation"
          type="password"
          className="border-gray-300 border p-2 rounded"
          name="passwordConfirmation"
          data-testid="passwordConfirmation"
        />
        <ErrorMessage message={errors.passwordConfirmation?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label
          htmlFor="picture"
          className="relative border-gray-300 border p-2 rounded text-center"
        >
          {pictureName}
          <input
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
            className="absolute inset-0 text-[0px]"
            name="picture"
            data-testid="picture"
            onChange={handlePicture}
          />
        </label>
        <ErrorMessage message={errors.picture?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="conditionsAgreement"
            className="accent-black"
            name="conditionsAgreement"
            data-testid="conditionsAgreement"
          />
          <label htmlFor="conditionsAgreement">
            Terms and conditions agreement
          </label>
        </div>
        <ErrorMessage message={errors.conditionsAgreement?.message} />
      </div>
      <Button type="submit" classes="mt-3 w-full">
        Submit
      </Button>
    </form>
  );
};

export default UncontrolledForm;
