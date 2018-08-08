var xx;
var yy;
var bruchY;
var dinger;
var dingTexte = ["COMMUNITY", "CULTURES", "ADRENALIN", "1v1", "2v2", "3v3", "4v4", "5v5", "PEACE", "RHINO", "STAR", "JANITOR", "GL HF", "LUCK!!!", "NOOB!", "GOOOOOOAL", "ATTACK!", "DEFEND!"];
var spieler = 0;
var darf = true

$(function(){
    //Init{
        dingerMalen();
        kastenWahl();
        $("#unten3").hide();
    //Init}

    //startAnis{
    $("#unendlichOben").animate({
        left: "50%"
    }, 3000);
    $("#unendlichUnten").animate({
        left: "50%"
    }, 3000);
    //startAnis}

    //hovers{

    //hovers}

    //clicks{
        $("#addP").on("click", function(){
            if(darf){
                spieler ++;
                $("#unten2").append("<div class=\"spielerKlasse\" id=\"spieler" + spieler + "\"><img draggable=\"false\" style=\"max-width: 100%; max-height: 100%;\" src=\"bilder/kugel.png\"></div>");
                $("#spieler" + spieler).draggable({
                    containment: "parent"
                });
                darf = false;
                $("#addP").css({
                    cursor: "not-allowed"
                });
                $("#spieler" + spieler).append("<input class=\"nameInput\" type=\"text\" placeholder=\"name\" spieler=\"#spieler" + spieler + "\">");
            }
        });

        $("#dl").on("click", function(){

            html2canvas(document.getElementById('unten2'), { letterRendering: 1, allowTaint : true, onrendered : function (canvas) {
                canvas.id = "meinCanvas";
                $("#unten3").html("");
                $("#unten3").append(canvas);
                runterladen();
            } });

        });
    //clicks}

    //keys{
    $('body').on("keypress", '.nameInput', function(e) {
        var keyC = e.keyCode;
        if (keyC == 13) {
            $($(this).attr("spieler")).append("<p class=\"spielerName\">" + $(this).val() + "</p>");
            $("#addP").css({
                cursor: "pointer"
            });
            darf = true;
            $(this).remove();
        }
    });
    //keys}
});

function dingerMalen(){
    $("#unten").empty();

    xx = $("#unten").width();
    yy = $("#unten").height();

    bruchY = yy / 4;
    bruchX = xx / 4;

    for(i=0; i<4; i++){
        $("#unten").append("<div class=\"ding\" style=\"position: absolute; top: " + bruchY * i + "px; width: " + xx / 4 + "px; height: " + bruchY + "px;\"><p class=\"dingText\"></p></div>");
        for(i2=1; i2<4; i2++){
            $("#unten").append("<div class=\"ding\" style=\"position: absolute; left: " + bruchX * i2 + "px; top: " + bruchY * i + "px; width: " + xx / 4 + "px; height: " + bruchY + "px;\"><p class=\"dingText\"></p></div>");
        }
    }

    $(".ding").each(function(index, element){
        $(element).append("<div class=\"ding2\" style=\"position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;\"></div>");
    });

    dinger = $(".ding");
}

window.addEventListener('resize', function(event){
    dingerMalen();
});

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function kastenWahl(){
    var dieses = $(dinger[getRandomInt(0, dinger.length)]);
    var spruch = dingTexte[getRandomInt(0, dingTexte.length)];
    $(dieses).find(".dingText").text(spruch);
    $(dieses).find(".ding2").animate({
        left: "100%",
        top: "100%"
    }, 2500, function(){
        setTimeout(function(){
            dieses.find(".ding2").animate({
                left: "0px",
                top: "0px"
            }, 2000, function(){
                setTimeout(function(){
                    kastenWahl();
                }, getRandomInt(500, 2000));
            });
        }, getRandomInt(2000, 3000));
    });
}

function runterladen(){
    var canvas = document.getElementById("meinCanvas");
    var dataURL = canvas.toDataURL();

    $("#dlT").text("Download!");
    $("#dl").html("<a href=\"" + dataURL + "\" download=\"damn\"><b>Download!</b></a>")
}
