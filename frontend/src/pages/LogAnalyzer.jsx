import { useState, useEffect } from 'react';
import { FileText, Cpu, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import api from '../services/api';

export default function LogAnalyzer() {
    const [logText, setLogText] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/ai/history');
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setAnalyzing(true);
        try {
            const res = await api.post('/ai/analyze', { log_text: logText });
            setResult(res.data);
            fetchHistory();
        } catch (err) {
            console.error(err);
        } finally {
            setAnalyzing(false);
        }
    };

    const getSeverityColor = (sev) => {
        if (sev === 'High') return 'text-danger-red bg-danger-red/10 border-danger-red/30';
        if (sev === 'Medium') return 'text-warning-yellow bg-warning-yellow/10 border-warning-yellow/30';
        return 'text-success-green bg-success-green/10 border-success-green/30';
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FileText className="text-primary-blue" />
                AI Log Intelligence
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="card-panel p-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-text-primary">
                        <Cpu className="text-primary-blue" /> Analyze Log
                    </h2>
                    <form onSubmit={handleAnalyze} className="flex-1 flex flex-col">
                        <textarea 
                            className="flex-1 w-full bg-white border border-border-color rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:outline-none focus:border-primary-blue min-h-[200px] mb-4 shadow-inner"
                            placeholder="Paste your stack trace or Kubernetes pod log here..."
                            value={logText}
                            onChange={(e) => setLogText(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={analyzing}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {analyzing ? (
                                <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span> Analyzing...</>
                            ) : (
                                "Analyze Log with Gemini"
                            )}
                        </button>
                    </form>
                </div>

                <div className="card-panel p-6 flex flex-col h-full overflow-y-auto max-h-[600px]">
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Analysis Result</h2>
                    {result ? (
                        <div className="space-y-6">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getSeverityColor(result.severity)}`}>
                                    Severity: {result.severity}
                                </span>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                                    <Info size={16} className="text-primary-blue" /> Explanation
                                </h3>
                                <p className="text-text-secondary text-sm">{result.explanation}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                                    <AlertTriangle size={16} className="text-danger-red" /> Root Cause
                                </h3>
                                <p className="text-text-secondary text-sm">{result.root_cause}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                                    <CheckCircle size={16} className="text-success-green" /> Suggested Fix
                                </h3>
                                <p className="text-text-secondary text-sm bg-slate-50 p-3 rounded-lg border border-border-color font-mono whitespace-pre-wrap">{result.suggested_fix}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                                    <Info size={16} className="text-slate-400" /> Prevention Tip
                                </h3>
                                <p className="text-text-secondary text-sm">{result.prevention_tip}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-text-secondary">
                            Paste a log and hit analyze to see the AI magic.
                        </div>
                    )}
                </div>
            </div>
            
            <div className="card-panel p-6">
                <h2 className="text-xl font-bold mb-4 text-text-primary">Recent Analyses</h2>
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-border-color flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => setResult(item)}>
                            <div className="flex-1 truncate mr-4">
                                <div className="font-medium text-sm text-text-primary truncate">{item.explanation}</div>
                                <div className="text-xs text-text-secondary mt-1 truncate">{item.original_log.substring(0, 100)}...</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                            </span>
                        </div>
                    ))}
                    {history.length === 0 && <div className="text-text-secondary text-sm text-center">No history found.</div>}
                </div>
            </div>
        </div>
    );
}
