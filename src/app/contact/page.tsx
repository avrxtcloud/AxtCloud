"use client";

import { useState } from 'react';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="hero reveal" style={{ padding: '140px 20px 80px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '15px', lineHeight: 1.1 }}>Get in <span className="highlight">Touch</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Our team is upgrading our support infrastructure to provide unified dashboard ticketing. Standby for the new portal.</p>
            </div>

            <div className="contact-section reveal" style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <div className="contact-card">
                    <div className="icon-box"><i className="fa-solid fa-envelope"></i></div>
                    <h3>Support Portal</h3>
                    <div className="contact-info">
                        <p>Our ticketing system is currently being integrated into the user dashboard.</p>
                        <br />
                        <a href="#" onClick={handleComingSoon} style={{ fontSize: '1.2rem' }}>Coming Soon</a>
                    </div>
                </div>

                <div className="contact-card">
                    <div className="icon-box"><i className="fa-solid fa-location-dot"></i></div>
                    <h3>Corporate Office</h3>
                    <div className="contact-info">
                        <strong>AXTCloud - GOAXT.CLOUD</strong><br />
                        Premium Cloud Infrastructure<br />
                        Global Operations Center<br />
                        Sales: sales@goaxt.cloud
                    </div>
                </div>

                <div className="contact-card">
                    <div className="icon-box"><i className="fa-solid fa-clock"></i></div>
                    <h3>Status</h3>
                    <div className="hours-list">
                        <div>Portal Migration <span>In Progress</span></div>
                        <div>Cloud Cluster <span>Operational</span></div>
                        <div>Direct Support <span>Coming Soon</span></div>
                        <br />
                        <div style={{ border: 'none', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                            <i className="fa-solid fa-circle-check" style={{ marginRight: '5px' }}></i> Helpdesk migration active
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    padding: 40px 30px;
                    border-radius: 16px;
                    text-align: center;
                    transition: 0.3s;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .contact-card:hover { border-color: var(--primary-red); transform: translateY(-5px); }
                .icon-box {
                    width: 70px; height: 70px;
                    background: rgba(255,0,0,0.1);
                    color: var(--primary-red);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.8rem;
                    margin-bottom: 25px;
                }
                .contact-card h3 { font-size: 1.3rem; margin-bottom: 15px; color: #fff; }
                .contact-info { color: #ccc; font-size: 1rem; line-height: 1.8; }
                .contact-info a { color: #fff; font-weight: 600; border-bottom: 1px dotted #666; transition: 0.3s; }
                .contact-info a:hover { color: var(--primary-red); border-color: var(--primary-red); }
                .hours-list { width: 100%; margin-top: 10px; text-align: left; }
                .hours-list div { display: flex; justify-content: space-between; border-bottom: 1px solid #222; padding: 8px 0; font-size: 0.9rem; color: #aaa; }
                .hours-list div:last-child { border-bottom: none; }
                .hours-list span { color: #fff; font-weight: 500; }
            `}</style>
        </>
    );
}
