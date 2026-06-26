import { useState } from 'react';
import { Activity, Copy, Check, AlertCircle, ExternalLink } from 'lucide-react';

export default function Monitoring() {
    const [copied, setCopied] = useState('');

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-text-primary">
                <Activity className="text-primary-blue" />
                Monitoring Links
            </h1>

            <div className="mb-6 card-panel p-4 bg-blue-50 border-l-4 border-primary-blue">
                <p className="text-text-primary font-medium">
                    These links work when running via Docker Compose, or after Kubernetes is running and port-forward commands are active.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Grafana Card */}
                <div className="card-panel p-6 flex flex-col h-full border-t-4 border-t-orange-500">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <img src="https://grafana.com/static/img/menu/grafana2.svg" alt="Grafana" className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">Grafana</h2>
                            <p className="text-text-secondary text-sm">
                                URL: <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue">http://localhost:3001</a>
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-border-color mb-6 flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-text-primary">Command:</span>
                        </div>
                        <code className="block bg-white p-2 rounded text-text-secondary font-mono text-xs border border-border-color break-all">
                            kubectl port-forward svc/grafana 3001:3000 -n kubewatch
                        </code>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                            href="http://localhost:3001" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                        >
                            Open Grafana <ExternalLink size={16} />
                        </a>
                        <button 
                            onClick={() => handleCopy('kubectl port-forward svc/grafana 3001:3000 -n kubewatch', 'grafana')}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-text-primary font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-border-color"
                        >
                            {copied === 'grafana' ? <Check size={18} className="text-success-green" /> : <Copy size={18} />}
                            {copied === 'grafana' ? <span className="text-success-green">Copied!</span> : 'Copy Command'}
                        </button>
                    </div>
                </div>

                {/* Prometheus Card */}
                <div className="card-panel p-6 flex flex-col h-full border-t-4 border-t-danger-red">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-danger-red/10 flex items-center justify-center">
                            <Activity className="text-danger-red w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">Prometheus</h2>
                            <p className="text-text-secondary text-sm">
                                URL: <a href="http://localhost:9090" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue">http://localhost:9090</a>
                            </p>
                            <p className="text-text-secondary text-sm">
                                Targets URL: <a href="http://localhost:9090/targets" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue">http://localhost:9090/targets</a>
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-border-color mb-6 flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-text-primary">Command:</span>
                        </div>
                        <code className="block bg-white p-2 rounded text-text-secondary font-mono text-xs border border-border-color break-all">
                            kubectl port-forward svc/prometheus 9090:9090 -n kubewatch
                        </code>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a 
                                href="http://localhost:9090" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                            >
                                Open Prometheus <ExternalLink size={16} />
                            </a>
                            <a 
                                href="http://localhost:9090/targets" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                            >
                                Open Targets <ExternalLink size={16} />
                            </a>
                        </div>
                        <button 
                            onClick={() => handleCopy('kubectl port-forward svc/prometheus 9090:9090 -n kubewatch', 'prometheus')}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-text-primary font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-border-color"
                        >
                            {copied === 'prometheus' ? <Check size={18} className="text-success-green" /> : <Copy size={18} />}
                            {copied === 'prometheus' ? <span className="text-success-green">Copied!</span> : 'Copy Command'}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="card-panel p-6 bg-red-50 border-l-4 border-danger-red">
                <h3 className="font-bold flex items-center gap-2 text-danger-red mb-3">
                    <AlertCircle size={20} />
                    Troubleshooting
                </h3>
                <p className="text-text-primary font-medium mb-2">If “This site can’t be reached” appears:</p>
                <ul className="list-disc pl-5 text-text-secondary space-y-1">
                    <li>kubectl or minikube may not be installed</li>
                    <li>Docker Desktop may not be running</li>
                    <li>Minikube may not be started</li>
                    <li>Pods may not be Running</li>
                    <li>Port-forward terminal may be closed</li>
                    <li>Port may already be in use</li>
                </ul>
            </div>
        </div>
    );
}
