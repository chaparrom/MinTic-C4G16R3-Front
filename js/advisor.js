function salesManQry(){

    $("#identification").val("");
    $("#name").val("");
    $("#email").val("");
    $("#zone").val("");
    $("#type").val("");

    let user = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
        url:'http://132.226.250.48:8083/api/user/'+ user.id,
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
            console.log(respuesta)
            console.log(respuesta.identification)
            document.getElementById('identification').value=respuesta.identification;
            document.getElementById('name').value=respuesta.name;
            document.getElementById('email').value=respuesta.email;
            document.getElementById('zone').value=respuesta.zone;
        }
    });
}

function orderQryBySalesMan(){

    let user = JSON.parse(sessionStorage.getItem('user'));

    $("#orderList").empty();
    
    $.ajax({
        url:'http://132.226.250.48:8083/api/order/salesman/'+ user.id,
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){

            let tableList="<div class='table-responsive'>";
            tableList+="<table class='table'>";
            tableList+="<thead class='thead-light'>";
            tableList+="<tr>";
            tableList+="<th> Id </th>";
            tableList+="<th> Fecha </th>";
            tableList+="<th> Estado </th>";
//            tableList+="<th colspan='2'> Acciones </th> </tr>";
            tableList+="</tr>";

            for(i=0;i<respuesta.length;i++){
                console.log(respuesta);
                tableList+="<tr>";
                tableList+="<td style='width: 10px'>" + respuesta[i].id + "</td>";
                let date = new Date(respuesta[i].registerDay);
                tableList+="<td style='width: 150px'>" + date.toLocaleDateString() + "</td>";
                tableList+="<td style='width: 220px'>" + respuesta[i].status + "</td>";
//                tableList+="<td> <button class='btn btn-secondary' onclick='orderDet(" + JSON.stringify(respuesta[i].id) + ")'>Detalle Orden</button>";
                tableList+="</tr>";
            }
            tableList+="</table>";
            tableList+="</div>";
            $("#orderList").append(tableList);
        }
    });
}

$(document).ready(function () {
        
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null | user.type != "ASE") {
        location.href="index.html";
    } 
    salesManQry();
    orderQryBySalesMan()
});