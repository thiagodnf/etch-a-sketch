export default class Canvas {

    constructor(id) {
        this.size = 15;
        this.canvas = document.getElementById(id);
        this.ctx = canvas.getContext("2d");
        this.isMoveDown = false;
        this.color = "black";
    }

    set width(width) {
        this.canvas.width = width;
    }

    set height(height) {
        this.canvas.height = height;
    }

    drawLine(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 3]);
        this.ctx.moveTo(x0 + 0.5, y0 + 0.5);
        this.ctx.lineTo(x1 + 0.5, y1 + 0.5);
        this.ctx.stroke();
    }

    drawSquare(x, y, width = 10, height = 10, color = "red") {

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.stroke();
    }

    drawGrid() {

        let columns = parseInt(this.canvas.width / this.size) + 1;
        let lines = parseInt(this.canvas.height / this.size) + 1;

        let height = lines * this.size;
        let width = columns * this.size;

        for (let i = 1; i < lines + 1; i++) {
            this.drawLine(0, i * this.size, width, i * this.size);
        }

        for (let i = 1; i < columns + 1; i++) {
            this.drawLine(i * this.size, 0, i * this.size, height);
        }
    }

    drawSquareAt(mousePosition) {

        let i = parseInt(mousePosition.x / this.size);
        let j = parseInt(mousePosition.y / this.size);

        this.drawSquare(i * this.size, j * this.size, this.size, this.size, this.color);
        this.drawGrid();
    }

    mouseDown(mousePosition) {

        this.isMoveDown = true;

        this.drawSquareAt(mousePosition);
    }

    mouseUp() {
        this.isMoveDown = false;
    }

    mouseMove(mousePosition) {

        if (this.isMoveDown) {
            this.drawSquareAt(mousePosition);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawGrid();
    }

    update() {
        this.clear();
    }
}
