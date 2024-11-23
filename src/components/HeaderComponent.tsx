import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function HeaderComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUsername(payload.login);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const isCurrent = (path) => location.pathname === path;

    return (
        <header className="bg-[#282F36] p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-lg font-bold relative">
                    Main Page
                    {isCurrent('/') && <span className="absolute bottom-0 left-0 h-1 w-full bg-green-500"></span>}
                </Link>
                <Link to="/market" className="text-lg font-bold relative">
                    Market
                    {isCurrent('/market') && <span className="absolute bottom-0 left-0 h-1 w-full bg-green-500"></span>}
                </Link>
            </div>
            <div className="flex items-center space-x-6">
                {isAuthenticated ? (
                    <span className="text-white">
            Witaj, {username}
          </span>
                ) : (
                    <Link to="/login" className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span>Zaloguj się</span>
                    </Link>
                )}
            </div>
        </header>
    );
}


export default HeaderComponent;
