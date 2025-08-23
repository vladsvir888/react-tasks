import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import schema from '../validation';
import Button from './UI/Button';
import ErrorMessage from './UI/ErrorMessage';
import { useState } from 'react';
import type { Form, FormStore } from '../types';
import { addForm, selectCountries } from '../store/formsSlice';
import { useAppDispatch, useAppSelector } from '../store';

type Props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlledForm = ({ setIsVisible }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const countries = useAppSelector(selectCountries);
  const dispatch = useAppDispatch();

  const onSubmit = (data: Form) => {
    const { picture, ...rest } = data;

    const resultData: FormStore = {
      ...rest,
      type: 'controlled',
      pictureSrc: '',
    };

    const reader = new FileReader();
    reader.readAsDataURL(data.picture[0]);
    reader.onload = () => {
      resultData.pictureSrc = reader.result as string;
      dispatch(addForm(resultData));
      setIsVisible(false);
    };
  };

  const [pictureName, setPictureName] = useState('Choose a picture');
  const handlePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.files?.[0]?.name ?? 'Choose a picture';
    setPictureName(name);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="border-gray-300 border p-2 rounded"
          {...register('name')}
        />
        <ErrorMessage message={errors.name?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          className="border-gray-300 border p-2 rounded"
          {...register('age')}
        />
        <ErrorMessage message={errors.age?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border-gray-300 border p-2 rounded"
          {...register('email')}
        />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="radio"
            id="gender-1"
            value="male"
            className="accent-black"
            {...register('gender')}
          />
          <label htmlFor="gender-1">Male</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="radio"
            id="gender-2"
            value="female"
            className="accent-black"
            {...register('gender')}
          />
          <label htmlFor="gender-2">Female</label>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="country">Countries</label>
        <input
          type="text"
          list="countries"
          id="country"
          className="border-gray-300 border p-2 rounded"
          {...register('country')}
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
          {...register('password')}
        />
        <ErrorMessage message={errors.password?.message} />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="passwordConfirmation">Password confirmation</label>
        <input
          id="passwordConfirmation"
          type="password"
          className="border-gray-300 border p-2 rounded"
          {...register('passwordConfirmation')}
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
            {...register('picture', {
              onChange: handlePicture,
            })}
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
            {...register('conditionsAgreement')}
          />
          <label htmlFor="conditionsAgreement">
            Accept Terms and Conditions agreement
          </label>
        </div>
        <ErrorMessage message={errors.conditionsAgreement?.message} />
      </div>
      <Button
        type="submit"
        classes="mt-3 w-full disabled:opacity-50"
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
};

export default ControlledForm;
