'use client'

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (name.trim()) {
      router.push(`/quiz?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className='max-w-[90rem] h-screen mx-auto flex items-center justify-center'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className='p-8 py-4 rounded-xl cursor-pointer bg-red-500 text-white text-2xl border-2 border-red-500 transition-all duration-150 hover:bg-white hover:text-red-500 font-bold'
          >
            Start Quiz
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 fixed inset-0 w-full h-full z-50" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Enter your name
            </Dialog.Title>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border-2 border-gray-300 my-4 rounded-md px-4 py-3 text-gray-800 focus:border-gray-900'
            />

            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  className='p-4 py-2 rounded-xl cursor-pointer bg-red-500 text-white text-md border-2 border-red-500 transition-all duration-150 hover:bg-white hover:text-red-500 '
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
