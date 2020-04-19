//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//DATOS PERSONALES -DP 
var nombreModulo_DP="Datos Personales";

$("#frmGuardar-DP").submit(function(e){

    var clave    = $("#clave").val();
    var nombre    = $("#nombre").val();
    var apPaterno = $("#apPaterno").val();
    var apMaterno = $("#apMaterno").val();
    var fNac      = $("#fNac").val();
    var correo    = $("#correo").val();
    var curp      = $("#curp").val();
    var domicilio = $("#domicilio").val();
    var sexo      = $("#sexo").val();
    var ecivil    = $("#ecivil").val();

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
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/guardar.php",
                type:"POST",
                dateType:"html",
                data:{clave,nombre,apPaterno,apMaterno,fNac,correo,curp,domicilio,sexo,ecivil},
                success:function(respuesta){
                    
                    $("#guardar-DP").hide();
                    llenar_lista_DP();
                    $("#frmGuardar-DP")[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombre').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
        
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

$("#frmActualizar-DP").submit(function(e){

    var id        = $("#eId").val();
    var nombre    = $("#eNombre").val();
    var apPaterno = $("#eApPaterno").val();
    var apMaterno = $("#eApMaterno").val();
    var fNac      = $("#eFnac").val();
    var correo    = $("#eCorreo").val();
    var curp      = $("#eCurp").val();
    var clave     = $("#eClave").val();
    var domicilio = $("#eDomicilio").val();
    var sexo      = $("#eSexo").val();
    var ecivil    = $("#eEcivil").val();

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
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/actualizar.php",
                type:"POST",
                dateType:"html",
                data:{clave,id,nombre,apPaterno,apMaterno,fNac,correo,curp,clave,domicilio,sexo,ecivil},
                success:function(respuesta){
                    //console.log(respuesta);
                    llenar_lista_DP();
                        $("#frmGuardar-DP")[0].reset();
                        $("#frmActualizar-DP")[0].reset();
                        alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                    $("#btnCancelarG-DP , #btnCancelarA-DP").click();
                    actividad  ="Se ha modificado un registro de la tabla tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                    $('#nombre').focus();
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

function llenar_lista_DP(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-DP")[0].reset();
    $("#Listado-DP").hide();
    $.ajax({
        url:"../mDatosPersonales/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-DP").html(respuesta);
            $("#Listado-DP").fadeIn("slow");
            cerrarModalCarga();      
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function edad(fecha){
    $.ajax({
        url:"../mDatosPersonales/calcularEdad.php",
        type:"POST",
        dateType:"html",
        data:{fecha},
        success:function(respuesta){

            $("#edad").val(respuesta);
            $("#eEdad").val(respuesta);

            xedad= parseInt(respuesta);
            if (xedad < 0) {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", rojo);
            } else {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", obscuro);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil){
   
    $("#eId").val(id);
    $("#eClave").val(clave);
    $("#eNombre").val(nombre);
    $("#eApPaterno").val(apPaterno);
    $("#eApMaterno").val(apMaterno);
    $("#eFnac").val(fNac);
    $("#eEdad").val(edad);
    $("#eCorreo").val(correo);
    $("#eCurp").val(curp);
    $("#eClave").val(clave);
    $("#eDomicilio").val(domicilio);
    $("#eSexo").val(sexo);
    $("#eEcivil").val(ecivil);

    selectTwo();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-DP").hide();
    $("#Listado-DP").hide();
    $("#editar-DP").fadeIn();
    $("#eNombre").focus();
}

function cambiar_estatus_DP(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mDatosPersonales/cEstatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).removeAttr('disabled');
                $("#btnImprimir-DP"+consecutivo).removeAttr('disabled');
                $("#btnModal-DP"+consecutivo).removeAttr('disabled');
                $("#btnFoto-DP"+consecutivo).removeAttr('disabled');
                $("#btnSonido-DP"+consecutivo).removeAttr('disabled');
                $("#btnHorario-DP"+consecutivo).removeAttr('disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-mute fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-up fa-lg");
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).attr('disabled','disabled');
                $("#btnImprimir-DP"+consecutivo).attr('disabled','disabled');
                $("#btnModal-DP"+consecutivo).attr('disabled','disabled');
                $("#btnFoto-DP"+consecutivo).attr('disabled','disabled');
                $("#btnHorario-DP"+consecutivo).attr('disabled','disabled');
                $("#btnSonido-DP"+consecutivo).attr('disabled','disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-up fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-mute fa-lg");
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

function abrirModalDatos_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil) {
    $("#modalTitle-DP").text("Datos personales - "+nombre+' '+apPaterno);

    $("#mNombre").val(nombre);
    $("#mApPaterno").val(apPaterno);
    $("#mApMaterno").val(apMaterno);
    $("#mFnac").val(fNac);
    $("#mEdad").val(edad);
    $("#mCorreo").val(correo);
    $("#mCurp").val(curp);
    $("#mClave").val(clave);
    $("#mDomicilio").val(domicilio);
    $("#mSexo").val(sexo);
    $("#mEcivil").val(ecivil);

    selectTwo();

    $("#modalDatos-DP").modal("show");
}


//Manipulacion de eventos con jquery
$("#fNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);
    ;
});

$("#efNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);

});

$("#btnCancelarG-DP , #btnCancelarA-DP").click(function(){
    $("#editar-DP").hide();
    $("#guardar-DP").hide();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Lista");

    $("#Listado-DP").fadeIn();
 
});


$("#clave").keydown(function() {
    var valor=$(this).val();
    soloNumeros(valor);
});

$("#curp , #eCurp").keyup(function() {

    valor=$(this);
    // Convierte en mayuscula
    valor.val(valor.val().toUpperCase());
    
    //validar curp + expresion regular
    if (curpValida(valor.val())=="Si") {
        //$("#btnGuardar-DP").removeAttr('disabled');
        $(valor).toggleClass();
        alertify.success("Curp valida !",1);
    }else{
        //$("#btnGuardar-DP").attr('disabled','disabled');
        $(valor).css("color", rojo);
    }

});

$("#clave").keyup(function(){
    var valor=$(this).val();
    revisar_clave(valor);
});

//Manipulacion de eventos con jquery

//Revisar clave repetida
function revisar_clave(valor){
    $.ajax({
        url:"../mDatosPersonales/rClave.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            res =parseInt(respuesta);
            if (res == 0) {
                $("#clave").css("color", obscuro);
            }else{
                $("#clave").css("color", rojo);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//validar curp
function curpValida(valor) {

    var validador;
    var curp=valor;

    // Expresion regular para curp
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    
    if (!validado){  //Coincide con el formato general?
        validador = "No";
    }else{
        validador = "Si";
    }
    return validador;
}

//llenar combo
function combo_ecivil()
{
    $.ajax({
        url : '../mDatosPersonales/comboEcivil.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").empty();
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").html(respuesta);    
            selectTwo();
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function nuevo_registro_DP(){
    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-DP").hide();
    $("#guardar-DP").fadeIn();
    $('#frmGuardar-DP')[0].reset();
    $("#clave").focus();
    
}

function abrirModalFoto(id,clave,nombre,valorfoto) {

    $("#clavePersona").val(clave);
    $("#txtTitularFoto").text(nombre);

    if (valorfoto=="No") {
        $('#formVista').hide();
        $('#formSubida').fadeIn();
        $('#formSubida')[0].reset();
    }else{
        $('#formSubida').hide();
        $('#formVista').fadeIn();
        var archivo='../fotos/'+clave+".jpg";
        $("#imgFoto").attr("src",archivo);
    }
    
    $("#modalFoto").modal("show");

}

function  eliminarFoto(){

    var formData = new FormData();
    var clave=$('#clavePersona').val();
    formData.append('clave',clave);

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas eliminar la foto?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo eliminarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url: '../mDatosPersonales/fotoBorrar.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  var res=parseInt(response);
                  switch(res){
                    case 0 :
                        alertify.error("<i class='fa fa-times fa-lg'></i> No se encuentra el archivo",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                      break;
                    case 1 :
                        alertify.warning("<i class='fa fa-check fa-lg'></i> Foto Eliminada",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                        break;
                  }
        
                },
                error:function(xhr,status){
                    alertify.error('Error en proceso');
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

}

function subirFoto(){
    var formData = new FormData();

    var files = $('#image')[0].files[0];

    var clave=$('#clavePersona').val();
    var tam=$('#tamanoKB').val();

    formData.append('file',files);
    formData.append('clave',clave);
    formData.append('tam',tam);

    $.ajax({
        url: '../mDatosPersonales/fotoSubir.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          var res=parseInt(response);
          switch(res){
            case 0 :
                alertify.success("<i class='fas fa-file-upload'></i>",1);
                $("#modalFoto").modal("hide");
                llenar_lista_DP();
              break;
            case 1 :

                swal({
                    title: "Error!",
                    text: "No ha sido posible cargar el archivo debido a que este debe de tener extención jpg y no debe de sobrepasar los 3 megabytes",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    alertify.message("Gracias !");
                });
              break;
            default:
                  alertify.error("<i class='fa fa-times fa-lg'></i>",1);
          }

        },
        error:function(xhr,status){
            alertify.error('Error en proceso');
        },
    });
// return false;
}
function abrirModalHorario(a, nombre, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida,Cnh) {
    $("#txtTitularHorario").text(nombre);
    $('#idH').text(a);
    $('#txtTitularHorario').attr('valueL',Cnh+"");
    $.ajax({
        url:"../mDatosPersonales/horarios.php",
        type:"POST",
        dateType:"html",
        data:{a},
        success:function(respuesta){
            if(respuesta == 'Si'){
                $("#Modalhorarios").modal("show");
                $('#Turno').val(turno);
                $('#HoraEL').val(l_entrada);
                $('#HoraSL').val(l_salida);
                $('#HoraEM').val(m_entrada);
                $('#HoraSM').val(m_salida);
                $('#HoraEMi').val(mi_entrada);
                $('#HoraSMi').val(mi_salida);
                $('#HoraEJ').val(j_entrada);
                $('#HoraSJ').val(j_salida);
                $('#HoraEV').val(v_entrada);
                $('#HoraSV').val(v_salida);
                $('#HoraES').val(s_entrada);
                $('#HoraSS').val(s_salida);
                $('#HoraED').val(d_entrada);
                $('#HoraSD').val(d_salida);
                CmbHraCheckTdos();
                CheckTimeRT();
                OHora();
            }else{
                $("#Modalhorarios").modal("show");
                $('#Turno').val('Turno Matutino');
                TrunoAct('Turno Matutino');
                CheckTimeRT();
                OHora();
                
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX Hora"); 
        },
    });
}
$('#HoraEL').change(function () {
    CmbHraCheck('HoraEL','HoraSL');
});
$('#HoraEM').change(function () {
    CmbHraCheck('HoraEM','HoraSM');
});
$('#HoraEMi').change(function () {
    CmbHraCheck('HoraEMi','HoraSMi');
});
$('#HoraEJ').change(function () {
    CmbHraCheck('HoraEJ','HoraSJ');
});
$('#HoraEV').change(function () {
    CmbHraCheck('HoraEV','HoraSV');
});
$('#HoraES').change(function () {
    CmbHraCheck('HoraES','HoraSS');
});
$('#HoraED').change(function () {
    CmbHraCheck('HoraED','HoraSD');
});
function CmbHraCheck(NmbIn, NmbFi) {
    var init = parseInt($('#'+NmbIn).val());

        ti = init + 1;
        if (ti < 10 && ti > 0) {
            hrfi = "0"+ti+":00";
        }else{
            hrfi = ti+":00";
        }
       
        t = init + 8;

        if (t >= 24) {
            t = 23;
            if (t < 10 && t >= 0 ) {
                hrf = "0"+t+":00";
            }else{
                hrf = t+":00";
            }   
        } else {
            if (t.lenght < 2 ) {
                hrf = "0"+t+":00";
            }else{
                hrf = t+":00";
            }   
        }  
        $('#'+NmbFi).attr('min',hrfi);
        $('#'+NmbFi).attr('max',hrf);
}
function CmbHraCheckTdos() {
        CmbHraCheck('HoraEL','HoraSL');
        CmbHraCheck('HoraEM','HoraSM');
        CmbHraCheck('HoraEMi','HoraSMi');
        CmbHraCheck('HoraEJ','HoraSJ');
        CmbHraCheck('HoraEV','HoraSV');
        CmbHraCheck('HoraES','HoraSS');
        CmbHraCheck('HoraED','HoraSD');
}
function CheckTimeRT() {
        CheckTime('HoraEL','HoraSL');
        CheckTime('HoraEM','HoraSM');
        CheckTime('HoraEMi','HoraSMi');
        CheckTime('HoraEJ','HoraSJ');
        CheckTime('HoraEV','HoraSV');
        CheckTime('HoraES','HoraSS');
        CheckTime('HoraED','HoraSD');
}
$('#HoraSL').change(function() {
    CheckTime('HoraEL','HoraSL');
});
$('#HoraSM').change(function() {
    CheckTime('HoraEM','HoraSM');
});
$('#HoraSMi').change(function() {
    CheckTime('HoraEMi','HoraSMi');
});
$('#HoraSJ').change(function() {
    CheckTime('HoraEJ','HoraSJ');
});
$('#HoraSV').change(function() {
    CheckTime('HoraEV','HoraSV');
});
$('#HoraSS').change(function() {
    CheckTime('HoraES','HoraSS');
});
$('#HoraSD').change(function() {
    CheckTime('HoraED','HoraSD');
});
function CheckTime(NmbIn, NmbFi) {
    var ini = parseInt($('#'+NmbIn).val());
    var fini = parseInt($('#'+NmbFi).val());
    resA = (ini - fini)*(-1);
    var a = 0;
    switch (NmbFi) {
        case 'HoraSL':
            $('#Hrs').attr('valueL',"");
            $('#Hrs').attr('valueL', resA+"");
            break;
        case 'HoraSM':
            $('#Hrs').attr('valueM',"");
            $('#Hrs').attr('valueM', resA+"");
            break;
        case 'HoraSMi':
            $('#Hrs').attr('valueMi',"");
            $('#Hrs').attr('valueMi', resA+"");
            break;
        case 'HoraSJ': 
            $('#Hrs').attr('valueJ',"");
            $('#Hrs').attr('valueJ', resA+"");
            break;
        case 'HoraSV':
            $('#Hrs').attr('valueV',"");
            $('#Hrs').attr('valueV', resA+"");
            break;
        case 'HoraSS':
            $('#Hrs').attr('valueS',"");
            $('#Hrs').attr('valueS', resA+"");
            break;
        case 'HoraSD':
            $('#Hrs').attr('valueD',"");
            $('#Hrs').attr('valueD', resA+"");
            break;
        default:
            var a = 0;
            resF = resA + a;
            $('#Hrs').text('Horas totales, '+resF+" Hrs");
            $('#Hrs').attr('value',"");
            $('#Hrs').attr('value', resF+"");
            break;
    }
    var L = parseInt($('#Hrs').attr('valueL'));
    var M = parseInt($('#Hrs').attr('valueM'));
    var Mi = parseInt($('#Hrs').attr('valueMi'));
    var J = parseInt($('#Hrs').attr('valueJ'));
    var V = parseInt($('#Hrs').attr('valueV'));
    var s = parseInt($('#Hrs').attr('valueS'));
    var d = parseInt($('#Hrs').attr('valueD'));
    var h = parseInt($('#Hrs').attr('value'));

    resF = L + M + Mi + J + V + s + d + h;

    if (resF >= 30) {
        $('#Hrs').css("color", obscuro);
        $("#BtnGuardarH").prop('disabled', false);  
    } else {
        $('#Hrs').css("color", rojo);
        $("#BtnGuardarH").prop('disabled', true);
    }
    $('#Hrs').text('Horas totales, '+resF+" Hrs");
}
$("#Turno").change(function() {
    var op = $(this).val();
    TrunoAct(op);
});
function TrunoAct(op) {
    switch (op) {
        case 'Turno Especial':
            CmbH('09:00', '13:00', 'No');
            $("#BtnGuardarH").prop('disabled', true);
            $('#Hrs').attr('valueL',0);
            $('#Hrs').attr('valueM',0);
            $('#Hrs').attr('valueMi',0);
            $('#Hrs').attr('valueJ',0);
            $('#Hrs').attr('valueV',0);
            $('#Hrs').attr('valueS',0);
            $('#Hrs').attr('valueD',0);
            $('#Hrs').attr('value',0);
            CmbHraCheckTdos();
                CheckTimeRT();
            break;
        case 'Turno Matutino':
            CmbH('06:00', '12:00', 'Si');
            $('#Hrs').text('Horas totales, 30 Hrs.');
            $("#BtnGuardarH").prop('disabled', false);
            $(' #HoraES , #HoraED , #HoraSS , #HoraSD').val('00:00');
            break;
        case 'Turno Vespertino':
            CmbH('12:00', '18:00', 'Si');
            $('#Hrs').text('Horas totales, 30 Hrs.');
            $("#BtnGuardarH").prop('disabled', false);
            $(' #HoraES , #HoraED , #HoraSS , #HoraSD').val('00:00');
            break;
        case 'Turno Nocturno':
            CmbH('18:00', '00:00', 'Si');
            $('#Hrs').text('Horas totales, 30 Hrs.');
            $("#BtnGuardarH").prop('disabled', false);
            $(' #HoraES , #HoraED , #HoraSS , #HoraSD').val('00:00');
            break;
    
        default:
            break;
    }
}
function Borrar() {
    $('#HoraEL , #HoraSL , #HoraEM , #HoraSM ,  #HoraES , #HoraED , #HoraSS , #HoraSD').val('00:00');
    $('#HoraEMi , #HoraSMi , #HoraEJ , #HoraSJ ,  #HoraEV , #HoraEV').val('00:00');
    $('#HoraEL , #HoraSL , #HoraEM , #HoraSM ,  #HoraES , #HoraED , #HoraSS , #HoraSD , #HoraEMi , #HoraSMi , #HoraEJ , #HoraSJ ,  #HoraEV , #HoraEV').attr('min','12:00');
    $('#HoraEL , #HoraSL , #HoraEM , #HoraSM ,  #HoraES , #HoraED , #HoraSS , #HoraSD , #HoraEMi , #HoraSMi , #HoraEJ , #HoraSJ ,  #HoraEV , #HoraEV').attr('max','06:00');
    $('#HoraEL , #HoraEM , #HoraEMi , #HoraEJ , #HoraEV , #HoraES , #HoraED').prop('disabled', true);
    $('#HoraSL , #HoraSM , #HoraSMi , #HoraSJ , #HoraSV , #HoraSS , #HoraSD').prop('disabled', true); 
}
function CmbH(hrE, hrS, des) {
    // Lunes
    if (des != 'Si') {
        $('#HoraEL , #HoraEM , #HoraEMi , #HoraEJ , #HoraEV , #HoraES , #HoraED').val(hrE);
        $('#HoraSL , #HoraSM , #HoraSMi , #HoraSJ , #HoraSV , #HoraSS , #HoraSD').val(hrS);
        $('#HoraEL , #HoraEM , #HoraEMi , #HoraEJ , #HoraEV , #HoraES , #HoraED').prop('disabled', false);
        $('#HoraSL , #HoraSM , #HoraSMi , #HoraSJ , #HoraSV , #HoraSS , #HoraSD').prop('disabled', false);
    }else{
        $('#HoraEL , #HoraEM , #HoraEMi , #HoraEJ , #HoraEV').val(hrE);
        $('#HoraSL , #HoraSM , #HoraSMi , #HoraSJ , #HoraSV').val(hrS);
        $('#HoraEL , #HoraEM , #HoraEMi , #HoraEJ , #HoraEV , #HoraES , #HoraED').prop('disabled', true);
        $('#HoraSL , #HoraSM , #HoraSMi , #HoraSJ , #HoraSV , #HoraSS , #HoraSD').prop('disabled', true); 
    }
    
}
$('#Lunes').click(function() {
        $('#HLunes').show();
        $('#HMartes, #HMiercoles , #HJueves , #HViernes , #HSabado , #HDomingo').hide();
        $('#Dia').text('Lunes');
});
$('#Martes').click(function() {
        $('#HLunes, #HMiercoles , #HJueves , #HViernes , #HSabado , #HDomingo').hide();
        $('#HMartes').show();
        $('#Dia').text('Martes');
});
$('#Miercoles').click(function() {
        $('#HLunes, #HMartes , #HJueves , #HViernes , #HSabado , #HDomingo').hide();
        $('#HMiercoles').show();
        $('#Dia').text('Miercoles');
});
$('#Jueves').click(function() {
        $('#HLunes, #HMiercoles , #HMartes , #HViernes , #HSabado , #HDomingo').hide();
        $('#HJueves').show();
        $('#Dia').text('Jueves');
});
$('#Viernes').click(function() {
        $('#HLunes, #HMiercoles , #HJueves , #HMartes , #HSabado , #HDomingo').hide();
        $('#HViernes').show();
        $('#Dia').text('Viernes');
});
$('#Sabado').click(function() {
        $('#HLunes, #HMiercoles , #HJueves , #HViernes , #HMartes, #HDomingo').hide();
        $('#HSabado').show();
        $('#Dia').text('Sabado');
});
$('#Domingo').click(function() {
        $('#HLunes, #HMiercoles , #HJueves , #HViernes , #HSabado , #HMartes').hide();
        $('#HDomingo').show();
        $('#Dia').text('Domingo');
});
function OHora() {
        $('#HLunes').show();
        $('#HMartes').hide();
        $('#HMiercoles').hide();
        $('#HJueves').hide();
        $('#HViernes').hide();
        $('#HSabado').hide();
        $('#HDomingo').hide(); 
}
function GuardarH() {
    var Cnh        = $('#txtTitularHorario').attr('valueL');
    var Us        = $('#txtTitularHorario').text();
    var ID         = $('#idH').text();
    var turno      = $('#Turno').val();
    var l_entrada  = $('#HoraEL').val();
    var l_salida   = $('#HoraSL').val();
    var m_entrada  = $('#HoraEM').val();
    var m_salida   = $('#HoraSM').val();
    var mi_entrada = $('#HoraEMi').val();
    var mi_salida  = $('#HoraSMi').val();
    var j_entrada  = $('#HoraEJ').val();
    var j_salida   = $('#HoraSJ').val();
    var v_entrada  = $('#HoraEV').val();
    var v_salida   = $('#HoraSV').val();
    var s_entrada  = $('#HoraES').val();
    var s_salida   = $('#HoraSS').val();
    var d_entrada  = $('#HoraED').val();
    var d_salida   = $('#HoraSD').val();
            if(Cnh == 'No'){
                $.ajax({
                    url:"../mDatosPersonales/Ghorarios.php",
                    type:"POST",
                    dateType:"html",
                    data:{ID, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida},
                    success:function(respuesta){
                        alertify.success("<i class='fa fa-bolt fa-lg'></i> Guardado con exito", 2);
                        $("#Modalhorarios").modal("hide");
                        Borrar();
                        llenar_lista_DP();
                        actividad  ="Se ha creado un horario para la persona, "+ Us;
                        var idUser=$("#inicioIdusuario").val();
                        log(actividad,idUser);
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX Hora"); 
                    },
                });
                
            }else{
                $.ajax({
                    url:"../mDatosPersonales/actualizarHra.php",
                    type:"POST",
                    dateType:"html",
                    data:{ID, turno, l_entrada, l_salida, m_entrada, m_salida, mi_entrada, mi_salida, j_entrada, j_salida, v_entrada, v_salida, s_entrada, s_salida, d_entrada, d_salida},
                    success:function(respuesta){

                        alertify.success("<i class='fa fa-bolt fa-lg'></i> Actualizado con exito", 2);
                        $("#Modalhorarios").modal("hide");
                        Borrar();
                        llenar_lista_DP();
                        actividad  ="Se ha actualizado un horario para la persona, "+ Us;
                        var idUser=$("#inicioIdusuario").val();
                        log(actividad,idUser);
                    },
                    error:function(xhr,status){
                        alert("Error en metodo AJAX Hora"); 
                    },
                });
            }
}