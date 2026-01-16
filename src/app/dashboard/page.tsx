"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
    const [instances, setInstances] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
                fetchInstances(user.id);
            }
        };
        checkUser();
    }, []);

    const fetchInstances = async (userId: string) => {
        const { data, error } = await supabase
            .from('user_instances')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (!error) {
            setInstances(data || []);
        }
        setLoading(false);
    };

    const handleAction = async (instanceId: string, action: string) => {
        try {
            const res = await fetch('/api/instances/control', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instanceId, action }),
            });

            if (res.ok) {
                fetchInstances(user.id);
            } else {
                alert('Action failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    if (loading) return <div className="loading-state">Loading your dashboard...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header reveal active">
                <div>
                    <h1>Welcome, <span>{user?.user_metadata?.full_name || 'User'}</span></h1>
                    <p>Manage your cloud resources and servers</p>
                </div>
                <Link href="/deploy" className="cta-btn deploy-new">
                    <i className="fa-solid fa-plus"></i> Deploy New Server
                </Link>
            </div>

            <div className="stats-strip reveal active">
                <div className="stat-item">
                    <span className="stat-label">Total Servers</span>
                    <span className="stat-val">{instances.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Active Plans</span>
                    <span className="stat-val">{instances.filter(i => i.status === 'running' || i.status === 'provisioning').length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Next Invoice</span>
                    <span className="stat-val">₹0.00</span>
                </div>
            </div>

            <div className="instances-grid reveal active">
                {instances.length === 0 ? (
                    <div className="empty-state">
                        <i className="fa-solid fa-server"></i>
                        <h3>No servers found</h3>
                        <p>You haven't deployed any servers yet. Get started today!</p>
                        <Link href="/deploy" className="cta-btn">Deploy First Server</Link>
                    </div>
                ) : (
                    instances.map((idx) => (
                        <div key={idx.id} className="instance-card">
                            <div className="instance-top">
                                <div className="instance-info">
                                    <h3>{idx.name}</h3>
                                    <span className={`status-badge ${idx.status}`}>{idx.status}</span>
                                </div>
                                <div className={`os-icon ${idx.os}`}>
                                    <i className={`fa-brands ${idx.os === 'ubuntu' ? 'fa-ubuntu' : idx.os === 'windows' ? 'fa-windows' : 'fa-linux'}`}></i>
                                </div>
                            </div>

                            <div className="instance-details">
                                <div className="detail-row">
                                    <span>Instance ID</span>
                                    <span className="mono">{idx.instance_id}</span>
                                </div>
                                <div className="detail-row">
                                    <span>IP Address</span>
                                    <span className="mono">{idx.ip_address || 'Pending...'}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Configuration</span>
                                    <span>{idx.specs.cpu} / {idx.specs.ram}</span>
                                </div>
                            </div>

                            <div className="instance-actions">
                                <button className="action-btn" title="Start" onClick={() => handleAction(idx.instance_id, 'start')}>
                                    <i className="fa-solid fa-play"></i>
                                </button>
                                <button className="action-btn" title="Stop" onClick={() => handleAction(idx.instance_id, 'stop')}>
                                    <i className="fa-solid fa-stop"></i>
                                </button>
                                <button className="action-btn" title="Restart" onClick={() => handleAction(idx.instance_id, 'restart')}>
                                    <i className="fa-solid fa-rotate-right"></i>
                                </button>
                                <button className="action-btn danger" title="Terminate" onClick={() => handleAction(idx.instance_id, 'terminate')}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .dashboard-container { padding: 40px 5%; max-width: 1300px; margin: 0 auto; }
                .dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
                .dashboard-header h1 { font-size: 2.2rem; margin-bottom: 5px; }
                .dashboard-header h1 span { color: var(--primary-red); }
                .dashboard-header p { color: var(--text-muted); }

                .deploy-new { background: var(--primary-red); padding: 12px 25px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }

                .stats-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
                .stat-item { background: var(--card-bg); border: 1px solid var(--border-color); padding: 25px; border-radius: 12px; }
                .stat-label { display: block; font-size: 0.8rem; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
                .stat-val { font-size: 1.5rem; font-weight: 700; color: #fff; }

                .instances-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px; }
                .empty-state { grid-column: 1 / -1; text-align: center; padding: 100px 20px; background: var(--card-bg); border: 2px dashed var(--border-color); border-radius: 20px; }
                .empty-state i { font-size: 4rem; color: #222; margin-bottom: 20px; }
                .empty-state h3 { font-size: 1.5rem; margin-bottom: 10px; }
                .empty-state p { color: #666; margin-bottom: 30px; }

                .instance-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 25px; border-radius: 16px; transition: 0.3s; }
                .instance-card:hover { border-color: #333; transform: translateY(-5px); }
                
                .instance-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
                .instance-info h3 { font-size: 1.1rem; margin-bottom: 8px; }
                
                .status-badge { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 50px; background: #222; color: #888; }
                .status-badge.running { background: rgba(0, 255, 0, 0.1); color: #00ff00; }
                .status-badge.provisioning { background: rgba(255, 255, 0, 0.1); color: #ffff00; }
                
                .os-icon { width: 45px; height: 45px; background: #0a0a0a; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
                .os-icon.ubuntu { color: #E95420; }
                .os-icon.windows { color: #0078D4; }

                .instance-details { margin-bottom: 30px; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem; }
                .detail-row span:first-child { color: #666; }
                .mono { font-family: 'Fira Code', monospace; color: #aaa; }

                .instance-actions { display: flex; gap: 10px; border-top: 1px solid #222; padding-top: 20px; }
                .action-btn { flex: 1; padding: 10px; background: #161616; border: 1px solid #333; border-radius: 8px; color: #aaa; cursor: pointer; transition: 0.3s; }
                .action-btn:hover { background: #222; color: #fff; border-color: #444; }
                .action-btn.danger:hover { background: #300; border-color: #a00; color: #ff4d4d; }

                .loading-state { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #666; }
            `}</style>
        </div>
    );
}
