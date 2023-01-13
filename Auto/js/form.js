$('select').formSelect();

$("#addCar").click(function (e) { 
    e.preventDefault();
    var anyError = false;
    $("input").each(function (index, element) {
        // element == this
        if (!(element.checkValidity()))
        {
            anyError = true;
        }
    });
    if (anyError == true)
    {
        window.alert("Bitte alle Werte ausfüllen")
    }
    else{
        //Auto hinzufügen und modal schliessen
        // $("#modal1").hide();
        $.getJSON("api.php",  function (response) {
                // console.log(Object.assign({}, response.data));
                var newCar = {};
                newCar["id"] = 99;
                newCar["name"] = $("#name").val();
                newCar["kraftstoff"] = $("#kraftstoff").val();
                newCar["farbe"] = $("#farbe").val();
                newCar["bauart"] = $("#bauart").val();
                newCar["tanken"] = $("#tank").val();
                console.log(newCar);
                //Insert
                $.ajax({
                    type: "POST", //Get, Post, Put, Delete
                    url: "api.php?id=0",
                    data: newCar,
                    success: function (response) {
                        console.log(response);
                        updateTable();
                    }
                });
                
                
                $("#modalInhalt").html("")
                $("#modalTitel").html("");
                $("#modal1").modal("close");
            }
        );


    }
});
