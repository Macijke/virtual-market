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
        <article className="bg-gray-700 h-screen flex items-center justify-center">
        <div className="w-full max-w-xs">
            <form onSubmit={login} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-500">
                <div className="mb-4">
                    <label className="block text-white font-bold mb-2 text-xl" htmlFor="login">
                        Login
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="login" name="login" type="text" placeholder="Login" onChange={handleInputChange}/>
                </div>
                <div className="mb-6">
                    <label className="block text-white text-xl font-bold mb-2" htmlFor="password">
                        Hasło
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" name="password" placeholder="******************" onChange={handleInputChange}/>
                    {/*<p className="text-red-500 text-xs italic">Wprowadź hasło.</p>*/}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Zaloguj się
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       href="#">
                        Zapomniałeś hasła?
                    </a>
                </div>
            </form>
        </div>
    </article>
    );
}

export default Login;
