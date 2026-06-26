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
                <LayoutDashboard className="text-blue-500" />
                Cluster Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-slate-400 font-medium mb-1 flex items-center gap-2">
                        <Server size={16} /> Total Pods
                    </h3>
                    <div className="text-4xl font-bold">{metrics.total_pods}</div>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-emerald-500">
                    <h3 className="text-slate-400 font-medium mb-1 flex items-center gap-2">
                        <CheckCircle size={16} /> Running Pods
                    </h3>
                    <div className="text-4xl font-bold text-emerald-400">{metrics.running_pods}</div>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-red-500">
                    <h3 className="text-slate-400 font-medium mb-1 flex items-center gap-2">
                        <XCircle size={16} /> Failed Pods
                    </h3>
                    <div className="text-4xl font-bold text-red-400">{metrics.failed_pods}</div>
                </div>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-amber-500">
                    <h3 className="text-slate-400 font-medium mb-1 flex items-center gap-2">
                        <AlertTriangle size={16} /> Open Incidents
                    </h3>
                    <div className="text-4xl font-bold text-amber-400">{metrics.open_incidents}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">API Health</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="text-emerald-500 w-8 h-8" />
                        </div>
                        <div>
                            <div className="text-lg font-medium">All Systems Operational</div>
                            <div className="text-slate-400 text-sm">Updated just now</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
