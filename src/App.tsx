import { useState } from 'react';
import SharedModal from './components/SharedModal';

function App() {
  const [isVisibleModal1, setIsVisibleModal1] = useState(false);
  const [isVisibleModal2, setIsVisibleModal2] = useState(false);

  return (
    <>
      <div className="flex flex-col p-2.5">
        <div className="flex justify-center gap-x-2">
          <button
            className="cursor-pointer border-gray-300 border p-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => setIsVisibleModal1(true)}
          >
            Open modal 1
          </button>
          <button
            className="cursor-pointer border-gray-300 border p-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => setIsVisibleModal2(true)}
          >
            Open modal 2
          </button>
        </div>
        <div className="grid grid-cols-2 py-5 gap-2.5">
          <div>Tiles modal 1</div>
          <div>Tiles modal 2</div>
        </div>
        <SharedModal
          title="Modal 1"
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
        </SharedModal>
        <SharedModal
          title="Modal 2"
          isVisible={isVisibleModal2}
          setIsVisible={setIsVisibleModal2}
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
        </SharedModal>
      </div>
    </>
  );
}

export default App;
