"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ControlPanel() {
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

        if (!error && data) {
            setInstances(data);
            // Trigger background sync for instances that are provisioning or running
            data.forEach(instance => {
                if (instance.status === 'provisioning' || !instance.ip_address) {
                    syncInstance(instance.instance_id);
                }
            });
        }
        setLoading(false);
    };

    const syncInstance = async (instanceId: string) => {
        try {
            const res = await fetch('/api/instances/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instanceId }),
            });
            if (res.ok) {
                const refreshed = await res.json();
                setInstances(prev => prev.map(inst =>
                    inst.instance_id === instanceId
                        ? { ...inst, status: refreshed.status, ip_address: refreshed.ip }
                        : inst
                ));
            }
        } catch (err) {
            console.error('Sync failed for:', instanceId);
        }
    };

    const handleAction = async (instanceId: string, action: string) => {
        try {
            const res = await fetch('/api/instances/control', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instanceId, action }),
            });

            if (res.ok) {
                setTimeout(() => syncInstance(instanceId), 2000);
            } else {
                alert('Action failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    const getCredentials = (os: string) => {
        if (os.includes('ubuntu')) return { user: 'ubuntu', pass: 'Default SSH Key' };
        if (os.includes('debian')) return { user: 'admin', pass: 'Default SSH Key' };
        if (os.includes('windows')) return { user: 'Administrator', pass: 'Check AWS Console (Decrypted)' };
        return { user: 'root', pass: 'SSH Key' };
    };

    if (loading) return <div className="loading-state">Loading your Control Panel...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header reveal active">
                <div>
                    <h1>AXTCloud <span>Panel</span></h1>
                    <p>Welcome, {user?.user_metadata?.full_name || 'User'}. Manage your enterprise instances.</p>
                </div>
                <Link href="/deploy" className="cta-btn deploy-new">
                    <i className="fa-solid fa-plus"></i> Deploy New
                </Link>
            </div>

            <div className="stats-strip reveal active">
                <div className="stat-item">
                    <span className="stat-label">Total Cloud Servers</span>
                    <span className="stat-val">{instances.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Active Resources</span>
                    <span className="stat-val">{instances.filter(i => i.status === 'running' || i.status === 'provisioning').length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Network Usage</span>
                    <span className="stat-val">Unlimited</span>
                </div>
            </div>

            <div className="instances-grid reveal active">
                {instances.length === 0 ? (
                    <div className="empty-state">
                        <i className="fa-solid fa-cloud"></i>
                        <h3>No active instances</h3>
                        <p>Deploy a high-performance cloud server in seconds.</p>
                        <Link href="/deploy" className="cta-btn">Start Deployment</Link>
                    </div>
                ) : (
                    instances.map((idx) => {
                        const creds = getCredentials(idx.os);
                        return (
                            <div key={idx.id} className="instance-card">
                                <div className="instance-top">
                                    <div className="instance-info">
                                        <h3>{idx.name}</h3>
                                        <span className={`status-badge ${idx.status}`}>{idx.status}</span>
                                    </div>
                                    <div className={`os-icon ${idx.os}`}>
                                        <i className={`fa-brands ${idx.os.includes('ubuntu') ? 'fa-ubuntu' : idx.os.includes('windows') ? 'fa-windows' : 'fa-linux'}`}></i>
                                    </div>
                                </div>

                                <div className="instance-details">
                                    <div className="detail-row">
                                        <span>Reference ID</span>
                                        <span className="mono">{idx.instance_id}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Access IP</span>
                                        <span className="mono highlight">{idx.ip_address || 'Provisioning...'}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span>Specs</span>
                                        <span>{idx.specs.cpu} / {idx.specs.ram}</span>
                                    </div>
                                </div>

                                <div className="login-creds">
                                    <p><strong>SSH/RDP Login:</strong></p>
                                    <div className="cred-box">
                                        <span>User: <code>{creds.user}</code></span>
                                        <button className="sync-btn" onClick={() => syncInstance(idx.instance_id)} title="Refresh IP">
                                            <i className="fa-solid fa-arrows-rotate"></i>
                                        </button>
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
                        );
                    })
                )}
            </div>

            <style jsx>{`
                .dashboard-container { padding: 40px 5%; max-width: 1300px; margin: 0 auto; color: #fff; }
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
                .empty-state i { font-size: 4rem; color: #333; margin-bottom: 20px; }
                .empty-state h3 { font-size: 1.5rem; margin-bottom: 10px; }
                .empty-state p { color: #666; margin-bottom: 30px; }

                .instance-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 25px; border-radius: 16px; transition: 0.3s; position: relative; }
                .instance-card:hover { border-color: #444; transform: translateY(-5px); }
                
                .instance-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
                .instance-info h3 { font-size: 1.1rem; margin-bottom: 8px; font-weight: 700; color: #fff; }
                
                .status-badge { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 50px; background: #222; color: #888; }
                .status-badge.running { background: rgba(66, 184, 54, 0.1); color: #42b836; }
                .status-badge.provisioning { background: rgba(255, 165, 0, 0.1); color: #ffa500; }
                .status-badge.stopped { background: rgba(255, 0, 0, 0.1); color: #ff0000; }
                
                .os-icon { width: 45px; height: 45px; background: #0a0a0a; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
                .os-icon.ubuntu { color: #E95420; }
                .os-icon.windows { color: #0078D4; }

                .instance-details { margin-bottom: 20px; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem; }
                .detail-row span:first-child { color: #666; }
                .mono { font-family: 'Fira Code', monospace; color: #aaa; }
                .highlight { color: #fff; font-weight: 700; border-bottom: 1px dotted #444; }

                .login-creds { background: #080808; padding: 15px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #1a1a1a; }
                .login-creds p { font-size: 0.75rem; color: #666; margin-bottom: 8px; text-transform: uppercase; }
                .cred-box { display: flex; justify-content: space-between; align-items: center; }
                .cred-box code { color: var(--primary-red); background: #1a0000; padding: 2px 6px; border-radius: 4px; }
                .sync-btn { background: none; border: none; color: #444; cursor: pointer; transition: 0.3s; }
                .sync-btn:hover { color: #fff; transform: rotate(180deg); }

                .instance-actions { display: flex; gap: 10px; border-top: 1px solid #1a1a1a; padding-top: 20px; }
                .action-btn { flex: 1; padding: 10px; background: #111; border: 1px solid #222; border-radius: 8px; color: #888; cursor: pointer; transition: 0.3s; }
                .action-btn:hover { background: #222; color: #fff; border-color: #333; }
                .action-btn.danger:hover { background: #200; border-color: #600; color: #ff4d4d; }

                .loading-state { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #666; }
            `}</style>
        </div>
    );
}
