import { useState } from 'react';
import Modal from './components/UI/Modal';
import ControlledForm from './components/ControlledForm';
import Button from './components/UI/Button';
import { useAppSelector } from './store';
import { selectForms } from './store/formsSlice';
import FormCard from './components/FormCard';

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
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dicta
            alias temporibus obcaecati nostrum. Dolorum obcaecati eaque totam
            quas quam veritatis repellat! Qui quam explicabo aspernatur.
            Accusantium, perferendis consequuntur recusandae officiis natus
            tempore tenetur exercitationem necessitatibus, dicta quae illum
            placeat perspiciatis ipsa doloribus. Sit, fuga reprehenderit
            molestiae veritatis aliquam exercitationem deserunt saepe assumenda
            molestias ipsa vel nam quidem expedita distinctio repellat iste?
            Repellendus saepe quibusdam nobis commodi ipsa facilis nisi ea
            similique, eveniet corporis libero sequi distinctio delectus eaque
            provident asperiores. Sapiente deleniti sunt earum pariatur dolore
            nesciunt fugiat incidunt cum! Iste, reprehenderit placeat. Velit ea
            aliquid atque in illo? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eius dicta alias temporibus obcaecati nostrum.
            Dolorum obcaecati eaque totam quas quam veritatis repellat! Qui quam
            explicabo aspernatur. Accusantium, perferendis consequuntur
            recusandae officiis natus tempore tenetur exercitationem
            necessitatibus, dicta quae illum placeat perspiciatis ipsa
            doloribus. Sit, fuga reprehenderit molestiae veritatis aliquam
            exercitationem deserunt saepe assumenda molestias ipsa vel nam
            quidem expedita distinctio repellat iste? Repellendus saepe
            quibusdam nobis commodi ipsa facilis nisi ea similique, eveniet
            corporis libero sequi distinctio delectus eaque provident
            asperiores. Sapiente deleniti sunt earum pariatur dolore nesciunt
            fugiat incidunt cum! Iste, reprehenderit placeat. Velit ea aliquid
            atque in illo?
          </div>
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
