        const navLinks = document.querySelectorAll('nav a, .footer-nav a');
        const sections = document.querySelectorAll('#intro, #what-we-do, #our-work');
        const footer = document.querySelector('#footer');
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');

        menuToggle?.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        const setActiveLink = (sectionId) => {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        };

        setActiveLink('intro');

        document.querySelectorAll('nav a, .footer-nav a').forEach((link) => {
            link.addEventListener('click', (event) => {
                const section = document.querySelector(link.getAttribute('href'));

                if (!section) {
                    return;
                }

                event.preventDefault();
                setActiveLink(section.id);
                navbar?.classList.remove('menu-open');
                menuToggle?.setAttribute('aria-expanded', 'false');
                section.scrollIntoView({ behavior: 'smooth' });
            });
        });

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-35% 0px -55% 0px'
        });

        sections.forEach((section) => sectionObserver.observe(section));

        let footerWasVisible = false;
        const footerObserver = new IntersectionObserver((entries) => {
            const footerEntry = entries[0];

            if (footerEntry.isIntersecting) {
                footerWasVisible = true;
                setActiveLink('footer');
            } else if (footerWasVisible) {
                footerWasVisible = false;
                setActiveLink('our-work');
            }
        });

        footerObserver.observe(footer);
