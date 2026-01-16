"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Script from 'next/script';

const OS_OPTIONS = [
    { id: 'ubuntu-22', name: 'Ubuntu 22.04 LTS', icon: 'fa-ubuntu', ami: 'ami-03f4878755434977f', price: 0 },
    { id: 'ubuntu-24', name: 'Ubuntu 24.04 LTS', icon: 'fa-ubuntu', ami: 'ami-0dee22c13ea7a9a67', price: 0 },
    { id: 'debian-12', name: 'Debian 12', icon: 'fa-debian', ami: 'ami-0b19129b48c40b8ea', price: 0 },
    { id: 'windows-2022', name: 'Windows Server 2022', icon: 'fa-windows', ami: 'ami-007823f668fc74bca', price: 1500 }, // License fee
    { id: 'windows-2019', name: 'Windows Server 2019', icon: 'fa-windows', ami: 'ami-0c2b0e4e69b9101d2', price: 1500 },
];

const PLANS = [
    {
        id: 'starter',
        name: 'Starter (t3.medium)',
        cpu: '2 vCPU',
        ram: '4GB DDR4',
        basePrice: 1200,
        type: 't3.medium',
        features: ['10GBps Network', 'EBS Optimized', 'Elastic IP Included']
    },
    {
        id: 'cloud',
        name: 'Cloud (t3.xlarge)',
        cpu: '4 vCPU',
        ram: '16GB DDR4',
        basePrice: 4800,
        type: 't3.xlarge',
        features: ['10GBps Network', 'EBS Optimized', 'Elastic IP Included', 'High I/O']
    },
];

const STORAGE_PRICE_PER_GB = 10; // ₹10 per GB
const BACKUP_FEE = 250;

export const dynamic = 'force-dynamic';

export default function DeployPage() {
    const [selectedOS, setSelectedOS] = useState(OS_OPTIONS[0]);
    const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
    const [storageSize, setStorageSize] = useState(20);
    const [backupsEnabled, setBackupsEnabled] = useState(false);
    const [instanceName, setInstanceName] = useState('My-AWS-Instance');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    const totalPrice = selectedPlan.basePrice +
        selectedOS.price +
        (storageSize * STORAGE_PRICE_PER_GB) +
        (backupsEnabled ? BACKUP_FEE : 0);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login?redirect=/deploy');
            } else {
                setUser(user);
            }
        };
        checkUser();
    }, []);

    const handleDeploy = async () => {
        if (!user) return;
        setLoading(true);

        try {
            // TEST MODE: Bypassing Razorpay for direct AWS provisioning
            const verifyRes = await fetch('/api/checkout/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razorpay_order_id: 'TEST_ORDER_ID',
                    razorpay_payment_id: 'TEST_MODE',
                    razorpay_signature: 'TEST_SIGNATURE',
                    config: {
                        name: instanceName,
                        os: selectedOS.id,
                        ami: selectedOS.ami,
                        plan: selectedPlan.id,
                        cpu: selectedPlan.cpu,
                        ram: selectedPlan.ram,
                        disk: `${storageSize}GB`,
                        type: selectedPlan.type,
                        backups: backupsEnabled
                    }
                }),
            });

            if (verifyRes.ok) {
                router.push('/dashboard?success=true');
            } else {
                const errData = await verifyRes.json();
                alert(`Deployment failed: ${errData.error || 'Server Error'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong during deployment.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="deploy-container">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="deploy-header reveal active">
                <h1>Deploy AWS <span>EC2 Instance</span></h1>
                <p>Configure your cloud infrastructure with enterprise-grade AWS EC2.</p>
            </div>

            <div className="deploy-grid">
                <div className="config-side">
                    <section className="config-section reveal active">
                        <h2><i className="fa-solid fa-server"></i> 1. Instance Name</h2>
                        <input
                            type="text"
                            className="text-input"
                            value={instanceName}
                            onChange={(e) => setInstanceName(e.target.value)}
                            placeholder="e.g. My-Web-Server"
                        />
                    </section>

                    <section className="config-section reveal active">
                        <h2><i className="fa-solid fa-microchip"></i> 2. Choose Compute Plan</h2>
                        <div className="plan-grid">
                            {PLANS.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`plan-card ${selectedPlan.id === plan.id ? 'active' : ''}`}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    <div className="plan-name">{plan.name}</div>
                                    <div className="plan-specs">
                                        <div>{plan.cpu} / {plan.ram}</div>
                                        <div>Type: {plan.type}</div>
                                    </div>
                                    <div className="plan-price">₹{plan.basePrice}/mo</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="config-section reveal active">
                        <h2><i className="fa-solid fa-compact-disc"></i> 3. Operating System</h2>
                        <div className="os-grid">
                            {OS_OPTIONS.map((os) => (
                                <div
                                    key={os.id}
                                    className={`os-card ${selectedOS.id === os.id ? 'active' : ''}`}
                                    onClick={() => setSelectedOS(os)}
                                >
                                    <i className={`fa-brands ${os.icon}`}></i>
                                    <span>{os.name}</span>
                                    {os.price > 0 && <span className="os-addon">+₹{os.price}</span>}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="config-section reveal active">
                        <h2><i className="fa-solid fa-hard-drive"></i> 4. Storage & Backups</h2>
                        <div className="storage-config">
                            <label>SSD Volume Size ({storageSize} GB)</label>
                            <input
                                type="range"
                                min="20"
                                max="500"
                                step="10"
                                value={storageSize}
                                onChange={(e) => setStorageSize(parseInt(e.target.value))}
                                className="range-slider"
                            />
                            <div className="storage-meta">₹{storageSize * STORAGE_PRICE_PER_GB} / month allocated</div>
                        </div>
                        <div className="backup-toggle" onClick={() => setBackupsEnabled(!backupsEnabled)}>
                            <div className={`checkbox ${backupsEnabled ? 'checked' : ''}`}>
                                {backupsEnabled && <i className="fa-solid fa-check"></i>}
                            </div>
                            <span>Enable Automatic Backups (+₹{BACKUP_FEE}/mo)</span>
                        </div>
                    </section>
                </div>

                <div className="summary-side">
                    <div className="summary-card reveal active">
                        <h3>Configuration Summary</h3>
                        <div className="summary-row"><span>Compute ({selectedPlan.type})</span><span>₹{selectedPlan.basePrice}</span></div>
                        <div className="summary-row"><span>{selectedOS.name}</span><span>₹{selectedOS.price}</span></div>
                        <div className="summary-row"><span>Storage ({storageSize}GB)</span><span>₹{storageSize * STORAGE_PRICE_PER_GB}</span></div>
                        {backupsEnabled && <div className="summary-row"><span>Auto-Backups</span><span>₹{BACKUP_FEE}</span></div>}
                        <div className="summary-row"><span>Elastic IP</span><span className="free">FREE</span></div>
                        <div className="summary-divider"></div>
                        <div className="summary-total"><span>Total Monthly</span><span>₹{totalPrice}</span></div>
                        <button className="cta-btn deploy-btn" disabled={loading} onClick={handleDeploy}>
                            {loading ? 'Processing...' : 'Deploy on AWS'}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .deploy-container { padding: 40px 5%; max-width: 1300px; margin: 0 auto; color: #fff; }
                .deploy-header { text-align: center; margin-bottom: 50px; }
                .deploy-header h1 span { color: var(--primary-red); }
                .deploy-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
                .config-section { background: var(--card-bg); border: 1px solid var(--border-color); padding: 30px; border-radius: 16px; margin-bottom: 30px; }
                .config-section h2 { font-size: 1.1rem; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; }
                .text-input { width: 100%; padding: 12px 16px; background: #0a0a0a; border: 1px solid #333; border-radius: 8px; color: #fff; }
                .plan-grid, .os-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
                .plan-card, .os-card { background: #0a0a0a; border: 1px solid #222; padding: 20px; border-radius: 12px; cursor: pointer; transition: 0.3s; }
                .plan-card.active, .os-card.active { border-color: var(--primary-red); background: rgba(255,0,0,0.05); }
                .os-addon { display: block; font-size: 0.75rem; color: var(--primary-red); margin-top: 5px; font-weight: 700; }
                .range-slider { width: 100%; margin: 20px 0; accent-color: var(--primary-red); }
                .storage-meta { font-size: 0.85rem; color: #666; }
                .backup-toggle { display: flex; align-items: center; gap: 12px; margin-top: 25px; cursor: pointer; }
                .checkbox { width: 20px; height: 20px; border: 1px solid #444; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; }
                .checkbox.checked { background: var(--primary-red); border-color: var(--primary-red); }
                .summary-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 30px; border-radius: 16px; position: sticky; top: 120px; }
                .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; color: #aaa; }
                .summary-total { display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; margin: 20px 0; color: #fff; }
                .free { color: #42b836; font-weight: 700; font-size: 0.8rem; }
                .deploy-btn { width: 100%; padding: 15px; }
                @media (max-width: 992px) { .deploy-grid { grid-template-columns: 1fr; } .summary-card { position: static; } }
            `}</style>
        </div>
    );
}
