"use client";

import { useState } from 'react';
import Link from 'next/link';
import ComingSoonModal from '@/components/ui/ComingSoonModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="hero">
        <div className="reveal">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '20px',
            background: 'linear-gradient(to right, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AXTCloud<br /><span style={{
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Your Cloud Partner</span>
          </h1>
          <p className="subtitle" style={{
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '700px',
            margin: '0 auto 40px',
          }}>Elevate your applications with premium cloud infrastructure. Unmatched performance, elegant scaling, and white-glove support.</p>
          <div style={{ marginTop: '30px' }}>
            <Link href="/deploy" className="cta-btn" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Deploy VPS</Link>
            <Link href="/signup" className="cta-btn" style={{ background: 'transparent', border: '1px solid #333', color: '#fff', marginLeft: '10px' }}>Register Now</Link>
          </div>
        </div>

        <div className="stats-grid reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginTop: '60px',
          width: '100%',
          maxWidth: '1100px',
          padding: '0 10px',
        }}>
          {[
            { val: "99.9%", label: "Uptime Guarantee" },
            { val: "24/7", label: "Customer Support" },
            { val: "Unlimited", label: "Bandwidth" },
            { val: "Daily", label: "Auto Backups" },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-val" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-red)', display: 'block', marginBottom: '5px' }}>{stat.val}</span>
              <span className="stat-label" style={{ fontSize: '0.85rem', color: '#888' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="section-header reveal">
          <h2>Our Core <span className="highlight">Services</span></h2>
          <p>Choose the perfect environment for your workload.</p>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {[
            { href: "/vps-hosting", icon: "fa-server", title: "VPS Hosting", desc: "High-performance Virtual Private Servers. Available in Windows & Ubuntu. Isolated resources with guaranteed speed." },
            { href: "/dedicated-servers", icon: "fa-microchip", title: "Dedicated Server", desc: "Full metal power. Get exclusive access to hardware resources without virtualization overhead." },
            { href: "/minecraft-hosting", icon: "fa-cube", title: "Minecraft", desc: "Premium low-latency servers in Mumbai. Support for Java, Bedrock, and Modpacks." },
            { href: "/fivem-hosting", icon: "fa-car", title: "FiveM Hosting", desc: "Lag-free GTA V Roleplay hosting. TxAdmin included with DDoS protection for game ports." },
            { href: "/database-hosting", icon: "fa-database", title: "Managed DB", desc: "Production-ready PostgreSQL, MySQL, and Valkey hosting with automatic failover." },
            { href: "/discordbot-hosting", icon: "fa-discord", title: "Bot Hosting", desc: "Keep your Discord bots online 24/7. Supports Node.js, Python, Java, and Go." },
          ].map((service, i) => (
            <Link key={i} href={service.href} className="card reveal">
              <i className={`fa-solid ${service.icon}`} style={{ fontSize: '2.5rem', color: 'var(--primary-red)', marginBottom: '20px' }}></i>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flexGrow: 1, marginBottom: '20px' }}>{service.desc}</p>
              <div className="card-link" style={{ fontWeight: 600, marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>View Plans <i className="fa-solid fa-arrow-right"></i></div>
            </Link>
          ))}
        </div>
      </section>

      <div className="os-section" id="os" style={{ background: '#0a0a0a', width: '100%', padding: '80px 20px' }}>
        <div className="os-container reveal" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '15px' }}>Popular Operating Systems.<br /><span className="highlight">Your Choice.</span></h2>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Deploy instantly or upload your own custom ISO.</p>

          <div className="os-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '40px' }}>
            {['Windows', 'Ubuntu', 'Debian', 'CentOS', 'Fedora', 'AlmaLinux'].map((os, i) => (
              <div key={i} className="os-pill">
                <i className={`fa-brands fa-${os.toLowerCase() === 'almalinux' ? 'ghost' : os.toLowerCase()}`}></i> {os}
              </div>
            ))}
            <div className="os-pill" style={{ borderColor: '#fff', color: '#fff' }}><i className="fa-solid fa-upload"></i> Custom ISO</div>
          </div>
        </div>
      </div>

      <div className="cta-section" style={{ textAlign: 'center', background: 'linear-gradient(to bottom, var(--dark-bg), #150000)', padding: '100px 20px', borderTop: '1px solid #222' }}>
        <div className="cta-box reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '15px' }}>Ready to Experience <span className="highlight">Enterprise Performance?</span></h2>
          <p style={{ color: '#ccc', margin: '20px 0' }}>Deploy your server today and unlock the full potential of your applications.</p>
          <a href="#" onClick={handleComingSoon} className="cta-btn" style={{ fontSize: '1.2rem', padding: '18px 40px' }}>Contact Sales Team</a>
          <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>Coming Soon</p>
        </div>
      </div>
    </>
  );
}
