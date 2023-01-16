updateTable();

function updateTable () {
    console.log("update gestartet")
    $.get("./template/table.hbs", function (response) {
        var template = Handlebars.compile(response);        
        $.getJSON("api.php", function (response_data) {
            $("tbody").html(template(response_data));
            $.getScript("js/table_functions.js");
        }
        );
    }
);
}


    
    
