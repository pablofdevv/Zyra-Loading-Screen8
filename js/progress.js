/**
 * ==========================================================================
 *        MÓDULO DE PROGRESO SUIZO - ZYRA BLOB (PREMIUM)
 * ==========================================================================
 */

class ZyraProgress {
    constructor(config) {
        this.config = config || {};
        this.progressBar = document.getElementById('horizontal-progress-bar');
        this.progressValText = document.getElementById('progress-val-text');
    }

    updateProgress(percentage) {
        const val = Math.min(Math.max(percentage, 0), 100);

        // Actualizar ancho de la línea de progreso
        if (this.progressBar) {
            this.progressBar.style.width = `${val}%`;
        }

        // Actualizar indicador tipográfico
        if (this.progressValText) {
            this.progressValText.innerText = `[ ${Math.round(val)}% LOADING ]`;
        }

        // Aumentar el tamaño base de la burbuja de metal líquido según el progreso
        if (window.ZyraUIInstance) {
            window.ZyraUIInstance.baseRadius = 110 + (val / 100) * 40;
        }
    }
}
window.ZyraProgress = ZyraProgress;
