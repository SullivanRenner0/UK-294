$("#bemerkungSave").click(async function(e){
    e.preventDefault();
    let id = $("#bemerkungID").val();
    let response = await GetById(id);
    let car = response.data[0];
    car.bemerkung = $("#bemerkung").val().replace(/(\r\n|\n|\r)/gm, "<br>");
    await UpdateById(id, car);
    updateTable();

    $("#bemerkungInhalt").html("")
    $("#bemerkungTitel").html("");
    $("#modal3").modal("close");
    M.toast({html: "Bemerkung wurde erfolgreich angepasst", classes: 'green rounded darken-4 black-text'});
})