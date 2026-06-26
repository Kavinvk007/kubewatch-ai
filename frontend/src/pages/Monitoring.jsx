import { Activity } from 'lucide-react';

export default function Monitoring() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Activity className="text-emerald-500" />
                Monitoring Links
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="glass-panel p-6 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-orange-500/50 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <img src="https://grafana.com/static/img/menu/grafana2.svg" alt="Grafana" className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">Grafana</h2>
                        </div>
                        <p className="text-slate-400">View detailed metrics dashboards, CPU/Memory usage, and API latencies.</p>
                        <div className="mt-4 text-orange-400 text-sm font-medium">Open Dashboard →</div>
                    </div>
                </a>

                <a href="http://localhost:9090" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="glass-panel p-6 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-red-500/50 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Activity className="text-red-500 w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">Prometheus</h2>
                        </div>
                        <p className="text-slate-400">Query raw metrics, view target health, and inspect alerting rules.</p>
                        <div className="mt-4 text-red-400 text-sm font-medium">Open Prometheus →</div>
                    </div>
                </a>
            </div>
            
            <div className="mt-8 glass-panel p-6 rounded-xl border-l-4 border-indigo-500">
                <h3 className="font-bold mb-2">Note on local environment:</h3>
                <p className="text-slate-400 text-sm">
                    Ensure that your K8s port forwards are running. Typical ports are <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">3000</code> for Grafana and <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">9090</code> for Prometheus. 
                    If you haven't set up the cluster yet, these links won't work until phase 4 is deployed.
                </p>
            </div>
        </div>
    );
}
