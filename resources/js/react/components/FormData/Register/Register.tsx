
import { useForm } from "react-hook-form";
import { IAddress, IRegister } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import registerByApi from "../../../api/register";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";





const FormRegister = observer(() => {

  const { sessionUserActions } = store
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<IRegister>(
    {
      defaultValues: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  );
  const navigate = useNavigate();

  const onSubmit = (data: IRegister) => {
    const { name, email, password, password_confirmation } = data;
    getCheckLogin(name, email, password, password_confirmation);


  };


  async function getCheckLogin(name: string, email: string, password: string, password_confirmation: string) {
    const checkLogin = await registerByApi({ name, email, password, password_confirmation });

    if (checkLogin.status === 200) {
      navigate('/profile')
      sessionUserActions(true);
    } else {
      setError("Не верный логин или пароль");
    }
  }





  return (
    <>
      <h2 className='text-center'>Войти</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2 '>

        <label htmlFor="name">
          <input className='p-2 rounded' type="text" id="name" {...register("name")} placeholder="Name" />
        </label>
        <label htmlFor="email">
          <input className='p-2 rounded' type="text" id="email" {...register("email")} placeholder="Email" />
        </label>
        <label htmlFor="password">
          <input className='p-2 rounded' type="password" id="password" {...register("password")} placeholder="Password" />
        </label>

        <label htmlFor="password_confirmation">
          <input className='p-2 rounded' type="password" id="password_confirmation" {...register("password_confirmation")} placeholder="Password confirmation" />
        </label>


        <button type="submit" className='bg-sky-700 text-purple-50 px-6 py-2 rounded'>Регистрация</button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      <a href="/login" className='text-cyan-700'>Есть аккаунт?</a>
    </>

  )
})
export default FormRegister
