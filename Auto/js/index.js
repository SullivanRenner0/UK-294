$('.sidenav').sidenav();
$("a").click(function (e) { 
    e.preventDefault();
});

//Tabelle.html nach main laden
$("main").load("./pages/table.html", function(){
    $.getScript("js/table.js");
})

$(".modal").modal();

$("#save").click(function (e) { 
    e.preventDefault();
    var anyError = false;
    $("input").each(function (index, element) {
        if (!(element.checkValidity()))
        {
            anyError = true;
            element.focus();
            return false;
        }
    });
    if (anyError == true)
    {
        window.alert("Bitte alle Werte korrekt ausfüllen")
        return;
    }
    
    //Auto Speichern und modal schliessen
    // $.getJSON("api.php",  function (response) {
            var newCar = {};
            // newCar["id"] = $("#id").val();
            newCar["name"] = $("#name").val();
            newCar["kraftstoff"] = $("#kraftstoff option:selected").text();
            newCar["farbe"] = $("#farbe").val();
            newCar["bauart"] = $("#bauart").val();
            newCar["tanken"] = $("#tank").val();
            console.log(newCar);
            
            $.ajax({
                type: "POST", //Get, Post, Put, Delete
                url: "api.php?id=" + $("#id").val(),
                data: newCar,
                success: function (response) {
                    // console.log(response);
                    M.toast({html: `Auto wurde erfolgreich gespeichert`, classes: 'red rounded darken-4 black-text'});
                    updateTable();
                }
            });
            
            $("#modalInhalt").html("")
            $("#modalTitel").html("");
            $("#modal1").modal("close");
        // }
    // );
});


async function GetById(id){
    return await $.ajax({
        type: "GET",
        url: "api.php?id=" + id,
        success: function (response) {
            return response.data[0];
        }
    });
}