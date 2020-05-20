//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS

var nombreModulo_Us="Usuarios";

function llenar_lista_Us(){
    abrirModalCarga('Cargando Lista');

    $("#frmGuardar-Us")[0].reset();
    
    $("#Listado-Us").hide();
    $.ajax({
        url:"../mUsuarios/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-Us").html(respuesta);
            $("#Listado-Us").fadeIn("slow");
            cerrarModalCarga();      
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}
function cambiar_estatus_Us(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mUsuarios/cStatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-Us"+consecutivo).removeAttr('disabled');
                $("#btnResetPass-Us"+consecutivo).removeAttr('disabled');
                $("#btnPermisosUs-Us"+consecutivo).removeAttr('disabled');
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_Us;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-Us"+consecutivo).attr('disabled','disabled');
                $("#btnResetPass-Us"+consecutivo).attr('disabled','disabled');
                $("#btnPermisosUs-Us"+consecutivo).attr('disabled','disabled');
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_Us;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}
function AppagarSwitch() {
    $("#checkDp, #checkDpE, #checkDpM").bootstrapToggle('off');
    $("#checkEc, #checkEcE, #checkEcM").bootstrapToggle('off');
    $("#checkUs, #checkUsE, #checkUsM").bootstrapToggle('off');
    $("#checkTm, #checkTmE, #checkTmM").bootstrapToggle('off');
}
function llenar_formulario_Us(id,IDD,user_name,IDT, checkDp, checkEc, checkUs, checkTm, fechaC){

    $('#Dp').hide();
    $('#Ec').hide();
    $('#Us').hide();
    $('#Tm').hide();
    $("#eIDUs").val(id);
    $("#person_nameE").val(IDD);
    $("#UsTemaE").val(IDT);
    $("#UserName").val(user_name);
    $("#UsFechaCdu").val(fechaC);

    (checkDp == 'si') ? $("#checkDpE").bootstrapToggle('on') : $("#checkDpE").bootstrapToggle('off');
    (checkEc == 'si') ? $("#checkEcE").bootstrapToggle('on') : $("#checkEcE").bootstrapToggle('off');
    (checkUs == 'si') ? $("#checkUsE").bootstrapToggle('on') : $("#checkUsE").bootstrapToggle('off');
    (checkTm == 'si') ? $("#checkTmE").bootstrapToggle('on') : $("#checkTmE").bootstrapToggle('off');

    selectTwo();

    $("#lblTitular").text(nombreModulo_Us);
    $("#badgeInfo").text("Modificar Usuario");

    $("#guardar-Us").hide();
    $("#Listado-Us").hide();
    $("#editar-Us").fadeIn();
    $("#UserNameE").focus();
}
$("#btnCancelarG-Us , #btnCancelarE-Us").click(function(){
    $("#editar-Us").hide();
    $("#guardar-Us").hide();

    AppagarSwitch();

    $("#lblTitular").text(nombreModulo_Us);
    $("#badgeInfo").text("Lista");

    $("#Listado-Us").fadeIn();
 
});
function UpDateUserCompr(user_name, id){
    $.ajax({
        url:"../mUsuarios/UpDateCompUser.php",
        type:"POST",
        dateType:"html",
        data:{user_name, id},
        success:function(respuesta){
            $('#UsNameComp').val(respuesta);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX guardar compro"); 
        },
    });
}
function UpDateUserPersonCompr(person_name, id){
    $.ajax({
        url:"../mUsuarios/UpDateCompPerson.php",
        type:"POST",
        dateType:"html",
        data:{ id, person_name},
        success:function(respuesta){
            $('#PerNameComp').val(respuesta);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX guardar compro"); 
        },
    });
}
function InsertUserCompr(user_name){
    $.ajax({
        url:"../mUsuarios/InsertCompUser.php",
        type:"POST",
        dateType:"html",
        data:{user_name},
        success:function(respuesta){
            $('#UsNameCompG').attr('value',respuesta);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX guardar compro"); 
        },
    });
}
$("#frmActualizar-Us").submit(function(e){
    var id          = $("#eIDUs").val();
    var user_name   = $("#UserName").val();
    var UsFechaCdu  = $("#UsFechaCdu").val();
    var person_name = $("#person_nameE").val();
    var UsTema      = $("#UsTemaE").val();
    var checkDp     = ($("#checkDpE").prop( "checked" ) == true) ? 'si': 'no' ;
    var checkEc     = ($("#checkEcE").prop( "checked" ) == true) ? 'si': 'no' ;
    var checkUs     = ($("#checkUsE").prop( "checked" ) == true) ? 'si': 'no' ;
    var checkTm     = ($("#checkTmE").prop( "checked" ) == true) ? 'si': 'no' ;
    
    UpDateUserCompr(user_name, id);
    UpDateUserPersonCompr(person_name, id);
    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Actualizar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si deseo actualizarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true,
        showCloseButton: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            var UsName = $('#UsNameComp').val();
            var PerName = $('#PerNameComp').val();
            if (UsName == 'Si' && PerName == 'Si') {
                $.ajax({
                    url:"../mUsuarios/UpdateUs.php",
                    type:"POST",
                    dateType:"html",
                    data:{id, person_name, user_name, UsFechaCdu, UsTema, checkDp, checkEc, checkUs, checkTm},
                    success:function(respuesta){
                        swal({
                            title: "Listo!",
                            text: "Usuario Modificado",
                            type: "success",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            swal.close();
                            llenar_lista_Us();
                            $("#frmGuardar-Us")[0].reset();
                            $("#frmActualizar-Us")[0].reset();
                            alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                            $("#btnCancelarG-Us , #btnCancelarA-Us").click();
                            actividad  ="Se ha modificado un registro de la tabla tabla "+nombreModulo_Us;
                            var idUser=$("#inicioIdusuario").val();
                            log(actividad,idUser);
                        });
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX"); 
                    },
                });
            }else{
                if (PerName == 'No' && UsName == 'No') {
                    swal({
                        title: "Error!",
                        text: "La persona y el usuario ya esta registrados",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        alertify.message("Gracias !");
                    });
                } else if (UsName == 'No') {
                    swal({
                        title: "Error!",
                        text: "Ya existe un usuario con ese nombre",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        alertify.message("Gracias !");
                    });
                } else if (PerName == 'No') {
                    swal({
                        title: "Error!",
                        text: "Esta persona ya cuenta con un usuario",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        alertify.message("Gracias !");
                    });
                }
            }

        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});
$("#frmGuardar-Us").submit(function(e){ 

    var person_name = $("#person_name").val();
    var user_name  = $("#UserNameG").val();
    var UsFechaCdu = $("#UsFechaCduG").val();
    var UsTema = $("#UsTema").val();
    var checkDp;
    var checkEc;
    var checkUs;
    var checkTm;


    if ($("#BtnPermisosE").hasClass( "active" ) == true) {
        checkDp = ($("#checkDp").prop( "checked" ) == true) ? 'si' : 'no' ;
        checkEc = ($("#checkEc").prop( "checked" ) == true) ? 'si' : 'no' ;
        checkUs = ($("#checkUs").prop( "checked" ) == true) ? 'si' : 'no' ;
        checkTm = ($("#checkTm").prop( "checked" ) == true) ? 'si' : 'no' ;
    }else{
        checkDp = 'no' ;
        checkEc = 'no' ;
        checkUs = 'no' ;
        checkTm = 'no' ;
    }
console.log(checkDp, checkEc, checkUs, checkTm);

    InsertUserCompr(user_name);
    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Guardar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si deseo guardarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {

            var UsName = $('#UsNameCompG').val();            
            if (UsName == 'Si') {
                $.ajax({
                    url:"../mUsuarios/InsertUser.php",
                    type:"POST",
                    dateType:"html",
                    data:{person_name, user_name, UsFechaCdu, UsTema, checkDp, checkEc, checkUs, checkTm},
                    success:function(respuesta){
                        swal({
                            title: "Usuario creado!",
                            text: "La contraseña es 12345678",
                            type: "success",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            swal.close();
                            $("#guardar-Us").hide();
                            llenar_lista_Us();
                            $("#frmGuardar-Us")[0].reset();
                            selectTwo();
                            alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                            actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_Us;
                            var idUser=$("#inicioIdusuario").val();
                            log(actividad,idUser);
                        });
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX el usuario guardar"); 
                    },
                });
            }else{
                    swal({
                        title: "Error!",
                        text: "Ya existe un usuario con ese nombre",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        alertify.message("Gracias !");
                    });
                
            }

        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });
    e.preventDefault();
    return false;
});
function nuevo_registro_Us(){
    $("#lblTitular").text(nombreModulo_Us);
    $("#badgeInfo").text("Nuevo registro");
    AppagarSwitch();
    combo_personasG();
    $('#Dp').hide();
    $('#Ec').hide();
    $('#Us').hide();
    $('#Tm').hide();



    $("#Listado-Us").hide();
    $("#guardar-Us").fadeIn();
    $('#frmGuardar-Us')[0].reset();
    $("#clave").focus();
}
function combo_personas()
{
    $.ajax({
        url : '../mUsuarios/cmbPerson.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#person_nameE").empty();
            $("#person_nameE").html(respuesta);    
            selectTwo();
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}
function combo_personasG()
{
    $.ajax({
        url : '../mUsuarios/InsertCompPerson.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#person_name").empty();
            $("#person_name").html(respuesta);    
            selectTwo();
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}
function combo_temas()
{
    $.ajax({
        url : '../mUsuarios/cmbTheme.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#UsTema , #UsTemaE").empty();
            $("#UsTema , #UsTemaE").html(respuesta);    
            selectTwo();
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}
function ResetPass(id) {
    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas resetear las contraseña?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si deseo guardarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
                $.ajax({
                    url : '../mUsuarios/ResetPass.php',
                    data : {id},
                    type : 'POST',
                    dataType : 'html',
                    success : function(respuesta) {
                        swal({
                            title: "Listo!",
                            text: "Contraseña restablecida",
                            type: "success",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            swal.close();
                            alertify.message("Gracias !");
                        });
                    },
                    error : function(xhr, status) {
                        alert('Disculpe, existió un problema');
                    },
                });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });
}
function abrirModalPermisos_Us(id, user_name, checkDp, checkEc, checkUs, checkTm) {
    $('#IDUsM').val(id);
    $('#txtTitularPermisos').text('Permisos del usuario "'+ user_name+'"');
    (checkDp == 'si') ? $("#checkDpM").bootstrapToggle('on') : $("#checkDpM").bootstrapToggle('off');
    (checkEc == 'si') ? $("#checkEcM").bootstrapToggle('on') : $("#checkEcM").bootstrapToggle('off');
    (checkUs == 'si') ? $("#checkUsM").bootstrapToggle('on') : $("#checkUsM").bootstrapToggle('off');
    (checkTm == 'si') ? $("#checkTmM").bootstrapToggle('on') : $("#checkTmM").bootstrapToggle('off');

    $("#ModalPermisos").modal("show");
}
function GuardarM() {
    var id          = $("#IDUsM").val();
    var checkDp = ($("#checkDpM").prop( "checked" ) == true) ? 'si' : 'no' ;
    var checkEc = ($("#checkEcM").prop( "checked" ) == true) ? 'si' : 'no' ;
    var checkUs = ($("#checkUsM").prop( "checked" ) == true) ? 'si' : 'no' ;
    var checkTm = ($("#checkTmM").prop( "checked" ) == true) ? 'si' : 'no' ;
    swal({
        title: "¿Deseas continuar?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
                $.ajax({
                    url : '../mUsuarios/UpDatePermision.php',
                    data : {id, checkDp, checkEc, checkUs, checkTm},
                    type : 'POST',
                    dataType : 'html',
                    success : function(respuesta) {
                        swal({
                            title: "Listo!",
                            type: "success",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            swal.close();
                            alertify.message("Gracias!");
                            llenar_lista_Us();
                            $("#ModalPermisos").modal("hide");
                        });
                    },
                    error : function(xhr, status) {
                        alert('Disculpe, existió un problema');
                    },
                });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });
}
$('#BtnPermisosE').click(function() {
    if ($(this).hasClass( "active" ) == false) {
        $('#Dp').show();
        $('#Ec').show();
        $('#Us').show();
        $('#Tm').show();
        $("#checkDp").bootstrapToggle('on');
        $("#checkEc").bootstrapToggle('on');
        $("#checkUs").bootstrapToggle('on');
        $("#checkTm").bootstrapToggle('on');
        $(this).text('Con permisos');
    } else {
        $('#Dp').hide();
        $('#Ec').hide();
        $('#Us').hide();
        $('#Tm').hide();
        $(this).text('Sin permisos');
    }    
});