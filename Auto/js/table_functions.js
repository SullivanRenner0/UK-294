$('.edit').click(function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");

    console.log(id + " bearbeiten");

    $("#modalInhalt").load("./pages/form.html", async function(){
        $.getScript("./js/form.js");
        $("#id").val(id);
        let answer = await GetById(id)
        let car = answer.data[0]
        $("#id").val(id);
        $("#name").val(car.name);
        $("#farbe").val(car.farbe);
        $("#bauart").val(car.bauart);
        $("#date").val(car.date);
        $("#tank").val(car.tanken);
        $("#kraftstoff").val(car.kraftstoff);
        $("#bemerkung").val(car.bemerkung.replaceAll("<br>", "\n"));
        $("#aktiv").prop('checked', car.status == "true");
        $('select').formSelect();

        // class valid zu inputfeld hinzufügen
        $("#id").addClass("valid");
        $("#name").addClass("valid");
        $("#farbe").addClass("valid");
        $("#bauart").addClass("valid");
        $("#date").addClass("valid");
        $("#tank").addClass("valid");
        $("#kraftstoff").addClass("valid");
        $("#bemerkung").addClass("valid");
        // Prefilling Text Inputs (damit Labels nicht im Input Feld sind wenn kein placeholder vorhanden ist)
        $("#id").addClass("valid grey lighten-2");
        M.updateTextFields();          
    })
    $("#modalTitel").html("Edit: " + id);
    $("#modal1").modal("open");

});

$('.tanken').click(async function (e){
    e.preventDefault();
    var id = $(this).parent().parent().attr("data-id");
    console.log(id + " tanken");
    let answer = await GetById(id);

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
})
$('.bemerkung').dblclick(async function (e){
    e.preventDefault();
    let readonly = false;
    if (!await IsLogedIn(false, false))
    {
        // M.toast({html: "Bitte einloggen", classes: "red rounded darken-4 black-text"});
        // return;
        readonly = true;
    }
    var id = $(this).parent().attr("data-id");

    let answer = await GetById(id);
    let car = answer.data[0];
    let bemerkung = car.bemerkung;
    console.log(bemerkung)
    $("#bemerkungInhalt").load("./pages/bemerkung.html", function(){
        $.getScript("./js/bemerkung.js");
        $("#bemerkung").val(bemerkung.replaceAll("<br>", "\n"));
        if (readonly)
        {
            $("#bemerkung").prop('readonly', true);
            $("#bemerkungSave").addClass("disabled");
        }
        $("#bemerkungID").val(car.id);
        // class valid zu inputfeld hinzufügen
        $("#bemerkung").addClass("valid");
        M.updateTextFields();          
    })
    $("#bemerkungTitel").html("Bemerkung: " + car.id);
    $("#modal3").modal("open");
})

$('.colordiv').dblclick(async function (e){
    e.preventDefault();
    if (!await IsLogedIn(false, false))
    {
        M.toast({html: "Bitte einloggen", classes: "red rounded darken-4 black-text"});
        return;
    }
    var id = $(this).parent().parent().attr("data-id");

    let answer = await GetById(id);
    let car = answer.data[0];
    let color = car.farbe;
    // console.log(color)
    $("#farbeInhalt").load("./pages/farbe.html", function(){
        $.getScript("./js/farbe.js");
        $("#farbe").val(color);
        $("#farbeID").val(car.id);
        // class valid zu inputfeld hinzufügen
        $("#farbe").addClass("valid");
        M.updateTextFields();          
    })
    $("#farbeTitel").html("Farbe: " + car.id);
    $("#modal4").modal("open");
})
$('.dateedit').dblclick(async function (e){
    e.preventDefault();
    console.log("Hallo")
    if (!await IsLogedIn(false, false))
    {
        M.toast({html: "Bitte einloggen", classes: "red rounded darken-4 black-text"});
        return;
    }
    var id = $(this).parent().attr("data-id");

    let answer = await GetById(id);
    let car = answer.data[0];
    let date = car.date;
    console.log(date);
    $("#dateInhalt").load("./pages/date.html", function(){
        $.getScript("./js/date.js", function(){
            if (isDate(date))
            {
                $("#datum").datepicker('setDate', date);
                $("#datum").val(date);
            }
            else
                console.log(date + " ist kein Datum")

            $("#dateID").val(car.id);
            // class valid zu inputfeld hinzufügen
            $("#datum").addClass("valid");
            M.updateTextFields();  
        });        
    })
    $("#dateTitel").html("Datum: " + car.id);
    $("#modal5").modal("open");
})
var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

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

$(".status").dblclick(async function(e){
    console.log("status")
    e.preventDefault();
    if (!await IsLogedIn(false, false))
    {
        M.toast({html: "Bitte einloggen", classes: "red rounded darken-4 black-text"});
        return;
    }
    var id = $(this).parent().parent().attr("data-id");
    let answer = await GetById(id);
    let car = answer.data[0];
    let status = car.status;
    if (status != "true")
        status = true;
    else
        status = false;

    car.status = status;
    await UpdateById(id, car);
    updateTable();
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
