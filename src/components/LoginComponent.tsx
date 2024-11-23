import {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {

    const history = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    };

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(loginData);
        fetch(`http://localhost:3003/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginData),
        }).then(response => response.json()).then(json => {
            console.log(json)
            if (json.token) {
                localStorage.setItem('token', json.token);
                history('/');
            } else {
                setError('Nieprawidłowy adres email lub hasło. Spróbuj ponownie.');
            }
        }).catch(console.error);
    };

    return (
        <article className="bg-[#1D2328] h-screen flex items-center justify-center">
            <div className="w-full max-w-sm">
                <form onSubmit={login} className="shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 bg-white">
                    <div className="mb-4">
                        <label className="block text-gray-800 font-bold mb-2 text-lg" htmlFor="login">
                            Login
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="login"
                            name="login"
                            type="text"
                            placeholder="Login"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="password">
                            Hasło
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******************"
                            onChange={handleInputChange}
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-200"
                            type="submit"
                        >
                            Zaloguj się
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
                            href="#"
                        >
                            Zapomniałeś hasła?
                        </a>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default Login;
