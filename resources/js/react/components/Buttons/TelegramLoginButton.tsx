import React, { useEffect } from 'react';
import { getCookie } from '../../cookies';

declare global {
    interface Window {
        onTelegramAuth?: (user: any) => void; // Опциональная функция
    }
}

const TelegramLogin: React.FC = () => {
    useEffect(() => {
        // Добавляем скрипт Telegram Widget
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute('data-telegram-login', 'food_delivery_auth11_bot'); // Ваш бот
        script.setAttribute('data-size', 'large'); // Размер кнопки
        script.setAttribute('data-userpic', 'false'); // Нет аватара
        script.setAttribute('data-onauth', 'onTelegramAuth(user)'); // Функция аутентификации
        script.setAttribute('data-request-access', 'write'); // Доступ
        // document.body.appendChild(script);
        document.getElementById('telegram-login-button')?.appendChild(script);

        // Определяем функцию аутентификации
        window.onTelegramAuth = async (user) => {
            // alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');

            // Здесь можно отправить данные пользователя на ваш сервер
            console.log(user, "user telegram");

            await fetch('/api/auth/telegram/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
                },
                body: JSON.stringify(user),
            }).then(response => response.json()).then(data =>  {
                localStorage.setItem('authToken', data.token);
                window.location.reload();
            }).catch(error => console.error(error));

        };

        // Убираем скрипт при размонтировании компонента
        return () => {
            document.body.removeChild(script);
            delete window.onTelegramAuth; // Удаляем обработчик
        };
    }, []);

    return (
        <div id="telegram-login-button"></div>
    );
};

export default TelegramLogin;