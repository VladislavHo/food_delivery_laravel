import React, { useEffect } from 'react';
import './success.scss';
export default function SuccessForm({
  state,
  success,
  setIsSuccess,
}: {
  state: boolean;
  success: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<{ state: boolean; success: boolean }>>;
}) {
  useEffect(() => {
    if (state) {
      const timer = setTimeout(() => {
        setIsSuccess((prevState) => ({ ...prevState, state: false }));
      }, 3000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }
  }, [state, setIsSuccess]); // Зависимость от state и setIsSuccess

  return (
    <div className={`success--wrapper ${state ? 'active' : ''}`}>
      {success ? <p>Успешно!</p> : <p>Произошла ошибка!</p>}
    </div>
  );
}