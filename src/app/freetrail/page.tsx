'use client';

import { useState } from 'react';

export default function FreeTrail() {
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/freetrail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: `Success! Your free trial request (Ref: ${result.referenceNumber}) has been submitted. A confirmation email is on its way.` });
                (event.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', message: result.error || 'An unexpected error occurred. Please try again.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Network error: Could not connect to the server. Please check your connection.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="freetrial-section reveal">
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '10px' }}>
                    Unleash Your Potential with a <br /><span style={{ background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30-Day Free VPS Trial</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.1rem' }}>
                    Start your dream project instantly on AXTCloud's premium infrastructure. High-performance, no commitment.
                </p>

                <div className="container content-wrapper" style={{ display: 'flex', gap: '40px', textAlign: 'left', marginTop: '40px' }}>
                    <div className="spec-card reveal" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', flex: 1, minWidth: '300px', alignSelf: 'flex-start' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-red)' }}>Trial Specification</h2>
                        <span className="original-price" style={{ fontSize: '0.9rem', color: '#888', textDecoration: 'line-through', display: 'block', marginTop: '5px' }}>Original Price: ₹656.00/mo</span>
                        <div className="free-price" style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, marginBottom: '10px' }}>₹0.00</div>
                        <div className="free-duration" style={{ fontSize: '1.1rem', color: 'var(--primary-red)', fontWeight: 600, marginBottom: '20px' }}>For 30 Days</div>

                        <ul className="specs-list-trial" style={{ marginBottom: '30px', listStyle: 'none' }}>
                            {[
                                { icon: "fa-microchip", text: "CPU: 1 vCore @ 5.7GHz (EPYC 4584PX)" },
                                { icon: "fa-memory", text: "RAM: 2GB DDR5 @ 5200MHz" },
                                { icon: "fa-hard-drive", text: "Storage: 20GB NVMe SSD" },
                                { icon: "fa-gauge", text: "Bandwidth: 1TB Traffic" },
                                { icon: "fa-shield-halved", text: "DDoS Protection: 1.3 Tbit/s" }
                            ].map((spec, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#ccc', fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)' }}>
                                    <i className={`fa-solid ${spec.icon}`} style={{ color: 'var(--primary-red)', width: '18px', textAlign: 'center' }}></i> {spec.text}
                                </li>
                            ))}
                        </ul>
                        <p style={{ fontStyle: 'italic', color: '#888', fontSize: '0.9rem' }}>"Build your dream project with us."</p>
                    </div>

                    <div className="trial-form-wrapper reveal" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', flex: 2 }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Request Your Free Trial</h2>
                        <form id="freeTrialForm" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" required placeholder="John Doe" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" required placeholder="name@example.com" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required placeholder="+91 98765 43210" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Preferred Server Location</label>
                                <select id="location" name="location" required defaultValue="">
                                    <option value="" disabled>Select a Location</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="USA">USA</option>
                                    <option value="Germany">Germany</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="os">Preferred Operating System</label>
                                <select id="os" name="os" required defaultValue="">
                                    <option value="" disabled>Select an Operating System</option>
                                    <optgroup label="Windows Server">
                                        <option value="Windows Server 2022">Microsoft Windows Server 2022</option>
                                        <option value="Windows Server 2019">Microsoft Windows Server 2019</option>
                                        <option value="Windows Server 2016">Microsoft Windows Server 2016</option>
                                    </optgroup>
                                    <optgroup label="Ubuntu">
                                        <option value="Ubuntu 24.04">Ubuntu 24.04 LTS (Noble Numbat)</option>
                                        <option value="Ubuntu 22.04">Ubuntu 22.04 LTS (Jammy Jellyfish)</option>
                                        <option value="Ubuntu 20.04">Ubuntu 20.04 LTS (Focal Fossa)</option>
                                    </optgroup>
                                    <optgroup label="Enterprise Linux & Others">
                                        <option value="RHEL">Red Hat Enterprise Linux (RHEL)</option>
                                        <option value="SLES">SUSE Linux Enterprise Server (SLES)</option>
                                        <option value="CentOS">CentOS Linux</option>
                                        <option value="Debian">Debian</option>
                                    </optgroup>
                                    <optgroup label="BSD">
                                        <option value="FreeBSD">FreeBSD</option>
                                        <option value="NetBSD">NetBSD</option>
                                    </optgroup>
                                    <optgroup label="macOS (Via AMIs)">
                                        <option value="macOS Sonoma">macOS Sonoma (Latest AMI)</option>
                                        <option value="macOS Ventura">macOS Ventura (version 13+)</option>
                                        <option value="macOS Monterey">macOS Monterey (version 12+)</option>
                                        <option value="macOS Big Sur">macOS Big Sur (version 11+)</option>
                                    </optgroup>
                                </select>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading} style={{ width: '100%', padding: '15px', background: 'var(--primary-red)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: '0.3s', boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)' }}>
                                {loading ? 'Processing...' : 'Start Your Free Trial'}
                            </button>

                            {status.type && (
                                <div className={`alert ${status.type} show`} style={{
                                    padding: '15px', borderRadius: '8px', marginTop: '20px', fontWeight: 500, textAlign: 'center', transition: 'opacity 0.5s ease',
                                    backgroundColor: status.type === 'success' ? '#0c4' : '#f33', color: status.type === 'success' ? '#052' : '#500'
                                }}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .freetrial-section {
                    padding: 140px 20px 80px;
                    text-align: center;
                    background: radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%);
                }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #fff; font-size: 0.95rem; }
                .form-group input, .form-group select {
                    width: 100%; padding: 12px; background: #0d0d0d; border: 1px solid #333; border-radius: 8px; color: #fff; font-size: 1rem; transition: border-color 0.3s;
                }
                .form-group input:focus, .form-group select:focus { border-color: var(--primary-red); outline: none; box-shadow: 0 0 0 1px var(--primary-red); }
                
                @media (max-width: 992px) {
                    .content-wrapper { flex-direction: column !important; }
                }
            `}</style>
        </>
    );
}
