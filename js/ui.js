/**
 * ==========================================================================
 *        MÓDULO DE INTERFAZ Y RENDERIZADO DE FLUIDOS - ZYRA BLOB (PREMIUM)
 * ==========================================================================
 */

class ZyraUI {
    constructor(config) {
        this.config = config || {};
        
        // Elementos DOM
        this.logoContainer = document.getElementById('logo-container');
        this.serverClaim = document.getElementById('server-claim');
        this.socialsContainer = document.getElementById('social-links-grid');
        this.bgVideo = document.getElementById('bg-video');
        
        // Canvas del Centro (Burbuja de Metal Líquido)
        this.blobCanvas = document.getElementById('blob-canvas');
        
        // Parámetros de la burbuja
        this.time = 0;
        this.baseRadius = 120;
        this.blobX = 250;
        this.blobY = 250;
        this.mouse = { x: null, y: null, radius: 250 };
        
        this.init();
    }

    init() {
        this.applyConfigToggles();
        this.renderBranding();
        this.renderSocials();
        this.renderBackgroundVideo();
        this.applyDynamicStyles();
        
        // Iniciar Animación de la Metaball
        this.initLiquidBlob();
        this.bindMouseEvents();
    }

    applyConfigToggles() {
        const comps = this.config.components;
        if (!comps) return;

        // Ocultar música si está desactivada
        const musicCard = document.getElementById('music-card-wrapper');
        if (musicCard && !comps.enableMusic) {
            musicCard.classList.add('hidden');
        }

        // Ocultar redes si está desactivado
        const socialsPanel = document.getElementById('socials-panel');
        if (socialsPanel && !comps.enableSocials) {
            socialsPanel.classList.add('hidden');
        }
    }

    renderBranding() {
        if (!this.logoContainer) return;
        const brand = this.config.branding;

        if (brand.logoUrl) {
            this.logoContainer.innerHTML = `<img src="${brand.logoUrl}" alt="${brand.serverName}">`;
        } else {
            this.logoContainer.innerHTML = `<h1>${brand.serverName}</h1>`;
        }

        if (this.serverClaim) {
            this.serverClaim.innerText = brand.claim;
        }
    }

    renderSocials() {
        if (!this.socialsContainer || !this.config.components.enableSocials) return;
        const socialsList = this.config.socials || [];
        
        let html = "";
        socialsList.forEach(social => {
            html += `
                <a href="${social.url}" target="_blank" class="social-btn">
                    <span>${social.name}</span>
                </a>`;
        });
        
        this.socialsContainer.innerHTML = html;
    }

    renderBackgroundVideo() {
        if (!this.bgVideo) return;
        const bg = this.config.background;

        if (this.config.components.enableBackgroundVideo && bg.videoUrl) {
            this.bgVideo.src = bg.videoUrl;
            this.bgVideo.style.opacity = bg.videoOpacity;
            this.bgVideo.classList.remove('hidden');
            this.bgVideo.play().catch(() => {});
        } else {
            this.bgVideo.classList.add('hidden');
        }
    }

    bindMouseEvents() {
        window.addEventListener('mousemove', (e) => {
            if (!this.blobCanvas) return;
            const rect = this.blobCanvas.getBoundingClientRect();
            // Convertir coordenadas del ratón relativas al Canvas del blob
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    /* ==========================================================================
       RENDERIZADOR DE METABALL / BURBUJA DE METAL LÍQUIDO (MORPHING CANVAS)
       ========================================================================== */
    initLiquidBlob() {
        if (!this.blobCanvas) return;
        const canvas = this.blobCanvas;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            this.blobX = canvas.width / 2;
            this.blobY = canvas.height / 2;
        };
        window.addEventListener('resize', resize);
        resize();

        const drawBlob = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Ondas de deformación (Time)
            this.time += 0.012;

            ctx.beginPath();
            
            // Trazar perímetro usando interpolación circular por ángulos finos
            const steps = 180;
            for (let i = 0; i <= steps; i++) {
                const angle = (i / steps) * Math.PI * 2;
                
                // Superposición de ondas sinusoidales para emular deformación orgánica
                let radius = this.baseRadius + 
                    Math.sin(angle * 4 + this.time * 2.0) * 14 + 
                    Math.cos(angle * 7 - this.time * 1.5) * 8 +
                    Math.sin(angle * 2 + this.time * 0.8) * 6;

                // Atracción magnética al cursor de ratón
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const dx = this.mouse.x - this.blobX;
                    const dy = this.mouse.y - this.blobY;
                    const mouseDist = Math.hypot(dx, dy);
                    const mouseAngle = Math.atan2(dy, dx);
                    
                    if (mouseDist < this.mouse.radius) {
                        const angleDiff = Math.cos(angle - mouseAngle);
                        if (angleDiff > 0) {
                            // Deformar la burbuja estirándola hacia las coordenadas del ratón
                            const pullFactor = (1 - mouseDist / this.mouse.radius);
                            radius += angleDiff * pullFactor * 48;
                        }
                    }
                }

                // Convertir polares a cartesianas centradas en el canvas
                const x = this.blobX + Math.cos(angle) * radius;
                const y = this.blobY + Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.closePath();

            // Rellenar con un degradado radial metalizado de reflejo
            const gradient = ctx.createRadialGradient(
                this.blobX - 25, this.blobY - 25, 10,
                this.blobX, this.blobY, this.baseRadius + 40
            );
            gradient.addColorStop(0, '#f9e4ad'); // Brillo de reflexión
            gradient.addColorStop(0.3, '#dfba5f'); // Color de tono medio oro
            gradient.addColorStop(0.7, '#675225'); // Penumbra metálica
            gradient.addColorStop(0.95, '#151107'); // Oscuridad del borde
            gradient.addColorStop(1, '#050401');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Bordes finos y luminosos
            ctx.strokeStyle = 'rgba(223, 186, 95, 0.35)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Reflejo secundario interno de cristal
            ctx.beginPath();
            ctx.arc(this.blobX - 35, this.blobY - 35, 75, 0, Math.PI * 2);
            const glassReflect = ctx.createRadialGradient(
                this.blobX - 45, this.blobY - 45, 5,
                this.blobX - 35, this.blobY - 35, 70
            );
            glassReflect.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
            glassReflect.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glassReflect;
            ctx.fill();

            requestAnimationFrame(drawBlob);
        };

        drawBlob();
    }

    applyDynamicStyles() {
        const theme = this.config.theme;
        const typo = this.config.typography;
        const root = document.documentElement;

        if (theme.colorPrimary) root.style.setProperty('--bg-pure-black', theme.colorPrimary);
        if (theme.colorSecondary) root.style.setProperty('--bg-glass-card', theme.colorSecondary);
        if (theme.colorAccent) {
            root.style.setProperty('--accent-pure-white', theme.colorAccent);
            root.style.setProperty('--accent-glow', `rgba(${this.hexToRgb(theme.colorAccent)}, 0.22)`);
        }
        if (theme.colorTextPrimary) root.style.setProperty('--text-primary', theme.colorTextPrimary);
        if (theme.colorTextSecondary) root.style.setProperty('--text-secondary', theme.colorTextSecondary);
        if (theme.colorTextMuted) root.style.setProperty('--text-muted', theme.colorTextMuted);
        if (theme.colorBorder) root.style.setProperty('--border-swiss', `1px solid ${theme.colorBorder}`);
        if (theme.colorBorderActive) root.style.setProperty('--border-swiss-active', `1px solid ${theme.colorBorderActive}`);
        
        if (typo.fontFamily) root.style.setProperty('--font-body', typo.fontFamily);
        if (typo.fontSizeBase) root.style.setProperty('--font-size-base', typo.fontSizeBase);
    }

    hexToRgb(hex) {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
        }
        return '223,186,95';
    }
}
window.ZyraUI = ZyraUI;
