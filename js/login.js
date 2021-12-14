function login(){
    if ($("#useremail").val() != "" && $("#password").val()!="") {

        $.ajax({
            url:"http://132.226.250.48:8083/api/user/"+ $("#useremail").val() + "/" + $("#password").val(),
            type:"GET",
            contentType: "application/JSON",
            datatype: "JSON",
            error:function(result){
             console.log(result)
            },
            success:function(respuesta){
                if (respuesta.name === null) {
                    alert("La cuenta o la contraseña no concuerdan");
                    document.location.href="login.html";
                }
                else{

                    sessionStorage.setItem('user', JSON.stringify(respuesta));
                    
                    alert("Bienvenido " + respuesta.name + " a la aplicación");

                    if (respuesta.type === "ADM") 
                        document.location.href="admin.html";
                    else
                        if (respuesta.type === "ASE") 
                            document.location.href="advisor.html";
                        else
                            if (respuesta.type === "COORD") 
                                document.location.href="coordinator.html";
                            else
                                document.location.href="index.html";
                }
            }
        });
    }
}
