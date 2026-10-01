        const navLinks = document.querySelectorAll('nav a');
        const sections = document.querySelectorAll('#intro, #what-we-do, #our-work, #footer');

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
