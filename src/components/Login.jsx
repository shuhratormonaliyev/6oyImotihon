import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import https from '../../axios';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('')
    const handleLogin = (event) => {
        event.preventDefault();
        setError('');

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            setError('Iltimos, email va parolni toldiring.'); 
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Iltimos, togri email formatini kiriting.'); 
            return;
        }

        const userData = { email, password };
        setLoading(true);
        https.post('https://fn27.vimlc.uz/login', userData)
            .then(response => {
                console.log(response.data);
                setLoading(false); 
                setData(response.data);
                navigate('/'); 
            })
            
            .catch(error => {
                console.error('Login xatosi:', error);
                setError('Login xatosi yuz berdi. Iltimos, malumotlaringizni tekshiring.');
                setLoading(false); 
            });
            console.log('login data',data);
        localStorage.setItem("token",'salom')
        console.log(localStorage.getItem("token"));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-20"
                onSubmit={handleLogin}
            >
                <h2 className="mb-6 text-2xl font-bold text-center">Kirish</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                {loading && <p className="mb-4 text-blue-500">Loading...</p>}
                <input
                    className="p-2 mb-4 border rounded"
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={passwordRef}
                    type="password"
                    placeholder="Parol"
                    required
                />
                <button className="p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit" disabled={loading}>
                    Kirish
                </button>
            </form>
        </div>
    );
}

export default Login;
