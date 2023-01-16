$('.edit').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");

    console.log(id + " bearbeiten");

    $("#modalInhalt").load("./pages/form.html", async function(){
        $.getScript("./js/form.js");
        $("#id").val(id);
        let car = await GetById(id)
        // console.log(car);
        car = car.data[0]
        console.log(car);
        $("#id").val(id);
        $("#name").val(car.name);
        $("#farbe").val(car.farbe);
        $("#bauart").val(car.bauart);
        $("#tank").val(car.tanken);
        $("#kraftstoff").val(car.kraftstoff);
        $("#aktiv").prop('checked', car.status == true);
        $('select').formSelect();

        // class valid zu inputfeld hinzufügen
        $("#id").addClass("valid");
        $("#name").addClass("valid");
        $("#farbe").addClass("valid");
        $("#bauart").addClass("valid");
        $("#tank").addClass("valid");
        $("#kraftstoff").addClass("valid");
        // Prefilling Text Inputs (damit Labels nicht im Input Feld sind wenn kein placeholder vorhanden ist)
        $("#id").addClass("valid grey lighten-2");
        M.updateTextFields();          
    })
    $("#modalTitel").html("Edit: " + id);
    $("#modal1").modal("open");

});

$('.car').click(function (e){
    e.preventDefault();
    console.log(id + " tanken");
    var id = $(this).parent().parent().attr("data-id");

    $.ajax({
        type: "GET",
        url: "api.php?id=" + id,
        success: function (answer){
            let car = answer.data[0];
            car.tanken = Number(car.tanken) + 1;
            $.ajax({
                type: "POST", //Get, Post, Put, Delete
                url: "api.php?id=" + id,
                data:car,
                success: function (response) {
                    // console.log(response);
                    updateTable();
                }
            });
        }
    });
})

$('.delete').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    $.ajax({
        type: "DELETE",
        url: "api.php?id=" + id,
        success: function (response) {
            updateTable();
            M.toast({html: `Auto wurde erfolgreich gelöscht`, classes: 'red rounded darken-4 black-text'});
        }
    });
})

$('#addbutton').click(function (e){
    e.preventDefault();
    // var id = $(this).parent().parent().attr("data-id");
    console.log("Hinzufügen");
    LoadModal("Add");
})

function LoadModal (titel) {
    $("#modalInhalt").load("./pages/form.html", function(){
        $.getScript("./js/form.js");
        $("#id").addClass("valid grey lighten-2");
        M.updateTextFields();
    })
    $("#modalTitel").html(titel);
    $("#modal1").modal("open");
}

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
