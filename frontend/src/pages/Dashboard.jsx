import { useEffect, useState } from 'react';
import { LayoutDashboard, Server, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await api.get('/dashboard/metrics');
                setMetrics(res.data);
            } catch (err) {
                console.error("Failed to fetch metrics", err);
            }
        };
        fetchMetrics();
    }, []);

    if (!metrics) return <div className="text-slate-400">Loading metrics...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <LayoutDashboard className="text-primary-blue" />
                Cluster Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card-panel p-6 border-l-4 border-primary-blue">
                    <h3 className="text-text-secondary font-medium mb-1 flex items-center gap-2">
                        <Server size={16} /> Total Pods
                    </h3>
                    <div className="text-4xl font-bold">{metrics.total_pods}</div>
                </div>
                <div className="card-panel p-6 border-l-4 border-success-green">
                    <h3 className="text-text-secondary font-medium mb-1 flex items-center gap-2">
                        <CheckCircle size={16} /> Running Pods
                    </h3>
                    <div className="text-4xl font-bold text-success-green">{metrics.running_pods}</div>
                </div>
                <div className="card-panel p-6 border-l-4 border-danger-red">
                    <h3 className="text-text-secondary font-medium mb-1 flex items-center gap-2">
                        <XCircle size={16} /> Failed Pods
                    </h3>
                    <div className="text-4xl font-bold text-danger-red">{metrics.failed_pods}</div>
                </div>
                <div className="card-panel p-6 border-l-4 border-warning-yellow">
                    <h3 className="text-text-secondary font-medium mb-1 flex items-center gap-2">
                        <AlertTriangle size={16} /> Open Incidents
                    </h3>
                    <div className="text-4xl font-bold text-warning-yellow">{metrics.open_incidents}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-panel p-6">
                    <h2 className="text-xl font-bold mb-4">API Health</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-success-green/20 flex items-center justify-center">
                            <CheckCircle className="text-success-green w-8 h-8" />
                        </div>
                        <div>
                            <div className="text-lg font-medium text-text-primary">All Systems Operational</div>
                            <div className="text-text-secondary text-sm">Updated just now</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
