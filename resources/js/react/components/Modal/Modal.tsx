import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ text}: any) => {
  const navigate = useNavigate();
  return (
    <>

      <div
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {text}
              </h3>

            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
               onClick={() => navigate('/profile', { replace: true })}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Профиль
              </button>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Modal;