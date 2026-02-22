(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.course-card');
    const mobileToggleBtn = document.getElementById('mobile-show-courses');
    let allCoursesExpanded = false;
    let wasMobile = window.matchMedia('(max-width: 820px)').matches;

    function isMobileView() {
        return window.matchMedia('(max-width: 820px)').matches;
    }

    function setToggleText() {
        if (!mobileToggleBtn) return;
        if (allCoursesExpanded) {
            mobileToggleBtn.innerHTML = `Kurslarni yig'ish <i class="fa-solid fa-chevron-down"></i>`;
            mobileToggleBtn.classList.add('expanded');
        } else {
            mobileToggleBtn.innerHTML = `Barcha kurslar <i class="fa-solid fa-chevron-down"></i>`;
            mobileToggleBtn.classList.remove('expanded');
        }
    }

    function applyMobileCollapse() {
        cards.forEach(card => card.classList.remove('mobile-collapsed-hidden'));

        if (!mobileToggleBtn) return;

        const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
        mobileToggleBtn.hidden = !isMobileView() || visibleCards.length <= 1;

        if (isMobileView() && !allCoursesExpanded && visibleCards.length > 1) {
            visibleCards.slice(1).forEach(card => card.classList.add('mobile-collapsed-hidden'));
        }

        setToggleText();
    }

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

            applyMobileCollapse();
        });
    });

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', () => {
            allCoursesExpanded = !allCoursesExpanded;
            applyMobileCollapse();
        });
    }

    window.addEventListener('resize', () => {
        const isMobile = isMobileView();
        if (!isMobile && wasMobile) {
            allCoursesExpanded = false;
        }
        wasMobile = isMobile;
        applyMobileCollapse();
    });

    applyMobileCollapse();
})();

(function () {
    const coursesData = [
        {
            id: 1,
            title: "Chuqur matematika",
            teacher: "Akmal Karimov",
            days: "Dushanba / Chorshanba / Juma",
            startTime: "15:00",
            endTime: "17:00",
            groups: 6,
            fullDescription: "Mazkur kurs algebra, geometriya va mantiqiy masalalarni chuqur o'rganishga yo'naltirilgan. O'quvchilar olimpiada formatidagi savollar, test strategiyalari va individual tahlil orqali yuqori natijalarga tayyorlanadi."
        },
        {
            id: 2,
            title: "Ingliz tili (IELTS)",
            teacher: "Dilnoza Rahimova",
            days: "Seshanba / Payshanba / Shanba",
            startTime: "14:00",
            endTime: "16:00",
            groups: 5,
            fullDescription: "Kurs IELTS'ning Listening, Reading, Writing va Speaking bo'limlarini kompleks yondashuvda o'rgatadi. Har hafta sinov testi, individual feedback va speaking club mashg'ulotlari o'tkaziladi."
        },
        {
            id: 3,
            title: "Kimyo va biologiya",
            teacher: "Madina Yo'ldosheva",
            days: "Dushanba / Chorshanba / Juma",
            startTime: "13:30",
            endTime: "15:30",
            groups: 4,
            fullDescription: "Tibbiyot va tabiiy fanlar yo'nalishiga tayyorlovchi ushbu kursda laboratoriya ishlari, test yechish va mavzular bo'yicha amaliy mashqlar birgalikda olib boriladi."
        },
        {
            id: 4,
            title: "Dasturlash asoslari",
            teacher: "Sardor Qodirov",
            days: "Seshanba / Payshanba / Shanba",
            startTime: "16:30",
            endTime: "18:00",
            groups: 7,
            fullDescription: "Python sintaksisi, algoritmik fikrlash va kichik loyiha yaratish jarayonlari bosqichma-bosqich o'rgatiladi. Kurs yakunida o'quvchilar real muammolarni kod orqali yecha oladi."
        },
        {
            id: 5,
            title: "Rus tili",
            teacher: "Olga Petrova",
            days: "Dushanba / Payshanba",
            startTime: "15:00",
            endTime: "16:30",
            groups: 3,
            fullDescription: "Rus tilida erkin muloqot, grammatika va matn bilan ishlash ko'nikmalarini rivojlantirishga qaratilgan kurs. Mashg'ulotlar suhbat, diktant va yozma topshiriqlar bilan boyitilgan."
        },
        {
            id: 6,
            title: "Fizika va mexanika",
            teacher: "Jahongir Sattorov",
            days: "Dushanba / Chorshanba / Shanba",
            startTime: "17:00",
            endTime: "19:00",
            groups: 4,
            fullDescription: "Kursda mexanika, elektr va optika bo'limlari olimpiada darajasidagi masalalar orqali o'rgatiladi. Nazariya va amaliy tahlil uyg'unligi o'quvchining chuqur tushunchasini shakllantiradi."
        },
        {
            id: 7,
            title: "Robototexnika",
            teacher: "Bekzod Ergashev",
            days: "Seshanba / Juma",
            startTime: "14:30",
            endTime: "16:30",
            groups: 5,
            fullDescription: "Arduino va Lego platformalari asosida sensorlar bilan ishlash, robot yig'ish va ularni dasturlash o'rgatiladi. Har oy mini-musobaqalar orqali amaliy natija mustahkamlanadi."
        },
        {
            id: 8,
            title: "Geografiya va ekologiya",
            teacher: "Nodira Islomova",
            days: "Chorshanba / Juma",
            startTime: "13:00",
            endTime: "14:30",
            groups: 3,
            fullDescription: "Dunyo geografiyasi, iqlim tizimlari va ekologik muammolarni tahlil qilishga qaratilgan kurs. Xarita bilan ishlash, keys tahlil va amaliy topshiriqlar asosiy yo'nalish hisoblanadi."
        }
    ];

    const modal = document.getElementById('course-details-modal');
    const detailsContent = document.getElementById('course-details-content');
    const detailsButtons = document.querySelectorAll('.details-btn');

    if (!modal || !detailsContent || !detailsButtons.length) return;

    function getCourseById(id) {
        return coursesData.find(course => course.id === id);
    }

    function renderDetails(course) {
        detailsContent.innerHTML = `
            <h2 id="course-details-title">${course.title}</h2>
            <ul class="course-details-meta">
                <li><strong>Ustoz:</strong> ${course.teacher}</li>
                <li><strong>Dars kunlari:</strong> ${course.days}</li>
                <li><strong>Boshlanish vaqti:</strong> ${course.startTime}</li>
                <li><strong>Tugash vaqti:</strong> ${course.endTime}</li>
                <li><strong>Guruhlar soni:</strong> ${course.groups}</li>
            </ul>
            <p>${course.fullDescription}</p>
            <a class="btn" href="register.html">Ro'yxatdan o'tish</a>
        `;
    }

    function openModalWithId(courseId, pushUrl) {
        const course = getCourseById(courseId);
        if (!course) return;

        renderDetails(course);
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (pushUrl) {
            const nextUrl = `${window.location.pathname}?id=${courseId}`;
            window.history.pushState({ courseId }, '', nextUrl);
        }
    }

    function closeModal(clearUrl) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        if (clearUrl) {
            window.history.pushState({}, '', window.location.pathname);
        }
    }

    detailsButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const courseId = Number(btn.dataset.courseId);
            openModalWithId(courseId, true);
        });
    });

    modal.addEventListener('click', event => {
        if (event.target.closest('[data-close-modal="true"]')) {
            closeModal(true);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(true);
        }
    });

    const queryId = Number(new URLSearchParams(window.location.search).get('id'));
    if (queryId) {
        openModalWithId(queryId, false);
    }
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
