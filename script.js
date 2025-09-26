document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const hotServicesData = [
        { type: 'consulink', service: 'Konsultasi Pengerjaan Tugas Akademik', title: 'Konsultasi Tugas Akademik', color: 'emerald'},
        { type: 'paperlink', service: 'Bimbingan Metodologi & Analisis Data', title: 'Bimbingan Metodologi & Data', color: 'violet'},
        { type: 'courselink', service: 'Kalkulus', title: 'Mentoring Kalkulus', color: 'amber'},
        { type: 'complink', service: 'Business Plan Competition', title: 'Mentoring Business Plan', color: 'rose'},
    ];

    // --- DOM Elements ---
    const authContainer = document.getElementById('authContainer');
    const appWrapper = document.getElementById('app-wrapper');
    const authPages = document.querySelectorAll('.auth-page');
    const mainContentPages = document.querySelectorAll('.main-content .page');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const shareModal = document.getElementById('shareModal');

    // --- Functions ---
    const showAuthPage = (pageId) => {
        authPages.forEach(p => p.classList.remove('active'));
        document.getElementById(pageId)?.classList.add('active');
    };

    const login = () => {
        authContainer.style.display = 'none';
        appWrapper.classList.remove('hidden');
        showPage('berandaPage');
    };

    const logout = () => {
        appWrapper.classList.add('hidden');
        authContainer.style.display = 'block';
        showAuthPage('loginPage');
    };

    const showPage = (pageId, clickedLink) => {
        mainContentPages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId)?.classList.add('active');

        sidebarLinks.forEach(link => link.classList.remove('active'));
        const linkToActivate = clickedLink || document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
        linkToActivate?.classList.add('active');
    };

    const showNotification = (message, type = 'info') => {
        const container = document.getElementById('notification-container');
        if (!container) return;
        const notif = document.createElement('div');
        const colors = { info: 'bg-blue-500', success: 'bg-green-500', error: 'bg-red-500' };
        notif.className = `custom-notification text-white text-sm font-semibold px-4 py-2 rounded-md shadow-lg opacity-0 transform translate-x-10 ${colors[type]}`;
        notif.textContent = message;
        container.appendChild(notif);
        setTimeout(() => notif.classList.remove('opacity-0', 'translate-x-10'), 10);
        setTimeout(() => {
            notif.classList.add('opacity-0', 'translate-x-10');
            notif.addEventListener('transitionend', () => notif.remove());
        }, 3000);
    };

    const openShareModal = () => {
        shareModal?.classList.remove('hidden');
        setTimeout(() => shareModal?.classList.add('active'), 10);
    };

    const closeShareModal = () => {
        shareModal?.classList.remove('active');
        setTimeout(() => shareModal?.classList.add('hidden'), 300);
    };
    
    const copyShareLink = () => {
        navigator.clipboard.writeText('https://edulink.app/promo/ajakteman')
            .then(() => showNotification('Link berhasil disalin!', 'success'));
    };

    const populateHotServices = () => {
        const container = document.getElementById('hot-services-container');
        if (!container) return;
        let content = `<div class="flex items-center gap-3 mb-5"><i data-lucide="flame" class="w-7 h-7 text-orange-500"></i><h2 class="text-2xl font-bold text-blue-800 dark:text-white">Sedang Ramai Digunakan</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
        hotServicesData.forEach(item => {
            const userCount = Math.floor(Math.random() * 181) + 20;
            content += `<div class="hot-service-card p-4 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700" data-type="${item.type}" data-service="${item.service}">
                <h4 class="font-semibold dark:text-white">${item.title}</h4>
                <p class="text-sm text-${item.color}-600 dark:text-${item.color}-400 font-medium capitalize">${item.type}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">${userCount} orang sedang menggunakan</p>
            </div>`;
        });
        container.innerHTML = content + '</div>';
    };

    const populateTestimonials = () => {
        const container = document.getElementById('testimonials-container');
        if (!container) return;
        container.innerHTML = `<div class="flex items-center gap-3 mb-5"><i data-lucide="quote" class="w-7 h-7 text-green-500"></i><h2 class="text-2xl font-bold text-blue-800 dark:text-white">Kisah Sukses</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 italic text-slate-600 dark:text-slate-300">"Mentor Paperlink sangat membantu menyusun naskah. Prosesnya jadi jauh lebih cepat!"<p class="font-bold text-slate-800 dark:text-white mt-3 not-italic">- Rina S. (Lolos Jurnal Scopus Q2)</p></div>
            <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 italic text-slate-600 dark:text-slate-300">"Bimbingan dari mentor Complink membuat business plan saya jadi lebih matang dan menarik di mata juri."<p class="font-bold text-slate-800 dark:text-white mt-3 not-italic">- Adi P. (Juara 1 Business Plan Competition)</p></div>
        </div>`;
    };

    const showMentorRegisterForm = (category) => {
        document.getElementById('mentorRegisterSelection')?.classList.add('hidden');
        document.getElementById('mentorRegisterFormContainer')?.classList.remove('hidden');
        document.getElementById('mentorRegisterSuccess')?.classList.add('hidden');
        const titleEl = document.getElementById('mentorRegisterFormTitle');
        if(titleEl) titleEl.textContent = `Formulir Pendaftaran Mentor ${category}`;
    };

    const showMentorRegisterSelection = () => {
        document.getElementById('mentorRegisterSelection')?.classList.remove('hidden');
        document.getElementById('mentorRegisterFormContainer')?.classList.add('hidden');
        document.getElementById('mentorRegisterSuccess')?.classList.add('hidden');
    };

    const submitMentorForm = () => {
        document.getElementById('mentorRegisterFormContainer')?.classList.add('hidden');
        document.getElementById('mentorRegisterSuccess')?.classList.remove('hidden');
    };


    // --- Event Listeners ---
    document.getElementById('loginForm')?.addEventListener('submit', (e) => { e.preventDefault(); login(); });
    document.getElementById('registerForm')?.addEventListener('submit', (e) => { e.preventDefault(); showAuthPage('loginPage'); showNotification('Pendaftaran berhasil! Silakan login.', 'success'); });
    document.querySelectorAll('.auth-link').forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); showAuthPage(e.currentTarget.dataset.authpage); }));
    sidebarLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); showPage(e.currentTarget.dataset.page, e.currentTarget); }));
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => { e.preventDefault(); logout(); });
    document.querySelectorAll('.chat-item').forEach(item => item.addEventListener('click', () => showNotification('Layanan chat dengan mentor ini telah berakhir', 'info')));
    document.getElementById('promoClaimBtn')?.addEventListener('click', () => showNotification('Diskon didapatkan!', 'success'));
    document.getElementById('promoShareBtn')?.addEventListener('click', openShareModal);
    shareModal?.addEventListener('click', closeShareModal);
    document.getElementById('copyLinkBtn')?.addEventListener('click', copyShareLink);
    document.querySelectorAll('.kuisioner-start-btn').forEach(button => button.addEventListener('click', () => showNotification('Membuka kuesioner...', 'info')));
    document.querySelectorAll('.mentor-category-card').forEach(card => card.addEventListener('click', (e) => showMentorRegisterForm(e.currentTarget.dataset.category)));
    document.getElementById('backToMentorSelection')?.addEventListener('click', showMentorRegisterSelection);
    document.getElementById('mentorRegisterForm')?.addEventListener('submit', (e) => { e.preventDefault(); submitMentorForm(); });
    document.querySelectorAll('.page-link-btn').forEach(button => button.addEventListener('click', (e) => { e.preventDefault(); showPage(e.currentTarget.dataset.page); }));
    
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon?.classList.remove('hidden');
    } else {
        themeToggleDarkIcon?.classList.remove('hidden');
    }
    themeToggleBtn?.addEventListener('click', () => {
        themeToggleDarkIcon?.classList.toggle('hidden');
        themeToggleLightIcon?.classList.toggle('hidden');
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    });

    // --- Initial Setup ---
    populateHotServices();
    populateTestimonials();
    lucide.createIcons();
    // Start on the login page, not blank
    showAuthPage('registerPage');
});