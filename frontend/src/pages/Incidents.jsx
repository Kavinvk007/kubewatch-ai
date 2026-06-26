import { useEffect, useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import api from '../services/api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [showNew, setShowNew] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchIncidents = async () => {
        try {
            const res = await api.get('/incidents/');
            setIncidents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/incidents/', { title, description });
            setShowNew(false);
            setTitle('');
            setDescription('');
            fetchIncidents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleResolve = async (id) => {
        try {
            await api.put(`/incidents/${id}/resolve`);
            fetchIncidents();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3 text-text-primary">
                    <AlertTriangle className="text-warning-yellow" />
                    Incidents
                </h1>
                <button 
                    onClick={() => setShowNew(!showNew)}
                    className="bg-primary-blue hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> New Incident
                </button>
            </div>

            {showNew && (
                <div className="card-panel p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Report New Incident</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                            <input 
                                type="text" 
                                className="w-full bg-white border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary-blue"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                            <textarea 
                                className="w-full bg-white border border-border-color rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary-blue h-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                type="button" 
                                onClick={() => setShowNew(false)}
                                className="px-4 py-2 rounded-lg bg-slate-100 text-text-secondary hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-4 py-2 rounded-lg bg-primary-blue text-white hover:opacity-90"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {incidents.map((inc) => (
                    <div key={inc.id} className="card-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4" style={{borderLeftColor: inc.status === 'Open' ? 'var(--warning-yellow)' : 'var(--success-green)'}}>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-text-primary">{inc.title}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${inc.status === 'Open' ? 'bg-warning-yellow/10 text-warning-yellow' : 'bg-success-green/10 text-success-green'}`}>
                                    {inc.status}
                                </span>
                            </div>
                            <p className="text-text-secondary">{inc.description}</p>
                            <div className="text-xs text-slate-500 mt-2">
                                Reported: {new Date(inc.created_at).toLocaleString()}
                            </div>
                        </div>
                        {inc.status === 'Open' && (
                            <button 
                                onClick={() => handleResolve(inc.id)}
                                className="bg-success-green hover:opacity-90 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                                Mark Resolved
                            </button>
                        )}
                    </div>
                ))}
                {incidents.length === 0 && (
                    <div className="p-8 text-center text-text-secondary card-panel">No incidents reported.</div>
                )}
            </div>
        </div>
    );
}
