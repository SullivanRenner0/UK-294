IsLogedIn(false, false);


$("#loginform button").click(function (e) { 
    e.preventDefault();
    let name = $("#name").val();
    let password = $("#password").val();
    let sucess = false;
    $.ajax({
        type: "LOGIN",
        url: "api.php?username=" + name + "&password=" + password,
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.jwt.admin)
            {
                M.toast({html: "Login erfolgreich (admin)"});
                $("#logout").show();
                $("#loginform").hide();
                
                $("#loginInhalt").html("")
                $("#loginTitel").html("");
                $("#modal2").modal("close");


                sucess = true;
            } 
            else
            {
                M.toast({html: "Login fehlgeschlagen"});
                $("#logout").hide();
                $("#loginform").show()
            }
        }
    });
    UpdateLoginButton(sucess);
});
$("#logout").click(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "LOGOUT",
        url: "api.php",
        dataType: "json",
        async: false,
        success: function (response) {
            M.toast({html: "erfolgreich abgemeldet"});
            $("#logout").hide();
            $("#loginform").show();

            $("#loginInhalt").html("")
            $("#loginTitel").html("");
            $("#modal2").modal("close");
        }
    });
    UpdateLoginButton();
});

