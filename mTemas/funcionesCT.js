var nombreModulo_CT="Crear Temas";

function llenar_lista_CT(){
    abrirModalCarga('Cargando Lista');
    // $("#frmGuardar-EC")[0].reset();
    $("#Listado-CT").hide();
    $.ajax({
        url:"../mTemas/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-CT").html(respuesta);
            $("#Listado-CT").fadeIn("slow");
            cerrarModalCarga();    
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}
function cambiar_estatus_CT(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mTemas/cEstatusCT.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-CT"+consecutivo).removeAttr('disabled');
                $("#btnAplicar-CT"+consecutivo).removeAttr('disabled');
                $("#btnExportar-CT"+consecutivo).removeAttr('disabled');
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_CT;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-CT"+consecutivo).attr('disabled','disabled');
                $("#btnAplicar-CT"+consecutivo).attr('disabled','disabled');
                $("#btnExportar-CT"+consecutivo).attr('disabled','disabled');
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_CT;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}
function nuevo_registro_CT(){
    $("#lblTitular").text(nombreModulo_CT);
    $("#badgeInfo").text("Nuevo registro");
    var ColorBase = "#db913d";

    $('#colorL').val("#000000");
    $('#colorB').val(ColorBase);
    $('#colorBF').val(ColorBase);
    $('#colorBd').val(ColorBase);
    
    $('#colorL').minicolors(
        'settings', {
        value: "#000000"
    });
    $('#colorB').minicolors(
        'settings', {
        value: ColorBase
    });
    $('#colorBF').minicolors(
        'settings', {
        value: ColorBase
    });
    $('#colorBd').minicolors(
        'settings', {
        value: ColorBase
    });
    $("#Listado-CT").hide();
    $("#guardar-CT").fadeIn();
    $('#frmGuardar-CT')[0].reset();
    $("#clave").focus();
}
$(document).ready( function() {
    $('.colors').each( function() {
      $(this).minicolors({
        theme: 'bootstrap'
      });
    });
    
    
});
$("#btnCancelarG-CT , #btnCancelarA-CT").click(function(){
    $("#editar-CT").hide();
    $("#guardar-CT").hide();

    $("#lblTitular").text(nombreModulo_CT);
    $("#badgeInfo").text("Lista");

    $("#Listado-CT").fadeIn();
 
});
$("#frmGuardar-CT").submit(function(e){

    var nombre    = $("#nombTema").val();
    var colorL    = $("#colorL").val();
    var colorB    = $("#colorB").val();
    var colorBF   = $("#colorBF").val();
    var colorBd   = $("#colorBd").val();

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
            $.ajax({
                url:"../mTemas/comprobarG.php",
                type:"POST",
                dateType:"html",
                data:{nombre},
                success:function(respuesta){
                    if(respuesta == "Si"){
                        console.log('respuesta de Guardar - '+ respuesta);
                        swal({
                            title: "Error!",
                            text: "No ya existe un tema con ese nombre",
                            type: "error",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            alertify.message("Gracias !");
                        });
                    }else{
                        swal.close();
                        $.ajax({
                            url:"../mTemas/guardar.php",
                            type:"POST",
                            dateType:"html",
                            data:{nombre,colorL,colorB,colorBF,colorBd},
                            success:function(respuesta){
                                $("#guardar-CT").hide();
                                llenar_lista_CT();
                                $("#frmGuardar-CT")[0].reset();
                                selectTwo();
                                alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                                actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_CT;
                                var idUser=$("#inicioIdusuario").val();
                                log(actividad,idUser);
                            },
                            error:function(xhr,status){
                                alert("Error en metodo AJAX tema guardar"); 
                            },
                        });
                    }
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX guardar compro"); 
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
function exportarTemas(valor){
    $.ajax({
        url:"../expImpTemas/exportar.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            preloader(1,"Generando archivo JSON","Se ha importado el archivo de manera exitosa !")
            
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}
function llenar_formulario_CT(id,nombre,colorL,colorB,colorBF,colorBd){
    $("#eIDCT").attr('value',id);
    $("#nombTemaE").val(nombre);

    $('#colorLe').val(colorL);
    $('#colorBe').val(colorB);
    $('#colorBFe').val(colorBF);
    $('#colorBde').val(colorBd);

    $('#colorLe').minicolors(
        'settings', {
        value: colorL,
        theme: 'bootstrap'
    });
    $('#colorBe').minicolors(
        'settings', {
        value: colorB
    });
    $('#colorBFe').minicolors(
        'settings', {
        value: colorBF
    });
    $('#colorBde').minicolors(
        'settings', {
        value: colorBd
    });
    
    $("#lblTitular").text(nombreModulo_CT);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-CT").hide();
    $("#Listado-CT").hide();
    $("#editar-CT").fadeIn();
    $("#eDescripcion").focus();
}
$("#frmActualizar-CT").submit(function(e){

    var id        = $("#eIDCT").val();
    var nombre    = $("#nombTemaE").val();
    var colorL    = $("#colorLe").val();
    var colorB    = $("#colorBe").val();
    var colorBF   = $("#colorBFe").val();
    var colorBd   = $("#colorBde").val();

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
            $.ajax({
                url:"../mTemas/comprobar.php",
                type:"POST",
                dateType:"html",
                data:{nombre,id},
                success:function(respuesta){
                    if(respuesta == 'Si'){
                        swal({
                            title: "Error!",
                            text: "No ya existe un tema con ese nombre",
                            type: "error",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            alertify.message("Gracias !");
                        });
                    }else{
                        swal.close();
                        $.ajax({
                            url:"../mTemas/actualizarT.php",
                            type:"POST",
                            dateType:"html",
                            data:{id,nombre,colorL,colorB,colorBF,colorBd},
                            success:function(respuesta){
                                console.log(respuesta);
                                llenar_lista_CT();
                                    $("#frmGuardar-CT")[0].reset();
                                    $("#frmActualizar-CT")[0].reset();
                                    alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                                $("#btnCancelarG-CT , #btnCancelarA-CT").click();
                                actividad  ="Se ha modificado un registro de la tabla "+nombreModulo_CT;
                                var idUser=$("#inicioIdusuario").val();
                                log(actividad,idUser);
                                
                                $('#desc').focus();
                            },
                            error:function(xhr,status){
                                alert("Error en metodo AJAX"); 
                            },
                        });
                    }
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX guardar compro"); 
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
function preloader(seg,mensaje,alerta){
    var s=parseInt(seg)*1000;
    abrirModalCarga(mensaje);
    setTimeout(function() {

        cerrarModalCarga(alerta);
    },s);
}
function abrirModalArchivo() {
    $("#modalArchivo").modal("show");
}
function importarArchivo(){
    var files = $('#imageA')[0].files[0];
    var archivo=files.name;
    var ruta= "../expImpTemas/Temas/"+archivo;

    $.getJSON(ruta, function(data){
        //for para decorre las propiedades
        for(tema in data){

            var nombre_tema       = data[tema].nombre_tema;
            var color_letra       = data[tema].color_letra;
            var color_base        = data[tema].color_base;
            var color_base_fuerte = data[tema].color_base_fuerte;
            var color_borde       = data[tema].color_borde;
            var fecha_registro    = data[tema].fecha_registro;
            var hora_registro     = data[tema].hora_registro;

            $.ajax({
                url:"../expImpTemas/importar.php",
                type:"POST",
                dateType:"html",
                data:{nombre_tema,color_letra,color_base,color_base_fuerte,color_borde,fecha_registro,hora_registro},
                success:function(respuesta){
                    console.log(respuesta);
                    var bandera=respuesta;
                    if (bandera==0) {
                        preloader(1,"Importando Tema ...");
                        $("#modalArchivo").modal("hide");
                        llenar_lista_CT();
                    }else{
                        swal({
                            title: "Error!",
                            text: "Ya existe un tema con el nombre "+nombre_tema,
                            type: "error",
                            confirmButtonClass: "btn-dark",
                            confirmButtonText: "Enterado"
                        }, function (isConfirm) {
                            alertify.message("Gracias !");
                        });
                    }
                   
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }
    });
}
$('#btnProbar-CTG').click(function(){
    var colorL =  $('#colorL').val();
    var colorB =  $('#colorB').val();
    var colorBF = $('#colorBF').val();
    var colorBd = $('#colorBd').val();
    var idTema=$("#inicioIdTema").val();
    cssTema(colorBF, colorB, colorL, colorBd);
    setTimeout(function(){aplicarTema(idTema,'login')},5000);
});
$('#btnProbar-CTE').click(function(){
    var colorL =  $('#colorLe').val();
    var colorB =  $('#colorBe').val();
    var colorBF = $('#colorBFe').val();
    var colorBd = $('#colorBde').val();
    var idTema=$("#inicioIdTema").val();
    cssTema(colorBF, colorB, colorL, colorBd);
    setTimeout(function(){aplicarTema(idTema,'login')},5000);
});