export class GridRenderer {
    private gridSize: number;
    private gridColor: string;

    constructor(gridSize: number = 50, gridColor: string = '#2a2a2a') {
        this.gridSize = gridSize;
        this.gridColor = gridColor;
    }

    render(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        ctx.strokeStyle = this.gridColor;
        ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x < width; x += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y < height; y += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw center crosshair
        ctx.strokeStyle = '#4a4a4a';
        ctx.lineWidth = 2;

        const centerX = width / 2;
        const centerY = height / 2;
        const crosshairSize = 20;

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(centerX - crosshairSize, centerY);
        ctx.lineTo(centerX + crosshairSize, centerY);
        ctx.stroke();

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - crosshairSize);
        ctx.lineTo(centerX, centerY + crosshairSize);
        ctx.stroke();
    }
}
