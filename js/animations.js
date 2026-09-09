/**
 * ==========================================================================
 *        MÓDULO DE TRANSICIONES Y REVEALS - ZYRA BLOB (PREMIUM)
 * ==========================================================================
 */

class ZyraAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Revelar suave de los enlaces del pie de página
        const links = document.querySelectorAll('.swiss-links-nav a');
        links.forEach((link, idx) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(5px)';
            link.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            link.style.transitionDelay = `${0.4 + (idx * 0.08)}s`;
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 50);
        });
    }
}
window.ZyraAnimations = ZyraAnimations;
