async function GetById(id){
    return await $.ajax({
        type: "GET",
        url: "api.php?id=" + id
    });
}async function DeleteById(id){
    return await $.ajax({
        type: "DELETE",
        url: "api.php?id=" + id
    });
}
async function UpdateById(id, data){
    return await $.ajax({
        type: "POST",
        data: data,
        url: "api.php?id=" + id
    });
}