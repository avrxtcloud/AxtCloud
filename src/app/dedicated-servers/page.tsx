"use client";

import { useState } from 'react';
import Link from 'next/link';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function DedicatedServers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="hero reveal" style={{ padding: '140px 20px 80px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '15px' }}>Full Metal <span style={{ color: 'var(--primary-red)' }}>Performance</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem' }}>Our Dedicated Bare Metal infrastructure is currently being integrated with advanced management panels. Please check back soon or contact sales for custom manual deployments.</p>
                <div style={{ marginTop: '40px' }}>
                    <a href="#" onClick={handleComingSoon} className="cta-btn" style={{ padding: '15px 35px' }}>View Clusters</a>
                </div>
            </div>

            <section className="reveal" style={{ padding: '100px 5%', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '80px 40px', borderRadius: '30px' }}>
                    <div className="coming-soon-badge" style={{ display: 'inline-block', padding: '6px 15px', background: 'rgba(255,0,0,0.1)', color: 'var(--primary-red)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '30px' }}>PHASE 2 DEPLOYMENT</div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Bare Metal Portal <span>Coming Soon</span></h2>
                    <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>We are building an industry-first automation layer for bare-metal servers. This will allow for 4-hour provisioning, real-time IPMI access, and automated OS reloads.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>EPYC™</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>LATEST-GEN</div>
                        </div>
                        <div style={{ width: '1px', background: '#333', height: '50px' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>10G</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>PORT SPEED</div>
                        </div>
                        <div style={{ width: '1px', background: '#333', height: '50px' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>NVMe</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>GEN-5 SSD</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="cta-strip" style={{ background: '#111', padding: '40px', borderTop: '1px solid #222', textAlign: 'center' }}>
                <p style={{ color: '#aaa', marginBottom: '0' }}>Need a custom dedicated cluster right now? <a href="#" onClick={handleComingSoon} style={{ color: 'var(--primary-red)', fontWeight: 600 }}>Contact Sales Team</a> for manual quote.</p>
            </div>
        </>
    );
}
