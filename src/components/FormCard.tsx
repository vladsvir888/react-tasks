import type { FormStore } from '../types';

type Props = {
  form: FormStore;
  isLastForm: boolean;
};

const FormCard = ({ form, isLastForm }: Props) => {
  const picture = form.pictureSrc;
  const { pictureSrc, ...rest } = form;
  const formEntries = Object.entries(rest);
  const classes = `form-card border p-2 rounded ${isLastForm ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <div className={classes}>
      <img
        src={picture}
        alt=""
        width={100}
        height={100}
        className="object-cover aspect-square"
      />
      <ul className="list-disc list-inside">
        {formEntries.map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormCard;
