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
                <Server className="text-primary-blue" />
                Deployments
            </h1>

            <div className="card-panel overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-border-color">
                            <th className="p-4 font-semibold text-text-secondary">Name</th>
                            <th className="p-4 font-semibold text-text-secondary">Status</th>
                            <th className="p-4 font-semibold text-text-secondary">Replicas</th>
                            <th className="p-4 font-semibold text-text-secondary">Ready</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map((dep, index) => (
                            <tr key={index} className="border-b border-border-color hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-text-primary">{dep.name}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        dep.status === 'Running' ? 'bg-success-green/10 text-success-green border border-success-green/20' : 'bg-danger-red/10 text-danger-red border border-danger-red/20'
                                    }`}>
                                        {dep.status}
                                    </span>
                                </td>
                                <td className="p-4 text-text-secondary">{dep.replicas}</td>
                                <td className="p-4 text-text-secondary">{dep.ready}/{dep.replicas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {deployments.length === 0 && (
                    <div className="p-8 text-center text-text-secondary">No deployments found.</div>
                )}
            </div>
        </div>
    );
}
