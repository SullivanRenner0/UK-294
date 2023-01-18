$('.sidenav').sidenav();
$("a").click(function (e) { 
    e.preventDefault();
});

//Tabelle.html nach main laden
$("main").load("./pages/table.html", function(){
    $.getScript("js/table.js", function(){
        $.getScript("js/login.js");
    });
    $.getScript("js/apiController.js");
    
})

$(".modal").modal();

$("#save").click(async function (e) { 
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
            newCar["date"] = $("#date").val();
            newCar["tanken"] = $("#tank").val();
            newCar["bemerkung"] = $("#bemerkung").val()
            newCar["status"] = $("#aktiv").is(":checked")
            
            await UpdateById($("#id").val(), newCar);
            M.toast({html: `Auto wurde erfolgreich gespeichert`, classes: 'green rounded darken-4 black-text'});
            updateTable();
            
            $("#modalInhalt").html("")
            $("#modalTitel").html("");
            $("#modal1").modal("close");
        // }
    // );
});

$('#login').click(function (e){
    e.preventDefault();
    // var id = $(this).parent().parent().attr("data-id");
    console.log("Hinzufügen");
    LoadLogin();
})

function LoadLogin () {
    $("#loginInhalt").load("./pages/login.html", function(){
        $.getScript("./js/login.js");
    })
    let titel = "Login";
    if (IsLogedIn(false, false))
        titel = "Logout";
    $("#loginTitel").html(titel);
    $("#modal2").modal("open");
}

function UpdateLoginButton(admin = undefined){
    if (admin === undefined)
        admin = IsLogedIn(false, false);
        
    if (admin){
        $("#login").text("logout");
        $("#login").removeClass("green-text");
        $("#login").addClass("red-text")
        $(".action").show();
        $("#addbutton").show();
    }
    else{
        $("#login").text("login");
        $("#login").removeClass("red-text");
        $("#login").addClass("green-text")
        $(".action").hide();
        $("#addbutton").hide();
    }
}
function IsLogedIn(showMessage = true, closeModal = true){
    let admin = false;
    $.ajax({
        type: "GET",
        url: "api.php",
        dataType: "json",
        async: false,
        success: function (response)
        {
            if (response.jwt.admin)
            {
                if (showMessage)
                    M.toast({html: "Login erfolgreich (admin)"});
                $("#logout").show();
                $("#loginform").hide();
                admin = true;
            } 
            else
            {
                if (showMessage)
                    M.toast({html: "Login fehlgeschlagen"});
                $("#logout").hide();
                $("#loginform").show()
            }
        },
        error: function(){
            if (showMessage)
                M.toast({html: "Login fehlgeschlagen"});
            $("#logout").hide();
            $("#loginform").show()
        }
    });
    if (closeModal){
        $("#loginInhalt").html("")
        $("#loginTitel").html("");
        $("#modal2").modal("close");
    }
    return admin;
}
