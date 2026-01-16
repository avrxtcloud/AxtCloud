"use client";

import { useState } from 'react';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function MinecraftHosting() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="hero reveal" style={{ padding: '140px 20px 80px', textAlign: 'center', background: 'radial-gradient(circle at top, #0a1a0a 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 700, marginBottom: '15px', lineHeight: 1.1 }}>Premium <span style={{ background: 'linear-gradient(135deg, #42b836 0%, #238c18 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Minecraft Hosting</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 40px', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>We are currently upgrading our Mumbai game-node clusters. Minecraft hosting services will resume shortly with even lower latency and higher performance.</p>

                <div className="status-indicator" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(66, 184, 54, 0.1)', padding: '8px 20px', borderRadius: '50px', border: '1px solid #42b836', color: '#42b836', fontWeight: 600, fontSize: '0.9rem' }}>
                    <span className="dot" style={{ width: '8px', height: '8px', background: '#42b836', borderRadius: '50%', boxShadow: '0 0 10px #42b836' }}></span> Migration in Progress
                </div>

                <div className="hero-btns" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '50px 0', flexWrap: 'wrap' }}>
                    <a href="#" onClick={handleComingSoon} className="cta-btn" style={{ background: '#42b836' }}>Notify Me on Launch</a>
                    <a href="#" onClick={handleComingSoon} className="hero-btn-sec">View Specs</a>
                </div>

                <div className="ping-section" style={{ maxWidth: '800px', margin: '0 auto 80px', background: '#0f0f0f', padding: '30px', borderRadius: '12px', border: '1px solid #222' }}>
                    <div className="ping-title" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 600, color: '#fff' }}>Target Latency (Mumbai Nodes)</div>
                    {[
                        { label: "AXT Mumbai", val: "15ms", width: "10%", color: "#42b836" },
                        { label: "Europe Host", val: "140ms", width: "60%", color: "#d4aa00" },
                        { label: "USA Host", val: "250ms", width: "90%", color: "#d43600" },
                    ].map((row, i) => (
                        <div key={i} className="ping-row" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', fontSize: '0.9rem' }}>
                            <div className="ping-label" style={{ width: '100px', textAlign: 'right', color: '#888' }}>{row.label}</div>
                            <div className="ping-bar-container" style={{ flexGrow: 1, background: '#222', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div className="ping-bar" style={{ height: '100%', borderRadius: '4px', width: row.width, background: row.color }}></div>
                            </div>
                            <div className="ping-value" style={{ width: '60px', color: '#fff', fontWeight: 600, fontFamily: 'Fira Code, monospace' }}>{row.val}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hero-btn-sec { padding: 12px 30px; border: 1px solid #333; border-radius: 8px; font-weight: 600; color: #fff; transition: 0.3s; }
                .hero-btn-sec:hover { background: #111; border-color: #fff; }
                .dot { animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
            `}</style>
        </>
    );
}
