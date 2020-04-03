//Hace la validacion del usuario y la contraseña
$("#frmLogin").submit(function(e){

    var usuario    = $("#loginUsuario").val();
    var contra     = $("#loginContra").val();

    $.ajax({
        url:"../mLogin/validar_login.php",
        type:"POST",
        dateType:"json",
        data:{usuario,contra},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
             //console.log(respuesta);
            var registros=dataArray.cRegistros;
            var dias=dataArray.dias;
            if (registros !=0 ) {//existe el usuario
                if(dias < 0){//caducidad
                    swal({
                        title: "Mensaje!",
                        text: "A caducado tu suscripción al sistema",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        $("#btnIngresar , #checkCR").attr("disabled","disabled");
                        var h_sidebar="#c0392b";
                        var color_base="#e74c3c";
                        var letra_color="#fff";
                        var color_borde="#e74c3c";
                        cssTema(h_sidebar,color_base,letra_color,color_borde);
                        $("#icoLogin").removeClass("fas fa-unlock");
                        $("#icoLogin").addClass("fas fa-lock");
                        $("#frmLogin")[0].reset();
                        $("#loginUsuario").focus();
                    });

                }else{
                    $("#contentLogin").hide();
                    $("#contentSistema").show();
                    CambioContraseña();
                    
                    persona=dataArray.result.persona;
                    idUsuario=dataArray.result.id_usuario;
                    idDato=dataArray.result.id_dato;

                    $("#titular").text(persona);

                    $('#sidebar').toggleClass('active');
                    permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                    preloader(1,'Asitencia del personal');
                    actividad  = "Ingreso al sistema";
                    log(actividad,dataArray.result.id_usuario);
                    verAsistencias();
                    
                }
            }else{
                swal({
                    title: "Mensaje!",
                    text: "La contraseña es incorrecta.",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    $("#btnIngresar , #checkCR").attr("disabled","disabled");
                    var h_sidebar="#c0392b";
                    var color_base="#e74c3c";
                    var letra_color="#fff";
                    var color_borde="#e74c3c";
                    cssTema(h_sidebar,color_base,letra_color,color_borde);
                    $("#icoLogin").removeClass("fas fa-unlock");
                    $("#icoLogin").addClass("fas fa-lock");
                    $("#frmLogin")[0].reset();
                    $("#loginUsuario").focus();
                });

            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
    
    e.preventDefault();
    return false;
});

//permisoa partes del menu
function permisos(datos,ecivil,usuarios,temas){
    if(datos=='si'){
        $("#liDatos").show();
    }else{
        $("#liDatos").hide();
    }

    if(ecivil=='si'){
        $("#liEcivil").show();
    }else{
        $("#liEcivil").hide();
    }

    if(usuarios=='si'){
        $("#liUsuarios").show();
    }else{
        $("#liUsuarios").hide();
    }

    if(temas=='si'){
        $("#liTemas").show();
    }else{
        $("#liTemas").hide();
    }
}

//Revisa si existe el usuario y aplica el tema del mismo
$("#loginUsuario").keyup(function(){
    valor=$(this).val();
    $.ajax({
        url:"../mLogin/rUsuario.php",
        type:"POST",
        dateType:"json",
        data:{valor},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            //console.log(respuesta);
            var registros=dataArray.cRegistros;
            if (registros !=0 ) {
                //$("#frmLogin").hide();
                idTema=dataArray.result.id_tema;
                aplicarTema(idTema,'login');
                $("#btnIngresar , #checkCR").removeAttr("disabled");
                $("#icoLogin").removeClass("fas fa-lock");
                $("#icoLogin").addClass("fas fa-unlock");
                $("#inicioIdusuario").val(dataArray.result.id_usuario);
                $("#inicioIdDato").val(dataArray.result.id_dato);
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //$("#frmLogin").fadeIn();
            }else{
                //colores default
                $("#icoLogin").removeClass("fas fa-unlock");
                $("#icoLogin").addClass("fas fa-lock");
                $("#btnIngresar , #checkCR").attr("disabled","disabled");
                var h_sidebar="#2f3640";
                var color_base="#353b48";
                var letra_color="#fff";
                var color_borde="#40739e";
                cssTema(h_sidebar,color_base,letra_color,color_borde);
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
});

function CambioContraseña() {
    var chec
    if (($("#checkCR").prop('checked') == false)) {
        chec = 0;
    }else{
        chec = 1;
    }

    if (chec == 1) {
        swal({
            title: "",
            text: "¿Deseas cambiar la contraseña?",
            type: "input",
            showCancelButton: true,
            confirmButtonClass: "btn-dark",
            confirmButtonText: "Continuar",
            cancelButtonText: "Generar contraseña",
            cancelButtonClass: "btn-outline-primary",
                closeOnConfirm: false,
                closeOnCancel: false,
                inputPlaceholder: "Nueva contraseña "

            },  function (inputValue) {
                
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                  }
                if (inputValue.length < 8) {
                    swal.showInputError("You need to write something!");
                    return false
                  }
              if ( inputValue.length >= 8) {
             
                if ( inputValue.length >= 8) {
                    swal({
                        title: "Confirmar Contraseña!",
                        type: "input",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Confirmar",
                        showCancelButton: false,
                        closeOnConfirm: false,
                        inputPlaceholder: "Confirmar nueva contraseña "
                      }, function (inputValueC) {
                        
                        if (inputValue == inputValueC) {
                            
                            id     = $("#inicioIdusuario").val();
                            contra = inputValueC;
                            dato   = $("#inicioIdDato").val();
                            $.ajax({
                                url:"../mLogin/ContaseñaNueva.php",
                                type:"POST",
                                dateType:"json",
                                data:{id,contra,dato},
                                success:function(respuesta){
                                    swal("Contraseña Actualizada!", " " , "success",2000);
                                alertify.success("<i class='fas fa-file-upload'></i>",1);
                                },
                                error:function(xhr,status){
                                    alert("Error en metodo AJAX"); 
                                },
                            });
                        }
    
                      });
                }else{
                    alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
                }
                
                  var idUsuario=$("#inicioIdusuario").val();
                  actividad  ="El usuario cambio su contraseña";
                  log(actividad,idUsuario);
                  
              }
              else{
                
                var aleatorio = Math.round(Math.random()* (11111111, 99999999));
                id     = $("#inicioIdusuario").val();
                contra = aleatorio;
                dato   = $("#inicioIdDato").val();
                $.ajax({
                    url:"../mLogin/ContaseñaNueva.php",
                    type:"POST",
                    dateType:"json",
                    data:{id,contra,dato},
                    success:function(respuesta){
                        swal("Contraseña Actualizada!", 'Su nueva contraseña es "'+aleatorio+'"', "success");
                        // alertify.success("<i class='fas fa-file-upload'></i>",1);
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX"); 
                    },
                });

                var idUsuario=$("#inicioIdusuario").val();
                  actividad  ="El usuario cambio su contraseña";
                  log(actividad,idUsuario);
              }
            });
    }


}