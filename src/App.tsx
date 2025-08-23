import { useState } from 'react';
import Modal from './components/UI/Modal';
import ControlledForm from './components/ControlledForm';
import Button from './components/UI/Button';

function App() {
  const [isVisibleModal1, setIsVisibleModal1] = useState(false);
  const [isVisibleModal2, setIsVisibleModal2] = useState(false);

  return (
    <>
      <div className="flex flex-col p-2.5">
        <div className="flex justify-center gap-x-2">
          <Button handleClick={() => setIsVisibleModal1(true)}>
            Open UncontrolledForm
          </Button>
          <Button handleClick={() => setIsVisibleModal2(true)}>
            Open ControlledForm
          </Button>
        </div>
        <div className="grid grid-cols-5 py-5 gap-2.5"></div>
        <Modal
          title="UncontrolledForm"
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
          title="ControlledForm"
          isVisible={isVisibleModal2}
          setIsVisible={setIsVisibleModal2}
        >
          <ControlledForm />
        </Modal>
      </div>
    </>
  );
}

export default App;
