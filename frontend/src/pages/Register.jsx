import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import api from '../services/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, password });
            navigate('/login');
        } catch (err) {
            if (import.meta.env.DEV) {
                console.log("Registration error:", err);
            }
            if (!err.response) {
                const failedUrl = err.config ? `${err.config.baseURL || ''}${err.config.url || ''}` : '';
                if (import.meta.env.DEV && failedUrl) {
                    setError(`Backend server not reachable at ${failedUrl}`);
                } else {
                    setError('Backend server not reachable. Please check your connection.');
                }
            } else {
                let errorDetail = err.response.data?.detail;
                if (Array.isArray(errorDetail)) {
                    errorDetail = errorDetail[0]?.msg || 'Validation error';
                }
                
                if (err.response.status === 400 && errorDetail === "Username already registered") {
                    setError('Username already exists. Please login.');
                } else {
                    setError(errorDetail || 'Registration failed');
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <Activity className="text-emerald-500 w-12 h-12 mb-4" />
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-slate-400 mt-2">Join KubeWatch AI</p>
                </div>
                
                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}
                
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/30">
                        Sign Up
                    </button>
                </form>
                
                <p className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">Log in</Link>
                </p>
            </div>
        </div>
    );
}
