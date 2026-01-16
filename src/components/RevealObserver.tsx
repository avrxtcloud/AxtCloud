'use client';

import { useEffect } from 'react';

export default function RevealObserver() {
    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });

        const updateElements = () => {
            document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
        };

        updateElements();

        // Optional: Re-observe if the DOM changes
        const mutationObserver = new MutationObserver(updateElements);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            revealObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return null;
}
