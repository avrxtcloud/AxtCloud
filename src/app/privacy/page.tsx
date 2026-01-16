"use client";

export default function Privacy() {
    return (
        <>
            <div className="hero reveal" style={{ padding: '140px 20px 60px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1>Privacy <span className="highlight">Policy</span></h1>
                <p>Last Updated: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
            </div>

            <div className="policy-container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 20px' }}>
                <div className="policy-section reveal">
                    <h2>1. Introduction</h2>
                    <p>Welcome to AXTCloud. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how AXT TECHNOLOGYS PRIVATE LIMITED ("we", "us", or "our") collects, uses, shares, and protects your information when you use our website, hosting services, dedicated servers, and related products (collectively, the "Services").</p>
                    <p>By accessing or using our Services, you agree to the collection and use of information in accordance with this policy.</p>
                </div>

                <div className="policy-section reveal">
                    <h2>2. Information We Collect</h2>
                    <h3>2.1 Personal Information</h3>
                    <p>We collect information that you provide directly to us when you register for an account, purchase services, or contact support. This may include:</p>
                    <ul>
                        <li>Name and contact details (email address, phone number, billing address).</li>
                        <li>Government-issued identification (for verification purposes on specific services).</li>
                        <li>Payment information (processed securely by our payment gateways; we do not store full credit card numbers).</li>
                    </ul>

                    <h3>2.2 Usage and Technical Data</h3>
                    <p>When you access our Services, our servers automatically collect certain data, including:</p>
                    <ul>
                        <li>IP address, browser type, device information, and operating system.</li>
                        <li>Server logs, bandwidth usage, and connection timestamps.</li>
                        <li>Cookies and tracking technologies to enhance user experience.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>3. How We Use Your Information</h2>
                    <p>We use the collected data for the following purposes:</p>
                    <ul>
                        <li><strong>Service Delivery:</strong> To provision servers, register domains, and provide technical support.</li>
                        <li><strong>Security:</strong> To detect and prevent fraud, abuse, and DDoS attacks.</li>
                        <li><strong>Communication:</strong> To send transactional emails, billing invoices, and service updates.</li>
                        <li><strong>Compliance:</strong> To comply with legal obligations and enforce our Terms of Service.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>4. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your data, including:</p>
                    <ul>
                        <li>Encryption of data in transit (SSL/TLS) and at rest.</li>
                        <li>Strict access controls and multi-factor authentication (MFA) for our infrastructure.</li>
                        <li>Regular security audits and vulnerability scanning.</li>
                    </ul>
                    <p>While we strive to use commercially acceptable means to protect your Personal Data, no method of transmission over the Internet is 100% secure.</p>
                </div>

                <div className="policy-section reveal">
                    <h2>5. Sharing of Information</h2>
                    <p>We do not sell your personal information. We may share data only in the following circumstances:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> With trusted third-party vendors (e.g., payment processors, domain registrars) necessary to deliver our services.</li>
                        <li><strong>Legal Requirements:</strong> If required by law, valid legal process, or in response to a government request.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, sale of company assets, or acquisition.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>6. Your Rights</h2>
                    <p>Depending on your jurisdiction, you may have the following rights regarding your data:</p>
                    <ul>
                        <li>The right to access the personal data we hold about you.</li>
                        <li>The right to request correction of inaccurate data.</li>
                        <li>The right to request deletion of your account and data (Subject to data retention for legal/accounting purposes).</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, or if you wish to exercise your data rights, please contact our Legal Team:</p>

                    <div className="contact-box" style={{ background: 'linear-gradient(to right, #111, #1a0505)', padding: '30px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center', marginTop: '20px' }}>
                        <i className="fa-solid fa-envelope" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '10px' }}></i>
                        <p style={{ marginBottom: '5px', color: '#fff' }}>Legal Department</p>
                        <a href="mailto:legal@mail.goaxt.cloud" style={{ color: 'var(--primary-red)', fontWeight: 600, fontSize: '1.1rem' }}>legal@mail.goaxt.cloud</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .policy-section {
                    margin-bottom: 50px;
                    background: var(--card-bg);
                    padding: 40px;
                    border-radius: 16px;
                    border: 1px solid var(--border-color);
                    text-align: left;
                }
                .policy-section h2 {
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                    color: #fff;
                    border-left: 4px solid var(--primary-red);
                    padding-left: 15px;
                }
                .policy-section h3 {
                    font-size: 1.1rem;
                    margin: 25px 0 10px;
                    color: #ddd;
                }
                .policy-section p {
                    color: #aaa;
                    margin-bottom: 15px;
                    font-size: 0.95rem;
                }
                .policy-section ul {
                    list-style-type: disc;
                    margin-left: 20px;
                    margin-bottom: 15px;
                    color: #aaa;
                }
                .policy-section li { margin-bottom: 8px; font-size: 0.95rem; }
            `}</style>
        </>
    );
}
