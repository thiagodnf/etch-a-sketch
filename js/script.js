import Canvas from "./Canvas.js";

let c;
let mousePosition = {
    x: 0,
    y: 0
}

function resizeWindow() {

    $(".machine").height($(window).height() - 50*2)

    $(".toolbar").height(100);

    c.width = $(".toolbar").width()-6+2;
    c.height = $(".machine").height() - $(".toolbar").height() - 20

    c.update();
}

$(function () {

    c = new Canvas("canvas");

    $(window).resize(resizeWindow).trigger("resize");

    $("canvas").mousedown(function() {
        c.mouseDown(mousePosition);
    }).mouseup(function() {
        c.mouseUp(mousePosition);
    }).mouseout(function() {
        c.mouseUp(mousePosition);
    }).mousemove(function(evt) {
        var rect = c.canvas.getBoundingClientRect();

        mousePosition.x = ((evt.clientX - rect.left) / (rect.right - rect.left) * c.canvas.width) - 2;
        mousePosition.y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * c.canvas.height - 2;

        c.mouseMove(mousePosition);
    });

    $(".btn-color").change(function(){
        c.color = this.value;
    }).trigger("change")

    $(".btn-clear").click(function(){
        c.clear();
    })

    $(".btn-size").click(function(){

        let size = parseInt(prompt("What's the size? [5,25]", c.size));

        if (isNaN(size)) {
            alert("This is not a number");
            return;
        }

        if(size < 5 || size > 25){
            alert("The size is not valid");
            return;
        }

        c.size = size;
        c.update();
    })

    c.update();
});
