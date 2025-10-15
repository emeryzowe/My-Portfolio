document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const downloadButton = document.getElementById('downloadResume');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    navLinkElements.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    let activeSection = null;
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSection = entry.target.id;
                updateActiveNavLink();
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    function updateActiveNavLink() {
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        let isValid = true;

        if (name === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (message === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        }

        if (isValid) {
            modal.classList.add('show');
            contactForm.reset();
        }
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });

    downloadButton.addEventListener('click', () => {
        const resumeData = [
            ['Field', 'Value'],
            ['Name', 'Zoeh Emery D. Manalili'],
            ['Address', 'Purok Molave, Poblacion, Malalag, Davao del Sur, Philippines'],
            ['Birthdate', 'March 26, 2005'],
            ['Email', 'dielzoeh26@gmail.com'],
            ['Facebook', 'https://web.facebook.com/home.php?_rdc=1&_rdr#'],
            ['Course', 'BS in Information Technology'],
            ['Year Level', '3rd Year'],
            ['School', 'Davao del Sur State College (DSSC)'],
            [''],
            ['Career Summary'],
            ['I\'m a 3rd-year BSIT student passionate about technology and creating useful systems. I have experience working with web and mobile app development through academic projects. My focus is on improving my programming skills and understanding how to build real-world applications. I enjoy designing user-friendly layouts and finding solutions to technical problems. My goal is to continue learning, gain more hands-on experience, and eventually become a skilled developer who can build projects that make a positive impact.'],
            [''],
            ['Skills'],
            ['Web Development (HTML, CSS, JavaScript)'],
            ['Java and C# Programming'],
            ['UI/UX Design and Responsive Layout'],
            [''],
            ['Education'],
            ['Year', 'Institution', 'Level', 'Notes'],
            ['2011-2017', 'Malalag Central Elementary School', 'Elementary', 'Completed Basic Education'],
            ['2017-2021', 'Holy Cross of Malalag Inc.', 'Junior High School', 'Graduated Junior High School'],
            ['2021-2023', 'Holy Cross of Malalag Inc.', 'Senior High - GAS (STEM-Math)', 'Specialized in ICT'],
            ['2023-Present', 'Davao del Sur State College (DSSC)', 'BSIT', 'Major in Web and System Development']
        ];

        let csvContent = '';
        resumeData.forEach(row => {
            const escapedRow = row.map(cell => {
                const cellStr = String(cell);
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return '"' + cellStr.replace(/"/g, '""') + '"';
                }
                return cellStr;
            });
            csvContent += escapedRow.join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'Zoeh_Manalili_Resume.csv');
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            document.getElementById('navbar').style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        } else {
            document.getElementById('navbar').style.boxShadow = 'none';
        }
    });
});
