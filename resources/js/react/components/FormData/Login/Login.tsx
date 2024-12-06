
import { useForm } from "react-hook-form";
import { ILogin } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import checkLoginByApi from '../../../api/login';
import { useState } from "react";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";
import TelegramLoginButton from "../../Buttons/TelegramLoginButton";


const FormSign = observer(() => {
  const [error, setError] = useState('');
  const [remembered, setIsRemembered] = useState<string | undefined>("0");
  const {sessionUserActions} =store
  const { register, handleSubmit } = useForm<ILogin>(
    {
      defaultValues: {
        email: '',
        password: '',
        remember: false,
      },
    }
  );
  const navigate = useNavigate();
  const onSubmit = (data: ILogin) => {

    const { email, password, remember } = data;

    getCheckLogin(email, password, remember);


  };


  async function getCheckLogin(email: string, password: string, remember: boolean) {
    const checkLogin = await checkLoginByApi({ email, password, remember });


    if (checkLogin.status === 200) {
      navigate('/profile')
      sessionUserActions(true)
    } else {
      setError("Не верный логин или пароль");
    }
  }





  return (
    <>
      <h2 className='text-center'>Войти</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2 '>

        <label htmlFor="email">
          <input className='p-2 rounded' type="text" id="email" {...register("email")} placeholder="Email" />
        </label>

        <label htmlFor="password">
          <input className='p-2 rounded' type="password" id="password" {...register("password")} placeholder="Password" />
        </label>
        <label>
          Запомнить меня
          <input
            type="checkbox"
            value={remembered ? "1" : "0"}
            id="remember" {...register("remember")}
            onChange={() =>
              setIsRemembered(remembered === "1" ? "0" : "1")} />
        </label>
        <button type="submit" className='bg-sky-700 text-purple-50 px-6 py-2 rounded'>Войти</button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      <a href="/register" className='text-cyan-700'>Регистрация</a>
    </>

  )
})
export default FormSign
