$("#farbeSave").click(async function(e){
    e.preventDefault();
    let id = $("#farbeID").val();
    let response = await GetById(id);
    let car = response.data[0];
    car.farbe = $("#farbe").val()
    await UpdateById(id, car);
    updateTable();

    $("#farbeInhalt").html("")
    $("#farbeTitel").html("");
    $("#modal4").modal("close");
    M.toast({html: "Farbe wurde erfolgreich angepasst", classes: 'green rounded darken-4 black-text'});
})