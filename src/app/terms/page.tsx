"use client";

export default function Terms() {
    return (
        <>
            <div className="hero reveal" style={{ padding: '140px 20px 60px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1>Terms of <span className="highlight">Service</span></h1>
                <p>Last Updated: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
            </div>

            <div className="terms-container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 20px' }}>
                <div className="terms-section reveal">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the services provided by AXT TECHNOLOGYS PRIVATE LIMITED ("AXTCloud", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>2. Account Registration</h2>
                    <p>To access our services, you must create an account. You agree to provide accurate, current, and complete information during the registration process.</p>
                    <ul>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You are solely responsible for all activities that occur under your account.</li>
                        <li>AXTCloud reserves the right to suspend or terminate accounts that provide false information or violate these terms.</li>
                    </ul>
                </div>

                <div className="terms-section reveal">
                    <h2>3. Acceptable Use Policy (AUP)</h2>
                    <p>You agree not to use our services for any unlawful or prohibited activities, including but not limited to:</p>
                    <ul>
                        <li>Hosting content that infringes upon intellectual property rights.</li>
                        <li>Distributing malware, viruses, or engaging in phishing activities.</li>
                        <li>Sending unsolicited bulk email (SPAM).</li>
                        <li>Launching DDoS attacks or network scanning.</li>
                        <li>Hosting illegal content under Indian law or the laws of the jurisdiction where the server is located.</li>
                    </ul>
                    <p>Violation of this policy may result in immediate termination of services without refund.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>4. Payments and Billing</h2>
                    <h3>4.1 Subscriptions</h3>
                    <p>Services are billed on a recurring basis (Monthly, Annually, or Triennially) as selected during purchase. Invoices are generated 7 days prior to the due date.</p>

                    <h3>4.2 Refunds</h3>
                    <p>We offer a <strong>30-Day Money-Back Guarantee</strong> for Web Hosting and Cloud Hosting plans. This guarantee does not apply to Dedicated Servers, Domain Registrations, or Software Licenses, which are non-refundable.</p>

                    <h3>4.3 Cancellations</h3>
                    <p>You may cancel your service at any time via the client portal. Cancellations must be requested at least 24 hours before the next renewal date.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>5. Service Level Agreement (SLA)</h2>
                    <p>We guarantee a 99.9% network uptime. If we fail to meet this guarantee, you may be eligible for service credits calculated as a percentage of your monthly fee.</p>
                    <p>This SLA excludes scheduled maintenance, force majeure events, or issues caused by client configuration errors.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>6. Limitation of Liability</h2>
                    <p>In no event shall AXTCloud, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the services.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>7. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka.</p>
                </div>

                <div className="terms-section reveal">
                    <h2>8. Contact Information</h2>
                    <p>For legal inquiries regarding these Terms of Service, please contact our Legal Department:</p>

                    <div className="contact-box" style={{ background: 'linear-gradient(to right, #111, #1a0505)', padding: '30px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center', marginTop: '20px' }}>
                        <i className="fa-solid fa-scale-balanced" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '10px' }}></i>
                        <p style={{ marginBottom: '5px', color: '#fff' }}>Legal Department</p>
                        <a href="mailto:legal@mail.goaxt.cloud" style={{ color: 'var(--primary-red)', fontWeight: 600, fontSize: '1.1rem' }}>legal@mail.goaxt.cloud</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .terms-section {
                    margin-bottom: 50px;
                    background: var(--card-bg);
                    padding: 40px;
                    border-radius: 16px;
                    border: 1px solid var(--border-color);
                    text-align: left;
                }
                .terms-section h2 {
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                    color: #fff;
                    border-left: 4px solid var(--primary-red);
                    padding-left: 15px;
                }
                .terms-section h3 { font-size: 1.1rem; margin: 25px 0 10px; color: #ddd; }
                .terms-section p { color: #aaa; margin-bottom: 15px; font-size: 0.95rem; }
                .terms-section ul { list-style-type: disc; margin-left: 20px; margin-bottom: 15px; color: #aaa; }
                .terms-section li { margin-bottom: 8px; font-size: 0.95rem; }
            `}</style>
        </>
    );
}
