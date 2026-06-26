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
        if (sev === 'High') return 'text-red-400 bg-red-500/10 border-red-500/50';
        if (sev === 'Medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/50';
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/50';
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FileText className="text-indigo-500" />
                AI Log Intelligence
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="glass-panel p-6 rounded-xl flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Cpu className="text-indigo-400" /> Analyze Log
                    </h2>
                    <form onSubmit={handleAnalyze} className="flex-1 flex flex-col">
                        <textarea 
                            className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-indigo-500 min-h-[200px] mb-4"
                            placeholder="Paste your stack trace or Kubernetes pod log here..."
                            value={logText}
                            onChange={(e) => setLogText(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={analyzing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {analyzing ? (
                                <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span> Analyzing...</>
                            ) : (
                                "Analyze Log with Gemini"
                            )}
                        </button>
                    </form>
                </div>

                <div className="glass-panel p-6 rounded-xl flex flex-col h-full overflow-y-auto max-h-[600px]">
                    <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
                    {result ? (
                        <div className="space-y-6">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getSeverityColor(result.severity)}`}>
                                    Severity: {result.severity}
                                </span>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-1">
                                    <Info size={16} className="text-blue-400" /> Explanation
                                </h3>
                                <p className="text-slate-400 text-sm">{result.explanation}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-1">
                                    <AlertTriangle size={16} className="text-amber-400" /> Root Cause
                                </h3>
                                <p className="text-slate-400 text-sm">{result.root_cause}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-1">
                                    <CheckCircle size={16} className="text-emerald-400" /> Suggested Fix
                                </h3>
                                <p className="text-slate-400 text-sm bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono whitespace-pre-wrap">{result.suggested_fix}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-1">
                                    <Info size={16} className="text-indigo-400" /> Prevention Tip
                                </h3>
                                <p className="text-slate-400 text-sm">{result.prevention_tip}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500">
                            Paste a log and hit analyze to see the AI magic.
                        </div>
                    )}
                </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Recent Analyses</h2>
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item.id} className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => setResult(item)}>
                            <div className="flex-1 truncate mr-4">
                                <div className="font-medium text-sm text-slate-300 truncate">{item.explanation}</div>
                                <div className="text-xs text-slate-500 mt-1 truncate">{item.original_log.substring(0, 100)}...</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                            </span>
                        </div>
                    ))}
                    {history.length === 0 && <div className="text-slate-500 text-sm text-center">No history found.</div>}
                </div>
            </div>
        </div>
    );
}
