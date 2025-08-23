import { useState } from 'react';
import Modal from './components/UI/Modal';
import ControlledForm from './components/ControlledForm';
import Button from './components/UI/Button';
import { useAppSelector } from './store';
import { selectForms } from './store/formsSlice';
import FormCard from './components/FormCard';
import UncontrolledForm from './components/UncontrolledForm';

function App() {
  const [isVisibleModal1, setIsVisibleModal1] = useState(false);
  const [isVisibleModal2, setIsVisibleModal2] = useState(false);

  const forms = useAppSelector(selectForms);

  return (
    <>
      <div className="flex flex-col p-2.5">
        <div className="flex justify-center gap-x-2">
          <Button handleClick={() => setIsVisibleModal1(true)}>
            Uncontrolled form
          </Button>
          <Button handleClick={() => setIsVisibleModal2(true)}>
            Controlled form
          </Button>
        </div>
        {forms.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 py-5 gap-2.5">
            {forms.map((form, index) => (
              <FormCard
                key={index}
                form={form}
                isLastForm={index + 1 === forms.length}
              />
            ))}
          </div>
        ) : (
          <p className="py-5">No saved forms</p>
        )}
        <Modal
          title="Uncontrolled form"
          isVisible={isVisibleModal1}
          setIsVisible={setIsVisibleModal1}
        >
          <UncontrolledForm setIsVisible={setIsVisibleModal1} />
        </Modal>
        <Modal
          title="Controlled form"
          isVisible={isVisibleModal2}
          setIsVisible={setIsVisibleModal2}
        >
          <ControlledForm setIsVisible={setIsVisibleModal2} />
        </Modal>
      </div>
    </>
  );
}

export default App;
