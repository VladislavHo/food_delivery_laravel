import React, { useEffect } from 'react';
import { getCookie } from '../../cookies';

declare global {
    interface Window {
        onTelegramAuth?: (user: any) => void; // Опциональная функция
    }
}

const TelegramLogin: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute('data-telegram-login', 'food_delivery_auth11_bot'); 
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-userpic', 'false'); 
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write'); 

        document.getElementById('telegram-login-button')?.appendChild(script);


        window.onTelegramAuth = async (user) => {


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

        return () => {
            document.body.removeChild(script);
            delete window.onTelegramAuth; 
        };
    }, []);

    return (
        <div id="telegram-login-button"></div>
    );
};

export default TelegramLogin;