"use client";

import { useState } from 'react';
import Link from 'next/link';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function VPSHosting() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="hero reveal" style={{ padding: '140px 20px 60px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '0.9rem', color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Next-Gen Cloud</h2>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '15px' }}>High Performance.<br /><span style={{ color: 'var(--primary-red)' }}>AWS Powered.</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem' }}>We are migrating our VPS infrastructure to AWS EC2 for 99.99% reliability and global scalability. Standard VPS plans are currently being upgraded.</p>
                <div style={{ marginTop: '40px' }}>
                    <Link href="/deploy" className="cta-btn" style={{ padding: '15px 35px' }}>Deploy AWS Now</Link>
                </div>
            </div>

            <section className="reveal" style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '60px', borderRadius: '24px' }}>
                    <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '3rem', color: '#444', marginBottom: '30px' }}></i>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Standard VPS Plans <span style={{ color: 'var(--primary-red)' }}>Coming Soon</span></h2>
                    <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto 30px', lineHeight: 1.6 }}>Our localized VPS clusters in Mumbai, Singapore, and Frankfurt are undergoing hardware refreshes. Direct AWS EC2 deployment is available as an alternative.</p>
                    <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
                        <div style={{ padding: '20px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid #222' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>MUMBAI-1</div>
                            <div style={{ color: 'var(--primary-red)', fontWeight: 700 }}>UNDER MAINTENANCE</div>
                        </div>
                        <div style={{ padding: '20px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid #222' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>SINGAPORE-1</div>
                            <div style={{ color: 'var(--primary-red)', fontWeight: 700 }}>UPGRADING</div>
                        </div>
                        <div style={{ padding: '20px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid #222' }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>AWS-GLOBAL</div>
                            <div style={{ color: '#42b836', fontWeight: 700 }}>OPERATIONAL</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section reveal" style={{ padding: '80px 5%', background: 'linear-gradient(to bottom, #050505, #0f0000)', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '15px' }}>Enterprise-Grade <span style={{ color: 'var(--primary-red)' }}>Infrastructure</span></h2>
                <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px', maxWidth: '1200px', margin: '40px auto 0' }}>
                    {[
                        { icon: "fa-microchip", title: "AWS Compute", desc: "Powered by latest AWS Nitro System for near-metal performance." },
                        { icon: "fa-hard-drive", title: "EBS SSD Storage", desc: "Elastic Block Store with high IOPS and multi-zone durability." },
                        { icon: "fa-shield-cat", title: "AWS Shield", desc: "Always-on network flow monitoring and inline mitigation." },
                        { icon: "fa-network-wired", title: "Elastic IP", desc: "Static IP addresses designed for dynamic cloud computing." },
                    ].map((feat, i) => (
                        <div key={i} className="feat-item" style={{ background: '#0a0a0a', padding: '30px', borderRadius: '16px', border: '1px solid #222' }}>
                            <i className={`fa-solid ${feat.icon}`} style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '15px' }}></i>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff' }}>{feat.title}</h3>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
