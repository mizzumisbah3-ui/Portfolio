document.addEventListener('DOMContentLoaded', () => {
    wrapSectionContent();
    initScrollFade();
    initNavToggle();
});

/* Wrap each non-hero section's direct children in a centered .container
   so content doesn't sprawl edge-to-edge on wide screens, while the
   section itself keeps its full-bleed background color. */
function wrapSectionContent() {
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        const wrapper = document.createElement('div');
        wrapper.className = 'container';
        while (section.firstChild) {
            wrapper.appendChild(section.firstChild);
        }
        section.appendChild(wrapper);
    });
}

/* Scroll fade-in for elements marked .fade-up */
function initScrollFade() {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(el => observer.observe(el));
}

/* Mobile nav toggle */
function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
