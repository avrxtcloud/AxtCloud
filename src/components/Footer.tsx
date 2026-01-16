'use client';

import { useState } from 'react';
import Link from 'next/link';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleComingSoon = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <footer>
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="69206b7a2a6043b23f4dfbb5" data-style-height="52px" data-style-width="100%" data-token="18287e79-0319-4355-92cc-3b2b74f9821f">
                <a href="https://www.trustpilot.com/review/goaxt.cloud" target="_blank" rel="noopener">Trustpilot</a>
            </div>
            <div style={{ marginBottom: '40px' }}></div>

            <div className="footer-container">
                <div className="footer-brand">
                    <div className="brand" style={{ filter: 'grayscale(100%)', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 700 }}>
                        <img src="https://cdn.axt.co.in/logo.jpg" alt="AXT Logo" width="30" />
                        <div>AXT<span style={{ color: 'var(--primary-red)' }}>Cloud</span></div>
                    </div>
                    <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>AXT TECHNOLOGYS PVT LTD provides premium cloud infrastructure, dedicated servers, and advanced security solutions.</p>
                </div>

                <div className="footer-col">
                    <h4>Products</h4>
                    <ul>
                        <li><Link href="/vps-hosting">Cloud VPS</Link></li>
                        <li><Link href="/dedicated-servers">Dedicated Servers</Link></li>
                        <li><Link href="/minecraft-hosting">Minecraft Hosting</Link></li>
                        <li><a href="#" onClick={handleComingSoon}>FiveM Hosting</a></li>
                        <li><a href="#" onClick={handleComingSoon}>Managed Database</a></li>
                        <li><a href="#" onClick={handleComingSoon}>Bot Hosting</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#" onClick={handleComingSoon}>Email Hosting</a></li>
                        <li><a href="#" onClick={handleComingSoon}>Dedicated IP</a></li>
                        <li><a href="#" onClick={handleComingSoon}>OpenVPN Server</a></li>
                        <li><Link href="/info/our-infrastructure">Infrastructure</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><a href="#" onClick={handleComingSoon}>Sales Team</a></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="copyright-bar">
                <p>© {currentYear} AXT TECHNOLOGYS PVT LTD. All Rights Reserved.</p>
                <p style={{ color: '#444', marginTop: '5px' }}>Unit 14B, World Trade Center, Brigade Gateway Campus, Bengaluru – 560055</p>
            </div>
        </footer>
    );
}
