(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();

(function () {
    const counters = document.querySelectorAll('.stat-num');
    let started = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const duration = 1600; // ms
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else counter.textContent = target;
            }

            requestAnimationFrame(step);
        });
    }

    // Trigger once the stats section enters the viewport
    const statsSection = document.querySelector('.courses-stats-section');

    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
})();

(function () {
    const revealEls = document.querySelectorAll('.reveal');

    if (!revealEls.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
})();
