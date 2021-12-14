function orderDet(){
console.log("entre");
    $("#orderDet").empty();
    let user = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('name').value=user.name;
    document.getElementById('identification').value=user.identification;
    document.getElementById('email').value=user.email;
    document.getElementById('zone').value=user.zone;

    let order = JSON.parse(sessionStorage.getItem('order'));
    console.log(order);

    $.ajax({
        url:'http://132.226.250.48:8083/api/order/' + order.id,
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
console.log(respuesta);

            document.getElementById('name1').value=respuesta.salesMan.name;
            document.getElementById('id').value=respuesta.id;
            let date = new Date(respuesta.registerDay);
            document.getElementById('date').value=date.toLocaleDateString();
            document.getElementById('status').value=respuesta.status;
            console.log(respuesta.products.length);
            let tableList="<div class='table-responsive'>";
            tableList+="<table class='table'>";
            tableList+="<thead class='thead-light'>";
            tableList+="<tr>";
            tableList+="<th> Referencia </th>";
            tableList+="<th> Marca </th>";
            tableList+="<th> Categoría </th>";
            tableList+="<th> Materiales </th>";
            tableList+="<th> Dimensiones </th>";
            tableList+="<th> Descripcion </th>";
            tableList+="<th> Precio </th>";
            tableList+="<th> Cantidad </th>";
            tableList+="</tr>";

            for(var key in respuesta.products) {
                   console.log(respuesta.products [key]);
                    console.log(respuesta.products [key].category);

                tableList+="<tr>";
                tableList+="<td style='width: 150px'>" + respuesta.products[key].reference + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta.products[key].brand + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta.products[key].category + "</td>";
                tableList+="<td style='width: 200px'>" + respuesta.products[key].materiales + "</td>";
                tableList+="<td style='width: 170px'>" + respuesta.products[key].dimensiones + "</td>";
                tableList+="<td style='width: 210px'>" + respuesta.products[key].description + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta.products[key].price + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta.quantities[key] + "</td>";
                tableList+="</tr>";
            };
            tableList+="</table>";
            tableList+="</div>";
            $("#orderDet").append(tableList);
        }
    });
}


function orderApr() {
    
    let order = JSON.parse(sessionStorage.getItem('order'));

    let dataJSON = {
        id:order.id,
        status:"Aprobada"
    }

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
        url:"http://132.226.250.48:8083/api/order/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Order aprobada satisfactoriamente.");
            orderDet();
        }
    });
} 

function orderRej() {
    
    let order = JSON.parse(sessionStorage.getItem('order'));

    let dataJSON = {
        id:order.id,
        status:"Rechazada"
    }

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
        url:"http://132.226.250.48:8083/api/order/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Order rechazada satisfactoriamente.");
            orderDet();
        }
    });
} 

function orderPen(id) {
    
    let order = JSON.parse(sessionStorage.getItem('order'));

    let dataJSON = {
        id:order.id,
        status:"Pendiente"
    }

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
        url:"http://132.226.250.48:8083/api/order/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Order en estado Pendiente.");
            orderDet();
        }
    });
} 




$(document).ready(function () {
        
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null | user.type != "COORD") {
        location.href="index.html";
    } 
    orderDet();
});

