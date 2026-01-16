import Link from 'next/link';

export default function About() {
    return (
        <>
            <div className="page-hero reveal" style={{ padding: '140px 20px 80px', textAlign: 'center', background: 'radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 60%)', borderBottom: '1px solid var(--border-color)' }}>
                <h1>Our <span>Story</span></h1>
                <p>Building the future of cloud infrastructure with precision, power, and reliability.</p>
            </div>

            <div className="stats-banner reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
                {[
                    { num: "150+", desc: "Active Customers" },
                    { num: "6", desc: "Global Locations" },
                    { num: "99.99%", desc: "Uptime SLA" },
                    { num: "24/7", desc: "Expert Support" },
                ].map((stat, i) => (
                    <div key={i} className="stat-card" style={{ background: '#111', border: '1px solid #222', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                        <span className="stat-num" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-red)', display: 'block' }}>{stat.num}</span>
                        <span className="stat-desc" style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>{stat.desc}</span>
                    </div>
                ))}
            </div>

            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="mission-box reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                    <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>Our <span>Mission</span></h2>
                    <p className="mission-text" style={{ fontSize: '1.3rem', fontWeight: 500, color: '#ddd', lineHeight: 1.6, marginBottom: '20px' }}>"To provide enterprise-grade cloud infrastructure that empowers businesses to innovate and scale without limitations."</p>
                </div>

                <div className="values-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {[
                        { title: "Unmatched Performance", desc: "State-of-the-art hardware and optimized infrastructure for maximum speed and reliability." },
                        { title: "Enterprise Security", desc: "Multi-layered security approach with advanced DDoS protection and automated daily backups." },
                        { title: "Latest Gen Hardware", desc: "Powered by AMD RYZEN™ 9 and AMD EPYC™ 9004 Series processors with DDR5 memory." },
                        { title: "24/7 Expert Support", desc: "Dedicated team of cloud experts available round the clock to assist you with any technical needs." },
                    ].map((val, i) => (
                        <div key={i} className="value-item" style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '16px', borderLeft: '4px solid var(--primary-red)' }}>
                            <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{val.title}</h3>
                            <p style={{ color: '#999', fontSize: '0.95rem' }}>{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="reveal" style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="leader-section" style={{ background: 'linear-gradient(to right, #0a0a0a, #0f0f0f)', borderRadius: '20px', margin: '80px auto', padding: '60px 40px', textAlign: 'center', border: '1px solid #222' }}>
                    <div className="leader-avatar" style={{ width: '100px', height: '100px', background: '#222', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'var(--primary-red)', border: '2px solid var(--primary-red)' }}><i className="fa-solid fa-user-tie"></i></div>
                    <h2 style={{ fontSize: '1.2rem', color: '#888', marginBottom: '15px' }}>Meet the person behind AXTCloud success</h2>
                    <div className="leader-name" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '5px' }}>Irfana C</div>
                    <div className="leader-role" style={{ color: 'var(--primary-red)', fontWeight: 600, marginBottom: '15px', letterSpacing: '1px' }}>Founder & Leadership</div>
                    <div className="leader-company" style={{ color: '#777', fontSize: '0.9rem', textTransform: 'uppercase' }}>AXT TECHNOLOGYS PRIVATE LIMITED</div>
                </div>
            </section >

            <section className="reveal" style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>Our Global <span>Network</span></h2>
                <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '30px' }}>Strategically positioned infrastructure across multiple continents.</p>

                <div className="network-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    {[
                        { name: "India", type: "Primary Data Center", primary: true },
                        { name: "Singapore", type: "Secondary Location" },
                        { name: "Germany", type: "Secondary Location" },
                        { name: "Luxembourg", type: "Secondary Location" },
                        { name: "United States", type: "Secondary Location" },
                        { name: "United Kingdom", type: "Secondary Location" },
                    ].map((loc, i) => (
                        <div key={i} className={`loc-card ${loc.primary ? 'primary' : ''}`} style={{ background: '#111', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #222', borderTop: loc.primary ? '1px solid #ff3333' : '1px solid #222' }}>
                            <div className="loc-icon" style={{ fontSize: '1.5rem', color: 'var(--primary-red)', marginBottom: '10px' }}><i className={`fa-solid ${loc.primary ? 'fa-server' : 'fa-network-wired'}`}></i></div>
                            <div className="loc-name" style={{ fontWeight: 600, color: '#fff', marginBottom: '5px' }}>{loc.name}</div>
                            <div className="loc-type" style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>{loc.type}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="hq-section reveal" style={{ textAlign: 'center', marginTop: '60px', padding: '80px 5%', borderTop: '1px solid #222' }}>
                <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>Corporate <span>Locations</span></h2>

                {[
                    { title: "Headquarters (Bengaluru)", name: "AXT TECHNOLOGYS PVT LTD", address: "Unit 14B, World Trade Center, BRIGADE GATEWAY, Dr Rajkumar Rd, Campus Malleshwaram, Bengaluru, Karnataka 560055", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.892694770289!2d77.56708787595604!3d12.983995814041123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae163c46e29789%3A0xf6938a9f390074d!2sBrigade%20Gateway!5e0!3m2!1sen!2sin!4v1701389734135!5m2!1sen!2sin" },
                    { title: "Branch Office (Chennai)", name: "AXT TECHNOLOGYS PVT LTD", address: "Futura Tech Park, Tower B 5th Floor, Suite #502 127, Rajiv Gandhi Salai (OMR) Chennai, Tamilnadu 600119", map: "https://maps.google.com/maps?width=600&height=400&hl=en&q=Futura Tech Park Chennai &t=&z=14&ie=UTF8&iwloc=B&output=embed" },
                    { title: "Cloud Core Facility (Kannur)", name: "AXT TECHNOLOGYS PVT LTD - AxtCloud Data Center (KNR)", address: "Unit 3, Kannur Industrial Park, Kannur Cloud Core Facility (KCF, Mattanur - Irikkur Rd, near Kannur International Airport CNN, Valiyavelicham, Kannur, Kerala 670702", map: "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Unit%203,%20AXT%20TECHNOLOGYS%20PVT%20LTD%20-%20AxtCloud%20Data%20Center%20(KNR),%20Kannur%20Industrial%20Park,%20Kannur%20Cloud%20Core%20Facility%20(KCF,%20Mattanur%20-%20Irikkur%20Rd,%20near%20Kannur%20International%20Airport%20CNN,%20Valiyavelicham,%20Kannur,%20Kerala%20670702+(Unit%203,%20AXT%20TECHNOLOGYS%20PVT%20LTD%20-%20AxtCloud%20Data%20Center%20(KNR))&t=&z=14&ie=UTF8&iwloc=B&output=embed" },
                ].map((hq, i) => (
                    <div key={i} className="location-group reveal" style={{ marginBottom: '60px', paddingBottom: '30px', borderBottom: i === 2 ? 'none' : '1px solid #1a1a1a' }}>
                        <address style={{ color: '#aaa', marginTop: '20px', fontStyle: 'normal', lineHeight: 1.8 }}>
                            <strong style={{ color: 'var(--primary-red)' }}>{hq.title}</strong><br />
                            <strong>{hq.name}</strong><br />
                            {hq.address}
                        </address>

                        <div className="map-container" style={{ marginTop: '40px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 5px 20px rgba(0,0,0,0.5)', height: '350px' }}>
                            <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src={hq.map} loading="lazy" allowFullScreen></iframe>
                        </div>
                    </div>
                ))}

                <div className="contact-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px 20px', marginTop: '40px', paddingTop: '30px', borderTop: '1px dashed #222' }}>
                    {[
                        { label: "Sales Inquiries", val: "sales@axt.co.in" },
                        { label: "Technical Support", val: "help@axt.co.in", highlight: true },
                        { label: "Bengaluru Office", val: "blr@axt.co.in" },
                        { label: "Chennai Office", val: "maa@axt.co.in" },
                        { label: "Kannur Data Center", val: "can@axt.co.in" },
                    ].map((item, i) => (
                        <div key={i} className="contact-item" style={{ minWidth: '250px' }}>
                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</span>
                            <a href={`mailto:${item.val}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: item.highlight ? 'var(--primary-red)' : '#fff' }}>{item.val}</a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
