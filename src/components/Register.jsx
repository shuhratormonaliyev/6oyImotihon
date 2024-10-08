import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import https from '../../axios';

function Register() {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const ageRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        const userData = {
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            age: ageRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
        };

        
        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);
        setError(''); 

        https.post('/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response.data);
                setLoading(false);
                navigate('/login');
            })
            .catch(error => {
                setError('Registration failed. Please try again.'); 
                setLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-20" onSubmit={handleRegister}>
                <h2 className="mb-6 text-2xl font-bold text-center">Royxatdan otish</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {loading && <div className="mb-4 text-blue-500">Loading...</div>}
                <input
                    className="p-2 mb-4 border rounded"
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={firstNameRef}
                    type="text"
                    placeholder="Ism"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={lastNameRef}
                    type="text"
                    placeholder="Familiya"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={ageRef}
                    type="number"
                    placeholder="Yosh"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={passwordRef}
                    type="password"
                    placeholder="Parol"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Parolni tasdiqlang"
                    required
                />
                <button className="p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit" disabled={loading}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
