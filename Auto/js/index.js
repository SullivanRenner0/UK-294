$('.sidenav').sidenav();
$("a").click(function (e) { 
    e.preventDefault();
});

//Tabelle.html nach main laden
$("main").load("./pages/table.html", function(){
    $.getScript("js/table.js");
})

$(".modal").modal();
