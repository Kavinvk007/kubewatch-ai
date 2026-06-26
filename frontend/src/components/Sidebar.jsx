import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Server, AlertTriangle, FileText, Activity, LogOut } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navClass = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-primary-blue text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`;

    return (
        <div className="w-64 h-screen bg-bg-sidebar border-r border-slate-800 flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Activity className="text-primary-blue" />
                    KubeWatch AI
                </h1>
            </div>
            
            <nav className="flex-1 px-4 space-y-2 mt-4">
                <NavLink to="/dashboard" className={navClass}>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>
                <NavLink to="/deployments" className={navClass}>
                    <Server size={20} /> Deployments
                </NavLink>
                <NavLink to="/incidents" className={navClass}>
                    <AlertTriangle size={20} /> Incidents
                </NavLink>
                <NavLink to="/analyzer" className={navClass}>
                    <FileText size={20} /> AI Log Analyzer
                </NavLink>
                <NavLink to="/monitoring" className={navClass}>
                    <Activity size={20} /> Monitoring
                </NavLink>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-danger-red hover:bg-slate-800 hover:opacity-80 rounded-lg transition-colors"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>
    );
}
