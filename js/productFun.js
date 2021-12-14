function productQry(){
    
    $("#productList").empty();

    $("#reference").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#materiales").val("");
    $("#dimensiones").val("");
    $("#description").val("");
    $("#availability").val("");
    $("#price").val("");
    $("#quantity").val("");
    $("#photography").val("");
    document.getElementById('reference').disabled = false;
    document.getElementById('botonUpd').disabled = true;
    document.getElementById('botonAdd').disabled = false;
    
    $.ajax({
        url:'http://132.226.250.48:8083/api/cookware/all',
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
            tableList+="<th> Fotografía </th>";
            tableList+="<th colspan='2'> Acciones </th> </tr>";
            tableList+="</tr>";

            for(i=0;i<respuesta.length;i++){
                console.log(respuesta);
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
                tableList+="<td style='width: 210px'>" + respuesta[i].photography + "</td>";
                tableList+="<td> <button class='btn btn-secondary' onclick='productDel("+ JSON.stringify(respuesta[i].reference) +")'>Borrar</button>";
                tableList+="<td> <button class='btn btn-secondary' onclick='productSel("+ JSON.stringify(respuesta[i].reference) +")'>Seleccionar</button>";
                tableList+="</tr>";
            }
            tableList+="</table>";
            tableList+="</div>";
            $("#productList").append(tableList);
        }
    });
}

function productAdd() {
    
    if ($("#reference").val() != "" && $("#brand").val() != "" && $("#category").val()!="" && 
        $("#materiales").val() != "" && $("#dimensiones").val() != "" && $("#description").val() != "" && 
        $("#availability").val() != "" && $("#price").val() != "" && $("#quantity").val() != "" && $("#photography").val() != "") {

            if(!productVal()) {

                let dataJSON = {
                    reference:$("#reference").val(),
                    brand:$("#brand").val(),
                    category:$("#category").val(),
                    materiales:$("#materiales").val(),
                    dimensiones:$("#dimensiones").val(),
                    description:$("#description").val(),
                    availability:$("#availability").val(),
                    price:$("#price").val(),
                    quantity:$("#quantity").val(),
                    photography:$("#photography").val()
                }
        
                let dataToSend = JSON.stringify(dataJSON);
console.log(dataToSend)
                $.ajax({
                    url:"http://132.226.250.48:8083/api/cookware/new",
                    type:"POST",
                    data:dataToSend,
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        console.log(respuesta)
                        alert("Producto creado satisfactoriamente.");
                        productQry();
                    }
                });
            }
            else{
                alert("El producto ya se encuentra registrado");
            }
    }
    else {
        alert("Por favor digitar toda la información solicitada");            
    }
   
}  

function productVal(){

    $.ajax({
        url:"http://132.226.250.48:8083/api/cookware/" + $("#reference").val(),
        type:"GET",
        success:function(respuesta){

            return(respuesta)
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!!' );
    });
}

function productDel(reference){

    $.ajax({
        url:"http://132.226.250.48:8083/api/cookware/"+reference,
        type:"DELETE",
        success:function(respuesta){
            alert("Producto eliminado satisfactoriamente")
            productQry();

        }
    });
}

function productSel(reference){

    $.ajax({
        url:"http://132.226.250.48:8083/api/cookware/"+reference,
        type:"GET",
        success:function(respuesta){
            console.log(respuesta)
            $("#reference").val(respuesta.reference);
            $("#brand").val(respuesta.brand);
            $("#category").val(respuesta.category);
            $("#materiales").val(respuesta.materiales);
            $("#dimensiones").val(respuesta.dimensiones);
            $("#description").val(respuesta.description);
            $("#availability").val(respuesta.availability.toString());
            $("#price").val(respuesta.price);
            $("#quantity").val(respuesta.quantity);
            $("#photography").val(respuesta.photography);
            document.getElementById('reference').disabled = true;
            document.getElementById('botonUpd').disabled = false;
            document.getElementById('botonAdd').disabled = true;
        }
    });
}

function productUpd() {
    
    if ($("#reference").val() != "" && $("#brand").val() != "" && $("#category").val()!="" && 
        $("#materiales").val() != "" && $("#dimensiones").val() != "" && $("#description").val() != "" && 
        $("#availability").val() != "" && $("#price").val() != "" && $("#quantity").val() != "" && $("#photography").val() != "") {

            if(!productVal()) {
                console.log("update", $("#availability").val())                    
                if ($("#availability").val() == "true") {
                    var answer = 1;
                }
                else {
                    var answer = 0;
                }
                console.log(answer)

                let dataJSON = {
                    reference:$("#reference").val(),
                    brand:$("#brand").val(),
                    category:$("#category").val(),
                    materiales:$("#materiales").val(),
                    dimensiones:$("#dimensiones").val(),
                    description:$("#description").val(),
                    availability:$("#availability").val(),
                    price:$("#price").val(),
                    quantity:$("#quantity").val(),
                    photography:$("#photography").val()
                }
        
                let dataToSend = JSON.stringify(dataJSON);

                $.ajax({
                    url:"http://132.226.250.48:8083/api/cookware/update",
                    type:"PUT",
                    data:dataToSend,
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        alert("Producto actualizado satisfactoriamente.");
                        productQry();  
                    }
                });
            }
            else{
                alert("Verifique porque el usuario ya se encuentra registrado");
            }
    }
    else {
        alert("Por favor digitar toda la información solicitada");            
    }
}  

$(document).ready(function () {
        
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user === null | user.type != "ADM") {
        location.href="index.html";
    } 
    productQry();
});

