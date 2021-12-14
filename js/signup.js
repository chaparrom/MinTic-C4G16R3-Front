function signup() {
    if ($("#name").val() != "" && $("#email").val() != "" && $("#identification").val()!="" && 
        $("#password").val() != "" && $("#address").val() != "" && $("#cellPhone").val() != "" &&
        $("#zone").val() != "" && $("#type").val() != "") {

        if ($("#password").val() == $("#password1").val()) {

            if(!userVal($("#email").val())) {

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
                        alert("Usuario creado satisfactoriamente ya puede ingresar a la aplicacion");
                        document.location.href="login.html";
                    }
                });
            }
            else{
                alert("Verifique el email porque el usuario ya se encuentra registrado");
            }
        }
        else {
            alert("La contraseña y la confirmación no son iguales");            
        }
    }
    else {
        alert("Por favor digitar toda la información solicitada");            
    }
}  

function userVal(email){

    $.ajax({
        url:"http://132.226.250.48:8083/api/user/emailexist/" + email,
        type:"GET",
        success:function(respuesta){

            return(respuesta)
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert( 'Error!!' );
    });
}
