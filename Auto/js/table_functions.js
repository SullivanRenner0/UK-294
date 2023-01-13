$('.edit').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    console.log(id + " bearbeiten");

    $("#modalInhalt").load("./pages/form.html", function(){
        $.getScript("./js/form.js");
    })
    $("#modalTitel").html("Edit: " + id);
    $("#modal1").modal("open");

});

$('.car').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    console.log(id + " tanken");
})

$('.delete').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    $.ajax({
        type: "DELETE",
        url: "api.php?id=" + id,
        success: function (response) {
            updateTable();
        }
    });
})

$('#add').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    console.log("Hinzufügen");

    $("#modalInhalt").load("./pages/form.html", function(){
        $.getScript("./js/form.js");
    })
    $("#modalTitel").html("Add");
    $("#modal1").modal("open");
})

$("tr").hover(function () {
        // over
        if(!$(this).parent().is("thead"))
        {
            $(this).addClass("grey darken-1");
        }
    }, function () {
        // out
        if(!$(this).parent().is("thead"))
        {
            $(this).removeClass("grey darken-1");
        }
    }
);