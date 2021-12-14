function userQry(){
    
    $("#userList").empty();

    $("#id").val("");
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");
    $("#cellPhone").val("");
    $("#email").val("");
    $("#password").val("");
    $("#zone").val("");
    $("#type").val("");
    document.getElementById('botonUpd').disabled = true;
    document.getElementById('botonAdd').disabled = false;

    
    $.ajax({
        url:'http://132.226.250.48:8083/api/user/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){

            let tableList="<div class='table-responsive'>";
            tableList+="<table class='table'>";
            tableList+="<thead class='thead-light'>";
            tableList+="<tr>";
            tableList+="<th> Id </th>";
            tableList+="<th> Identificacion </th>";
            tableList+="<th> Nombre </th>";
            tableList+="<th> Dirección </th>";
            tableList+="<th> Celular </th>";
            tableList+="<th> Correo Electrónico </th>";
            tableList+="<th> Zona </th>";
            tableList+="<th> Tipo </th>";
            tableList+="<th colspan='2'> Acciones </th> </tr>";
            tableList+="</tr>";

            for(i=0;i<respuesta.length;i++){
                console.log(respuesta);
                tableList+="<tr>";
                tableList+="<td style='width: 10px'>" + respuesta[i].id + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta[i].identification + "</td>";
                tableList+="<td style='width: 220px'>" + respuesta[i].name + "</td>";
                tableList+="<td style='width: 210px'>" + respuesta[i].address + "</td>";
                tableList+="<td style='width: 150px'>" + respuesta[i].cellPhone + "</td>";
                tableList+="<td style='width: 210px'>" + respuesta[i].email + "</td>";
                tableList+="<td style='width: 80px'>" + respuesta[i].zone + "</td>";
                if (respuesta[i].type == "COORD") {
                    tableList+="<td style='width: 200px'>Coordinadores de Zona</td>";
                }
                else{
                    if (respuesta[i].type == "ASE") {
                        tableList+="<td style='width: 200px'>Asesor Comercial</td>";
                    }
                    else {
                        tableList+="<td style='width: 200px'>Administrador</td>";
                    }
                }
                tableList+="<td> <button class='btn btn-secondary' onclick='userDel(" + JSON.stringify(respuesta[i].id) + ")'>Borrar</button>";
                tableList+="<td> <button class='btn btn-secondary' onclick='userSel(" + JSON.stringify(respuesta[i].email) +", " + JSON.stringify(respuesta[i].password) + ")'>Seleccionar</button>";
                tableList+="</tr>";
            }
            tableList+="</table>";
            tableList+="</div>";
            $("#userList").append(tableList);
        }
    });
}

function userAdd() {
    
    if ($("#name").val() != "" && $("#email").val() != "" && $("#identification").val()!="" && 
        $("#password").val() != "" && $("#address").val() != "" && $("#cellPhone").val() != "" &&
        $("#zone").val() != "" && $("#type").val() != "") {

            if(!userVal()) {

                let dataJSON = {
                    identification:$("#identification").val(),
                    name:$("#name").val(),
                    address:$("#address").val(),
                    cellPhone:$("#cellPhone").val(),
                    email:$("#email").val(),
                    password:$("#password").val(),
                    zone:$("#zone").val(),
                    type:$("#type").val(),
                }
        
                let dataToSend = JSON.stringify(dataJSON);

                $.ajax({
                    url:"http://132.226.250.48:8083/api/user/new",
                    type:"POST",
                    data:dataToSend,
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        alert("Usuario creado satisfactoriamente.");
                        userQry();
                    }
                });
            }
            else{
                alert("Usuario ya se encuentra registrado.");
            }
    }
    else {
        alert("Por favor digitar toda la información solicitada");            
    }
}  

function userVal(){

    $.ajax({
        url:"http://132.226.250.48:8083/api/user/emailexist/" + $("#email").val(),
        type:"GET",
        success:function(respuesta){

            return(respuesta)
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!!' );
    });
}


function userDel(id){

    $.ajax({
        url:"http://132.226.250.48:8083/api/user/"+id,
        type:"DELETE",
        success:function(respuesta){
            userQry();
            alert("Usuario eliminado satisfactoriamente")
        }
    });
}

function userSel(email, password){
    console.log(email);
    $.ajax({
        url:"http://132.226.250.48:8083/api/user/"+email + "/" + password,
        type:"GET",

        success:function(respuesta){
            console.log(respuesta);
            $("#id").val(respuesta.id),
            $("#identification").val(respuesta.identification),
            $("#name").val(respuesta.name),
            $("#address").val(respuesta.address),
            $("#cellPhone").val(respuesta.cellPhone)
            $("#email").val(respuesta.email)
            $("#password").val(respuesta.password)
            $("#zone").val(respuesta.zone)
            $("#type").val(respuesta.type)
            document.getElementById('botonUpd').disabled = false;
            document.getElementById('botonAdd').disabled = true;
        }
    });
}

function userUpd() {
    
    if ($("#name").val() != "" && $("#email").val() != "" && $("#identification").val()!="" && 
        $("#password").val() != "" && $("#address").val() != "" && $("#cellPhone").val() != "" &&
        $("#zone").val() != "" && $("#type").val() != "") {

            if(!userVal()) {

                let dataJSON = {
                    id:$("#id").val(),
                    identification:$("#identification").val(),
                    name:$("#name").val(),
                    address:$("#address").val(),
                    cellPhone:$("#cellPhone").val(),
                    email:$("#email").val(),
                    password:$("#password").val(),
                    zone:$("#zone").val(),
                    type:$("#type").val(),
                }
        
                let dataToSend = JSON.stringify(dataJSON);

                $.ajax({
                    url:"http://132.226.250.48:8083/api/user/update",
                    type:"PUT",
                    data:dataToSend,
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        alert("Usuario actualizado satisfactoriamente.");
                        userQry();
                    }
                });
            }
            else{
                alert("Usuario ya se encuentra registrado");
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
    userQry();
});
