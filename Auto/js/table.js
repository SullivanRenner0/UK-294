updateTable();

function updateTable () {
    console.log("update gestartet");
    
    $.get("./template/table.hbs", function (response) {
        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        var template = Handlebars.compile(response);        
        $.getJSON("api.php", function (response_data) {
            $("tbody").html(template(response_data));
            $.getScript("js/table_functions.js");
            UpdateLoginButton();
        }
        );
    })
}


    
    
