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
                        $("#checkCR").bootstrapToggle('on');
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
                    if (($("#checkCR").prop('checked'))) {
                        $('#modalContra').modal("show");
                        $("#btnGuardarContra").prop('disabled', true);
                    }else{

                        $("#contentLogin").hide();
                        $("#contentSistema").show();
                        
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
                        
                    }
                }else{
                swal({
                    title: "Mensaje!",
                    text: "La contraseña es incorrecta.",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    $("#checkCR").bootstrapToggle('off');
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

function LimpiarContras() {
$('#NContra, #CNContra').val('');
}

$('#MostrarNContra').click(function() {
       if ($('#NCOj').hasClass('fa-eye-slash')) {

            $('#NContra').removeAttr('type');
            $('#NCOj').addClass('fa-eye').removeClass('fa-eye-slash');
        }else{
            $('#NContra').attr('type','password');
            $('#NCOj').addClass('fa-eye-slash').removeClass('fa-eye');
       }
    });

$('#MostrarCNContra').click(function() {
       if ($('#CNCOj').hasClass('fa-eye-slash')) {

            $('#CNContra').removeAttr('type');
            $('#CNCOj').addClass('fa-eye').removeClass('fa-eye-slash');
        }else{
            $('#CNContra').attr('type','password');
            $('#CNCOj').addClass('fa-eye-slash').removeClass('fa-eye');
       }
    });

function GenerarContra() {
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ012346789";
    var contraseña = "";
    for (i=0; i<8; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    
    
    if (ValContra(contraseña)=="Si") {
        $('#NContra , #CNContra').val(contraseña);
        $('#CNContra').keyup();
        $('#NContra').keyup();
        $("#btnGuardarContra").prop('disabled', false);
    }else{
        GenerarContra();
    }
}

$('#CNContra').keyup(function() {
    var n = $('#NContra').val();
    var cn = $('#CNContra').val();
    if (n == cn) {
        $('#CNContra').css("color",'#02b44e');
        $("#btnGuardarContra").prop('disabled', false);
    }else{
        $('#CNContra').css("color", rojo);
        $("#btnGuardarContra").prop('disabled', true);
    }
});

$('#NContra').keyup(function () {
    valor=$(this);    
    //validar curp + expresion regular
    if (ValContra(valor.val())=="Si") {
        //$("#btnGuardar-DP").removeAttr('disabled');
        $(valor).css("color",'#02b44e');
        $('#CNContra').keyup();
    }else{
        //$("#btnGuardar-DP").attr('disabled','disabled');
        $(valor).css("color", rojo);
        $('#CNContra').keyup();
    }

});

function ValContra(contras) {
    var validador;
        var contraseña=contras;
    
        // Expresion regular para contraseña
        var re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
            validado = contraseña.match(re);
        
        if (!validado){  //Coincide con el formato general?
            validador = "No";
        }else{
            validador = "Si";
        }
        return validador;
}

function ContraNueva() {
    
        id                             = $("#loginUsuario").val();
        contra                         = $("#CNContra").val();

        $.ajax({
            url                        : "../mLogin/ContaseñaNueva.php",
            type                       : "POST",
            dateType                   : "json",
            data                       : {id,contra},
            success                    : function(respuesta){
                swal("Contraseña Actualizada!", " " , "success",2000);
                $("#loginContra").val(contra);
                // $("#frmLogin").submit();
              
                $("#btnIngresar").submit();
                $('#modalContra').modal("hide");
                $("#checkCR").bootstrapToggle('off');
                $("#checkCR").prop('checked',false);
                LimpiarContras();
                $('#CNContra , #NContra').keyup();
            },
            error                      : function(xhr,status){
                alert("Error en metodo AJAX"); 
            },
        }); 


    
}