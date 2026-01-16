'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const navLinks = [
        { href: '/vps-hosting', label: 'VPS' },
        { href: '/dedicated-servers', label: 'Dedicated' },
        { href: '/minecraft-hosting', label: 'Minecraft' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <div
                className={`overlay ${isMenuOpen ? 'active' : ''}`}
                id="overlay"
                onClick={closeMenu}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.7)', zIndex: 1000,
                    display: isMenuOpen ? 'block' : 'none',
                    opacity: isMenuOpen ? 1 : 0, transition: '0.3s'
                }}
            ></div >

            <header style={{
                position: 'fixed', top: 0, width: '100%', height: 'var(--header-height)',
                padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                zIndex: 1000, borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <Link href="/" className="brand" style={{
                    fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1002
                }}>
                    <img src="https://cdn.axt.co.in/logo.jpg" alt="AXT Logo" width="40" height="40" style={{ borderRadius: '6px' }} />
                    <div style={{ color: 'var(--text-white)' }}>AXT<span style={{ color: 'var(--primary-red)' }}>Cloud</span></div>
                </Link>

                <div
                    className="mobile-toggle"
                    id="mobileToggle"
                    aria-label="Toggle Menu"
                    onClick={toggleMenu}
                    style={{
                        display: 'none', fontSize: '1.5rem', color: '#fff', cursor: 'pointer', zIndex: 1002
                    }}
                >
                    <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </div>

                <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks" style={{
                    display: 'flex', gap: '30px', alignItems: 'center'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            style={{
                                fontSize: '0.95rem',
                                color: pathname.startsWith(link.href) ? 'var(--primary-red)' : '#ccc',
                                fontWeight: 500,
                                position: 'relative',
                                transition: '0.3s'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/signup" className="cta-btn" style={{
                        background: 'transparent', padding: '10px 24px', borderRadius: '8px',
                        fontWeight: 600, color: 'white', border: '1px solid #333',
                        display: 'inline-block', cursor: 'pointer', transition: '0.3s'
                    }}>
                        Sign Up
                    </Link>
                    <a href="mailto:sales@mail.axt.co.in" className="cta-btn" style={{
                        background: 'var(--primary-red)', padding: '10px 24px', borderRadius: '8px',
                        fontWeight: 600, color: 'white', boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
                        display: 'inline-block', border: 'none', cursor: 'pointer'
                    }}>
                        Contact Sales
                    </a>
                </nav>

                <style jsx>{`
                    @media (max-width: 992px) {
                        .mobile-toggle { display: block !important; }
                        .nav-links {
                            position: fixed;
                            top: 0;
                            right: -100%; 
                            height: 100vh;
                            width: 75%;
                            max-width: 300px;
                            background: #111;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: 40px;
                            transition: 0.4s ease;
                            z-index: 1001;
                            box-shadow: -5px 0 15px rgba(0,0,0,0.5);
                        }
                        .nav-links.active { right: 0; }
                        .nav-links a { font-size: 1.2rem; color: #fff; }
                    }
                `}</style>
            </header>
        </>
    );
}
