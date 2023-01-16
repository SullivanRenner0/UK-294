$('select').formSelect();

$("#tank").focusout(function(e){
    e.preventDefault();
    let input = $(this).val();
    input = Math.round(input * 10) / 10
    if (input < 0)
        input = 0;

    $(this).val(input);
    M.updateTextFields();
})