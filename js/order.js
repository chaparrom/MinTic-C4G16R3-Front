let referenceArr = [];
let brandArr = [];
let descriptionArr = [];
let priceArr = [];
let quantityArr = [];
var bPreguntar = true;

function salesManQry(){
  
    $("#orderList").empty();

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
            document.getElementById('identification').value=respuesta.identification;
            document.getElementById('name').value=respuesta.name;
            document.getElementById('email').value=respuesta.email;
            document.getElementById('zone').value=respuesta.zone;
        }
    });
}

function orderQry(){

    $("#orderList").empty();
    $("#reference").val("");
    $("#brand").val("");
    $("#description").val("");
    $("#price").val("");
    $("#quantity").val("");
    $("#quantityOrd").val("");


    let tableList1="<div class='table-responsive'>";
    tableList1+="<table class='table'>";
    tableList1+="<thead class='thead-light'>";
    tableList1+="<tr>";
    tableList1+="<th> Referencia </th>";
    tableList1+="<th> Marca </th>";
    tableList1+="<th> Descripcion </th>";
    tableList1+="<th> Precio </th>";
    tableList1+="<th> Cantidad </th>";
    tableList1+="<th colspan='2'> Acciones </th> </tr>";
    tableList1+="</tr>";

    for(i=0;i<referenceArr.length;i++){
        tableList1+="<tr>";
        tableList1+="<td style='width: 150px'>" + referenceArr[i] + "</td>";
        tableList1+="<td style='width: 150px'>" + brandArr[i] + "</td>";
        tableList1+="<td style='width: 210px'>" + descriptionArr[i] + "</td>";
        tableList1+="<td class='numbers'>" + priceArr[i] + "</td>";
        tableList1+="<td class='numbers'>" + quantityArr[i] + "</td>";
        tableList1+="<td> <button class='btn btn-secondary' onclick='productDel("+ JSON.stringify(referenceArr[i]) +")'>Eliminar</button>";
        tableList1+="</tr>";
    }
    tableList1+="</table>";
    tableList1+="</div>";
    $("#orderList").append(tableList1);
}

function orderAdd(){

    let reference = referenceArr.find(reference => reference === $("#reference").val());

    if (reference === undefined) {
        if ($("#reference").val() != "") {
            if ($("#quantityOrd").val() != "") {
                referenceArr.push($("#reference").val());
                brandArr.push($("#brand").val());
                descriptionArr.push($("#description").val());
                priceArr.push($("#price").val());
                quantityArr.push($("#quantityOrd").val());
                orderQry();
            }
            else
                alert("Para adicionar el producto\n debe digitar la cantidad solicitada");
        }
        else
            alert("Para adicionar un producto\nPrimero debe escogerlo");
    }
    else {
        alert("Este producto ya ha sido ingresado");
        orderQry();
    }
    
}

function orderCre(){

    if (referenceArr.length > 0) {

        let user = JSON.parse(sessionStorage.getItem('user'));

        let date = new Date();

        let data = '{"registerDay":"' + date.toISOString() + '",';
            data +='"status":"Pendiente",';

        let salesMan = '';

        $.ajax({
            url:'http://132.226.250.48:8083/api/user/'+user.id,
            type:'GET',
            datatype:'JSON',
            async:false,
            success:function(respuesta){
                salesMan +=  JSON.stringify(respuesta);
            }
        });
    
        data += '"salesMan":' + salesMan + ',';

        console.log(data)

        let products = '';

        for(i=0;i<referenceArr.length;i++){

            $.ajax({

                url:'http://132.226.250.48:8083/api/cookware/'+ referenceArr[i],
                type:'GET',
                datatype:'JSON',
                async:false,
                success:function(respuesta){
                    products += '"' + referenceArr[i] + '":' + JSON.stringify(respuesta)
                    if (i+1 < referenceArr.length)
                        products += ',';
                }
            });
        }

        data += '"products":{' + products + '},';

        console.log(data)

        let quantities = '';

        for(i=0;i<referenceArr.length;i++){

            quantities += '"' + referenceArr[i] + '":' + quantityArr[i];
            if (i+1 < referenceArr.length)
                quantities += ',';

        }

        data += '"quantities":{' + quantities + '}}';

        console.log(data);

        $.ajax({
            url:"http://132.226.250.48:8083/api/order/new",
            type:"POST",
            data:data,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta)
                referenceArr.splice(0,referenceArr.length);

                alert("Orden número " +respuesta.id + ", creada satisfactoriamente.");
                document.location.href="advisor.html";
            }
        });
    }
    else 
    alert("No se han seleccionado productos para crear una orden.")
}

function productDel(reference){

    let pos = referenceArr.indexOf(reference);
    console.log(pos)
    referenceArr.splice(pos,1);
    brandArr.splice(pos, 1);
    descriptionArr.splice(pos, 1);
    priceArr.splice(pos, 1);
    quantityArr.splice(pos, 1);
    console.log(referenceArr)
    orderQry();
}

function productQry(){
    
    $("#productList").empty();

    $.ajax({
        url:'http://132.226.250.48:8082/api/cookware/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){

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
            tableList+="<th> Disponibilidad </th>";
            tableList+="<th> Precio </th>";
            tableList+="<th> Cantidad </th>";
            tableList+="<th colspan='2'> Acciones </th> </tr>";
            tableList+="</tr>";

            for(i=0;i<respuesta.length;i++){
                tableList+="<tr>";
                tableList+="<td style='width: 150px'>" + respuesta[i].reference + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta[i].brand + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta[i].category + "</td>";
                tableList+="<td style='width: 200px'>" + respuesta[i].materiales + "</td>";
                tableList+="<td style='width: 170px'>" + respuesta[i].dimensiones + "</td>";
                tableList+="<td style='width: 210px'>" + respuesta[i].description + "</td>";
                if (respuesta[i].availability == true){
                    tableList+="<td style='width: 90px'>Si</td>";
                }
                else{
                    tableList+="<td style='width: 90px'>No</td>";
                }

                tableList+="<td style='width: 150px'>" + respuesta[i].price + "</td>";
                tableList+="<td style=' width: 150px'>" + respuesta[i].quantity + "</td>";
                tableList+="<td> <button class='btn btn-secondary' onclick='productSel("+ JSON.stringify(respuesta[i].reference) +")'>Seleccionar</button>";
                tableList+="</tr>";
            }
            tableList+="</table>";
            tableList+="</div>";
            $("#productList").append(tableList);
        }
    });
}

function productSel(reference){

    $.ajax({
        url:"http://132.226.250.48:8082/api/cookware/"+reference,
        type:"GET",
        success:function(respuesta){

            if (respuesta.availability === true) {
                $("#reference").val(respuesta.reference);
                $("#brand").val(respuesta.brand);
                $("#description").val(respuesta.description);
                $("#price").val(respuesta.price);
                $("#quantity").val(respuesta.quantity);
            }
            else
                alert("El producto no está disponible")
        }
    });
}

function exit() {
 
    if ( bPreguntar & referenceArr.length > 0 ) {
        

        if (window.confirm ("¿Seguro que quieres salir?")) {
            window.onunload = function () {
                return true;
            }
        } else {
            return false;
        }
    }
}

$(document).ready(function () {
        
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null | user.type != "ASE") {
        location.href="index.html";
    } 
    salesManQry();
    orderQry();
    productQry();
});