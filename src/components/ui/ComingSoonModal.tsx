"use client";

import { useState, useEffect } from 'react';

export default function ComingSoonModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content reveal active" onClick={e => e.stopPropagation()}>
                <i className="fa-solid fa-rocket" style={{ fontSize: '3rem', color: 'var(--primary-red)', marginBottom: '20px' }}></i>
                <h2>Coming <span>Soon</span></h2>
                <p>We're currently upgrading this service to high-performance AWS infrastructure. This feature will be available shortly.</p>
                <button className="cta-btn" onClick={onClose} style={{ marginTop: '20px', width: '100%' }}>Got it</button>
            </div>
            <style jsx>{`
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 9999; padding: 20px;
                }
                .modal-content {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    padding: 40px;
                    border-radius: 20px;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                h2 { font-size: 2rem; margin-bottom: 15px; }
                h2 span { color: var(--primary-red); }
                p { color: var(--text-muted); line-height: 1.6; }
            `}</style>
        </div>
    );
}
