"use client";

export default function AUP() {
    return (
        <>
            <div className="hero reveal" style={{ padding: '140px 20px 60px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1>Acceptable <span className="highlight">Use Policy</span></h1>
                <p>Last Updated: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
            </div>

            <div className="policy-container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 20px' }}>
                <div className="policy-section reveal">
                    <h2>1. General Policy</h2>
                    <p>This Acceptable Use Policy (AUP) governs the use of all services provided by AXT TECHNOLOGYS PRIVATE LIMITED ("AXTCloud"). By using our services, you agree to comply with this policy. The goal of this AUP is to protect our network, our customers, and the Internet community from irresponsible or illegal activity.</p>
                    <p>We reserve the right to modify this policy at any time. Violations of this AUP may result in the immediate suspension or termination of your account without refund.</p>
                </div>

                <div className="policy-section reveal">
                    <h2>2. Prohibited Content</h2>
                    <p>You may not use AXTCloud services to host, store, or distribute any of the following:</p>
                    <ul>
                        <li><strong>Illegal Content:</strong> Material that violates the laws of India or the jurisdiction where the server is located, including child pornography (CSAM), pirated software, or copyrighted material without authorization.</li>
                        <li><strong>Malicious Software:</strong> Viruses, worms, trojans, ransomware, or any software intended to damage or disrupt systems.</li>
                        <li><strong>Phishing/Fraud:</strong> Fake banking sites, ponzi schemes, or deceptive content intended to steal personal information.</li>
                        <li><strong>Terrorist Content:</strong> Material that promotes terrorism, violence, or hate speech.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>3. Network Abuse</h2>
                    <p>Any activity that disrupts, degrades, or interferes with the integrity of our network or third-party networks is strictly prohibited:</p>
                    <h3>3.1 DDoS & Attacks</h3>
                    <p>Launching Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks, or operating "booter" services/stressers, is strictly forbidden.</p>

                    <h3>3.2 Scanning & Probing</h3>
                    <p>Port scanning, vulnerability scanning, or unauthorized penetration testing of external networks is prohibited.</p>

                    <h3>3.3 IP Spoofing</h3>
                    <p>Forging IP packet headers or misrepresenting the source of network traffic.</p>
                </div>

                <div className="policy-section reveal">
                    <h2>4. Email & Spam</h2>
                    <p>AXTCloud has a zero-tolerance policy for Unsolicited Commercial Email (SPAM):</p>
                    <ul>
                        <li>Sending bulk emails to recipients who have not explicitly opted in is prohibited.</li>
                        <li>Hosting "spamvertised" websites is prohibited.</li>
                        <li>Operating open mail relays or unauthenticated SMTP services is prohibited.</li>
                    </ul>
                    <p>If your IP is listed on a major blocklist (e.g., Spamhaus) due to your activity, your service may be suspended immediately.</p>
                </div>

                <div className="policy-section reveal">
                    <h2>5. Resource Usage (Fair Use)</h2>
                    <p>For shared hosting and cloud environments, users must not monopolize system resources:</p>
                    <ul>
                        <li><strong>CPU/RAM:</strong> Utilizing 100% of allocated CPU resources for extended periods (e.g., cryptocurrency mining) is not permitted on shared/VPS plans unless specified.</li>
                        <li><strong>Disk I/O:</strong> Excessive disk read/write operations that degrade performance for other users are prohibited.</li>
                        <li><strong>Disk Usage:</strong> Storing backups or media files on shared hosting plans where it impacts server performance.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>6. Security Violations</h2>
                    <p>You are responsible for the security of your account and servers. You must not:</p>
                    <ul>
                        <li>Attempt to bypass authentication or security measures of any system.</li>
                        <li>Use weak passwords that compromise the integrity of the server.</li>
                        <li>Host open proxies or anonymous VPNs that facilitate illegal activity.</li>
                    </ul>
                </div>

                <div className="policy-section reveal">
                    <h2>7. Reporting Abuse</h2>
                    <p>If you witness a violation of this policy or wish to report abuse originating from an AXTCloud IP address, please contact our Legal & Abuse Department immediately with relevant logs and evidence.</p>

                    <div className="contact-box" style={{ background: 'linear-gradient(to right, #111, #1a0505)', padding: '30px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center', marginTop: '20px' }}>
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '10px' }}></i>
                        <p style={{ marginBottom: '5px', color: '#fff' }}>Report Abuse</p>
                        <a href="mailto:legal@mail.axt.co.in" style={{ color: 'var(--primary-red)', fontWeight: 600, fontSize: '1.1rem' }}>legal@mail.axt.co.in</a>
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
