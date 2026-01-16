"use client";

import Link from 'next/link';

export default function Infrastructure() {
    return (
        <>
            <div className="hero reveal" style={{ padding: '160px 20px 100px', textAlign: 'center', background: 'radial-gradient(circle at top, #111 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>World-Class Power.<br /><span className="highlight">Managed by AXT.</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 40px', fontSize: 'clamp(1.1rem, 2vw, 1.2rem)' }}>We don't build datacenters. We rent the best hardware in the world and optimize it for you. Transparency is our policy.</p>

                <div className="hero-btns" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
                    <a href="#partners" className="cta-btn">Our Partners</a>
                    <a href="#locations" className="hero-btn-sec">Locations</a>
                </div>
            </div>

            <section id="partners" className="partner-section reveal" style={{ padding: '100px 20px', background: '#080808' }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>Powered by <span className="highlight">Giants</span></h2>
                    <p style={{ color: '#888' }}>We leverage industry leaders to ensure your uptime.</p>
                </div>

                <div className="partner-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="partner-card ovh-card" style={{ background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222', borderTop: '4px solid #122348' }}>
                        <div className="partner-logo ovh-text" style={{ fontSize: '2.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 700 }}>
                            <i className="fa-solid fa-server"></i> OVHcloud
                        </div>
                        <p style={{ color: '#999', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>We utilize OVHcloud's global bare metal infrastructure for our Compute layer. This gives us access to liquid-cooled data centers, Anti-DDoS Game protection, and massive scalability.</p>
                        <div className="badge-list">
                            {["Anti-DDoS Game", "120Tbps Network", "ISO 27001 Certified"].map((b, i) => (
                                <span key={i} style={{ display: 'inline-block', background: '#1a1a1a', padding: '5px 12px', borderRadius: '4px', fontSize: '0.8rem', color: '#ccc', marginRight: '8px', marginBottom: '8px', border: '1px solid #333' }}><i className="fa-solid fa-check"></i> {b}</span>
                            ))}
                        </div>
                    </div>

                    <div className="partner-card cf-card" style={{ background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222', borderTop: '4px solid var(--cf-orange)' }}>
                        <div className="partner-logo cf-text" style={{ fontSize: '2.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 700 }}>
                            <i className="fa-brands fa-cloudflare"></i> Cloudflare
                        </div>
                        <p style={{ color: '#999', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>Our network edge is secured by Cloudflare. From DNS management to Web Application Firewalls (WAF), we ensure your data is cached globally and protected from L7 attacks.</p>
                        <div className="badge-list">
                            {["Global CDN", "Anycast DNS", "WAF Protection"].map((b, i) => (
                                <span key={i} style={{ display: 'inline-block', background: '#1a1a1a', padding: '5px 12px', borderRadius: '4px', fontSize: '0.8rem', color: '#ccc', marginRight: '8px', marginBottom: '8px', border: '1px solid #333' }}><i className="fa-solid fa-check"></i> {b}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="transparency-section reveal" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <div className="transparency-box" style={{ background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)', border: '1px solid #333', borderRadius: '20px', padding: '50px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}><i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-red)' }}></i> Dedicated Racks</h2>
                    <p style={{ color: '#999', fontSize: '1.1rem', marginBottom: '30px' }}>AXTCloud does not own the physical building. Instead, we lease <strong>Enterprise Racks</strong> and Dedicated Bare Metal servers within these partner facilities.</p>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>This allows us to focus on what we do best: <strong>Support, Software Optimization, and Managed Services</strong>, while leaving the power and cooling to the experts.</p>

                    <div className="racks-info" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
                        {[
                            { icon: "fa-microchip", label: "Hardware", val: "AMD Ryzen™ 9" },
                            { icon: "fa-memory", label: "Memory", val: "DDR4 / DDR5 ECC" },
                            { icon: "fa-hard-drive", label: "Storage", val: "NVMe Gen4" },
                            { icon: "fa-network-wired", label: "Uplink", val: "1Gbps - 10Gbps" },
                        ].map((stat, i) => (
                            <div key={i} className="rack-stat" style={{ textAlign: 'left', display: 'flex', gap: '15px', alignItems: 'center', background: '#161616', padding: '15px 25px', borderRadius: '8px' }}>
                                <i className={`fa-solid ${stat.icon}`} style={{ fontSize: '1.5rem', color: 'var(--primary-red)' }}></i>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>{stat.label}</span>
                                    <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{stat.val}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="locations" className="map-section reveal" style={{ padding: '80px 20px', borderTop: '1px solid #222', background: '#0a0a0a' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>Global <span className="highlight">Locations</span></h2>
                    <p style={{ color: '#888' }}>Strategic deployment zones for low latency.</p>
                </div>

                <div className="loc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '50px auto 0' }}>
                    {[
                        { title: "Mumbai, India", desc: "Optimized for Indian Subcontinent gaming and latency-sensitive apps." },
                        { title: "Frankfurt, Germany", desc: "Central European hub offering excellent connectivity to the entire EU region." },
                        { title: "Virginia, USA", desc: "East Coast deployment perfect for North American coverage." },
                        { title: "Singapore", desc: "Gateway to Southeast Asia with high-speed routing to China and Australia." },
                    ].map((loc, i) => (
                        <div key={i} className="loc-card" style={{ textAlign: 'center', padding: '30px', background: '#111', borderRadius: '12px', border: '1px solid #222' }}>
                            <i className="fa-solid fa-location-dot" style={{ fontSize: '2rem', color: '#fff', marginBottom: '15px' }}></i>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{loc.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{loc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="prod-summary reveal" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', color: '#fff' }}>Services built on <span className="highlight">This Foundation</span></h2>
                </div>

                <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    {[
                        { href: "/vps-hosting", icon: "fa-cloud", label: "Cloud VPS" },
                        { href: "/dedicated-servers", icon: "fa-server", label: "Dedicated Servers" },
                        { href: "/minecraft-hosting", icon: "fa-cube", label: "Minecraft Hosting" },
                        { href: "/fivem-hosting", icon: "fa-car", label: "FiveM Hosting" },
                        { href: "/discordbot-hosting", icon: "fa-discord", label: "Bot Hosting" },
                        { href: "/database-hosting", icon: "fa-database", label: "Managed DB" },
                    ].map((prod, i) => (
                        <div key={i} className="prod-item" style={{ background: '#111', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #222', transition: '0.3s' }}>
                            <Link href={prod.href} style={{ fontWeight: 600, color: '#fff', display: 'block', width: '100%', height: '100%' }}>
                                <i className={`fa-solid ${prod.icon.startsWith('fa-') ? prod.icon : 'fa-brands ' + prod.icon}`}></i><br />{prod.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                .hero-btn-sec { padding: 12px 30px; border: 1px solid #333; border-radius: 8px; font-weight: 600; color: #fff; }
                .hero-btn-sec:hover { background: #111; border-color: #fff; }
                .partner-logo.cf-text { color: var(--cf-orange) !important; }
                .partner-logo.ovh-text { color: #122348 !important; }
            `}</style>
        </>
    );
}
