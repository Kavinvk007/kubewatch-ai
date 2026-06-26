import { useEffect, useState } from 'react';
import { Server } from 'lucide-react';
import api from '../services/api';

export default function Deployments() {
    const [deployments, setDeployments] = useState([]);

    useEffect(() => {
        const fetchDeployments = async () => {
            try {
                const res = await api.get('/dashboard/deployments');
                setDeployments(res.data);
            } catch (err) {
                console.error("Failed to fetch deployments", err);
            }
        };
        fetchDeployments();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Server className="text-blue-500" />
                Deployments
            </h1>

            <div className="glass-panel rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900 border-b border-slate-800">
                            <th className="p-4 font-semibold text-slate-300">Name</th>
                            <th className="p-4 font-semibold text-slate-300">Status</th>
                            <th className="p-4 font-semibold text-slate-300">Replicas</th>
                            <th className="p-4 font-semibold text-slate-300">Ready</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map((dep, index) => (
                            <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                                <td className="p-4 font-medium">{dep.name}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        dep.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    }`}>
                                        {dep.status}
                                    </span>
                                </td>
                                <td className="p-4">{dep.replicas}</td>
                                <td className="p-4">{dep.ready}/{dep.replicas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {deployments.length === 0 && (
                    <div className="p-8 text-center text-slate-400">No deployments found.</div>
                )}
            </div>
        </div>
    );
}
