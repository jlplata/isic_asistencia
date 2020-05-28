var hra, min, seg, ap, da ;
var voz = ($("#soundActiv").prop( "checked" ) == true) ? 'Activa' : 'Inactiva' ;
$(document).ready( $(function(){
            var actualizarHora = function(){
            var fecha = new Date(),
                hora = fecha.getHours(),
                minutos = fecha.getMinutes(),
                segundos = fecha.getSeconds(),
                diaSemana = fecha.getDay(),
                dia = fecha.getDate(),
                mes = fecha.getMonth(),
                anio = fecha.getFullYear(),
                ampm;
            
            var $pHoras = $("#horas"),
                $pSegundos = $("#segundos"),
                $pMinutos = $("#minutos"),
                $pAMPM = $("#ampm"),
                $pDiaSemana = $("#diaSemana"),
                $pDia = $("#dia"),
                $pMes = $("#mes"),
                $pAnio = $("#anio");
            var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
            var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            
            
            $pDiaSemana.text(semana[diaSemana]);
            $pDia.text(dia);
            $pMes.text(meses[mes]);
            $pAnio.text(anio);
            // if(hora>=12){
            //   hora = hora - 12;
            //   ampm = "PM";
            // }else{
            //   ampm = "AM";
            // }
            // if(hora == 0){
            //   hora = 12;
            // }
            if(hora<10){$pHoras.text("0"+hora)}else{$pHoras.text(hora)};
            if(minutos<10){$pMinutos.text("0"+minutos)}else{$pMinutos.text(minutos)};
            if(segundos<10){$pSegundos.text("0"+segundos)}else{$pSegundos.text(segundos)};
            // $pAMPM.text(ampm);
            hra = $pHoras.text(); 
            min = $pMinutos.text();
            seg = $pSegundos.text();
            da = semana[diaSemana];
            ap = $pAMPM.text();
            //  console.log(hra+':'+min+':'+seg+' '+da);
            ComprobarEntrada();
            };
            actualizarHora();
            var intervalo = setInterval(actualizarHora,1000);
            $("#frmAsistencia-AS")[0].reset();
    }));
function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        $('#ClaveReg').prop('disabled', true);
        e.preventDefault();
        var clave = $("#ClaveReg").val();
        var idD = $('#inicioIdDato').val();

            if (clave == '') {
                var res = MenuOption('ingresar');
                $('.alertasH').html(res);
                alertify.error('Debes de colocar una clave.',2);
                Limpiar();
                hablarAsis('Debes de colocar una clave.');

            }
            else{
                $.ajax({
                    type: "POST",
                    url: "../mAsistencias/checkAsistencias.php",
                    data: {clave},
                    dataType: "html",
                    success: function (responseA) {
                        // console.log(responseA);
                        if (responseA == 'No' ) {
                            Limpiar();
                            hablarAsis('No se puede, intentalo de nuevo');
                            alertify.error('No se puede, intentalo de nuevo.',2);
                        }else if (responseA == 'Ya' ) {
                            var res = MenuOption('yaTiene');
                                    $('.alertasH').html(res);
                                    Limpiar();
                                    hablarAsis('Ya has registrado la entrada');
                                    alertify.error('Ya has registrado la entrada.',2);
                        }else if (responseA = 'Si') {
                            UsuarioCompro(clave);
                        }
                    }
                });
                
                
            }
    }
}
function asistenciaCheck(clave) {
        
    $.ajax({
        url:"../mAsistencias/checkTimeUsu.php",
        type:"POST",
        dateType:"json",
        data:{clave},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            //console.log(respuesta);
            var registros = dataArray.cRegistros;
            if (registros !=0 ) {

                var lE=dataArray.result.l_entrada;
                var lS=dataArray.result.l_salida;
                var mE=dataArray.result.m_entrada;
                var mS=dataArray.result.m_salida;
                var miE=dataArray.result.mi_entrada;
                var miS=dataArray.result.mi_salida;
                var jE=dataArray.result.j_entrada;
                var jS=dataArray.result.j_salida;
                var vE=dataArray.result.v_entrada;
                var vS=dataArray.result.v_salida;
                var sE=dataArray.result.s_entrada;
                var sS=dataArray.result.s_salida;
                var dE=dataArray.result.d_entrada;
                var dS=dataArray.result.d_salida;

                switch (da) {
                    case 'Lunes':
                        horarioDias(lE, lS, clave);
                        break;
                    case 'Martes':
                        horarioDias(mE, mS, clave);
                        break;
                    case 'Miercoles':
                        horarioDias(miE, miS, clave);
                        break;
                    case 'Jueves':
                        horarioDias(jE, jS, clave);
                        break;
                    case 'Viernes':
                        horarioDias(vE, vS, clave);
                        break;
                    case 'Sabado':
                        horarioDias(sE, sS, clave);
                        break;
                    case 'Domingo':
                        horarioDias(dE, dS, clave);
                        break;
                
                    default:
                        break;
                }

            }else{
                
                var res = '<div class="alert alert-danger" style="font-size: 30px;" role="alert"> No cuentas con un horario aun. </div>';
                $('.alertasH').html(res);
                Limpiar();

                alertify.error('No cuentas con un horario aun.',2);
                hablarAsis('No cuentas con un horario aun.');
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}
function SacarMini(hras, min, masmenos){
    var a, b, c, Rehra;
    var principio = new Date("0001-01-01T"+hras);
    var final = new Date();

    if (masmenos == 'mas') {
        if(principio.getMinutes() <= min){
            final.setHours(principio.getHours() - 1);
            final.setMinutes(principio.getMinutes() + min + 60);
            final.setSeconds(principio.getSeconds() - 60 + 60);
    
            
            a = (final.getHours() < 10) ? 'Si' : 'No' ;
            b = (final.getMinutes() < 10) ? 'Si' : 'No' ;
            c = (final.getSeconds() < 10) ? 'Si' : 'No' ;
            
            // console.log(a + b + c);
            if ((a == 'Si') && (b == 'Si') == (c == 'Si')) {
                Rehra = '0'+final.getHours()+':0'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'No') && (b == 'Si') == (c == 'Si')){
                Rehra = final.getHours()+':0'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'Si') && (b == 'No') == (c == 'Si')){
                Rehra = '0'+final.getHours()+':'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'Si') && (b == 'Si') == (c == 'No')){
                Rehra = '0'+final.getHours()+':0'+final.getMinutes()+':'+final.getSeconds();
            } else if((a == 'No') && (b == 'No') == (c == 'No')){
                Rehra = final.getHours()+':'+final.getMinutes()+':'+final.getSeconds();
            } else {
                Rehra = final.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
            }
            var horitaa = new Date("0001-01-01T"+Rehra);
        }else {
            if (min >=30) {
                if (principio.getMinutes() <= min) {
                    principio.setHours(principio.getHours() - 1);
                } else {
                    principio.setHours(principio.getHours() + 1);
                }
                
                final.setMinutes(principio.getMinutes() + min);

                a = (principio.getHours() < 10) ? 'Si' : 'No' ;
                b = (final.getMinutes() < 10) ? 'Si' : 'No' ;
                c = (principio.getSeconds() < 10) ? 'Si' : 'No' ;
                    
                if ((a == 'Si') && (b == 'Si') == (c == 'Si')) {
                    Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'No') && (b == 'Si') == (c == 'Si')){
                    Rehra = principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'Si') && (b == 'No') == (c == 'Si')){
                    Rehra = '0'+principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'Si') && (b == 'Si') == (c == 'No')){
                    Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':'+principio.getSeconds();
                } else if((a == 'No') && (b == 'No') == (c == 'No')){
                    Rehra = principio.getHours()+':'+final.getMinutes()+':'+principio.getSeconds();
                }else {
                    Rehra = principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
                }
                var horitaa = new Date("0001-01-01T"+Rehra);
            } else {
                final.setMinutes(principio.getMinutes() + min);

                a = (principio.getHours() < 10) ? 'Si' : 'No' ;
                b = (final.getMinutes() < 10) ? 'Si' : 'No' ;
                c = (principio.getSeconds() < 10) ? 'Si' : 'No' ;
                    
                if ((a == 'Si') && (b == 'Si') == (c == 'Si')) {
                    Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'No') && (b == 'Si') == (c == 'Si')){
                    Rehra = principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'Si') && (b == 'No') == (c == 'Si')){
                    Rehra = '0'+principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
                } else if((a == 'Si') && (b == 'Si') == (c == 'No')){
                    Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':'+principio.getSeconds();
                } else if((a == 'No') && (b == 'No') == (c == 'No')){
                    Rehra = principio.getHours()+':'+final.getMinutes()+':'+principio.getSeconds();
                }else {
                    Rehra = principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
                }
                var horitaa = new Date("0001-01-01T"+Rehra);
            }
        }
    }else if(masmenos == 'menos'){
        if(principio.getMinutes() <= min){
            final.setHours(principio.getHours() - 1);
            final.setMinutes(principio.getMinutes() - min + 60);
            final.setSeconds(principio.getSeconds() - 60 + 60);
    
            
            a = (final.getHours() < 10) ? 'Si' : 'No' ;
            b = (final.getMinutes() < 10) ? 'Si' : 'No' ;
            c = (final.getSeconds() < 10) ? 'Si' : 'No' ;
            
    
            if ((a == 'Si') && (b == 'Si') == (c == 'Si')) {
                Rehra = '0'+final.getHours()+':0'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'No') && (b == 'Si') == (c == 'Si')){
                Rehra = final.getHours()+':0'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'Si') && (b == 'No') == (c == 'Si')){
                Rehra = '0'+final.getHours()+':'+final.getMinutes()+':0'+final.getSeconds();
            } else if((a == 'Si') && (b == 'Si') == (c == 'No')){
                Rehra = '0'+final.getHours()+':0'+final.getMinutes()+':'+final.getSeconds();
            } else if((a == 'No') && (b == 'No') == (c == 'No')){
                Rehra = final.getHours()+':'+final.getMinutes()+':'+final.getSeconds();
            } else {
                Rehra = final.getHours()+':'+final.getMinutes()+':0'+final.getSeconds();
            }
            var horitaa = new Date("0001-01-01T"+Rehra);
        } else {
            
            final.setMinutes(principio.getMinutes() - min)
    
            a = (principio.getHours() < 10) ? 'Si' : 'No' ;
            b = (final.getMinutes() < 10) ? 'Si' : 'No' ;
            c = (principio.getSeconds() < 10) ? 'Si' : 'No' ;
                
            if ((a == 'Si') && (b == 'Si') == (c == 'Si')) {
                Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
            } else if((a == 'No') && (b == 'Si') == (c == 'Si')){
                Rehra = principio.getHours()+':0'+final.getMinutes()+':0'+principio.getSeconds();
            } else if((a == 'Si') && (b == 'No') == (c == 'Si')){
                Rehra = '0'+principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
            } else if((a == 'Si') && (b == 'Si') == (c == 'No')){
                Rehra = '0'+principio.getHours()+':0'+final.getMinutes()+':'+principio.getSeconds();
            } else if((a == 'No') && (b == 'No') == (c == 'No')){
                Rehra = principio.getHours()+':'+final.getMinutes()+':'+principio.getSeconds();
            } else {
                Rehra = principio.getHours()+':'+final.getMinutes()+':0'+principio.getSeconds();
            }
            var horitaa = new Date("0001-01-01T"+Rehra);
        }  
    }
    // console.log('mas30Min '+ Rehra);
    return horitaa; 
}
function MenuOption(option){
    var op;
    switch (option) {
        // ingresar, inexistente, notTody, fueraRango, puntual, retardoMenor, retardoMayor
        case 'ingresar':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Debes de colocar una clave. </div>';
            break;
        case 'inexistente':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> La clave que escribiste no está relacionada con ningún trabajador. </div>';
            break;
        case 'notToday':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Segun tu horario, no es un dia laboral para ti. </div>';
            break;
        case 'fueraRango':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Tu asistencia se encuentra fuera del rango de tu horario. </div>';
            break;
        case 'puntual':
            op = '<div style="font-size: 30px;" class="alert alert-success" role="alert"> Gracias por registrar su entrada. </div>';
            break;
        case 'retardoMenor':
            op = '<div style="font-size: 30px;" class="alert alert-warning" role="alert"> Retraso Menor. </div>';
            break;
        case 'retardoMayor':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Retraso Mayor. </div>';
            break;
        case 'error':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Error. </div>';
            break;
        case 'salida':
            op = '<div style="font-size: 30px;" class="alert alert-info" role="alert"> Gracias por registrar su salida. </div>';
            break;
        case 'activo':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Este usuario no esta activo, no puede registrar asistencia. </div>';
            break;
        case 'noEsHora':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Aun no es su hora de entrada. </div>';
            break;
        case 'saliste':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Según tu horario ya paso tu hora de salida. </div>';
            break;
        case 'yaTiene':
            op = '<div style="font-size: 30px;" class="alert alert-danger" role="alert"> Ya has checado entrada. </div>';
            break;
        default:
            op = '<div class="alert alert-danger" role="alert"> Error. </div>';
            break;
    }
    return op;
}
function horarioDias(HraE, HraS){
    
    var horitaa  = hra+':'+min+':'+seg;
    var  hraCp = new Date("0001-01-01T"+horitaa);

    var clave = $("#ClaveReg").val();
    // console.log('hora salida ms ' +HraS);

    // console.log(hraCp);
    var HraEntraLess10, HraEntraPlus5, HraEntraPlus15, HraSalidaLess5, HraSalidaPlus30 ;
    
    if ((HraE == '00:00:00') && (HraS == '00:00:00')) {
        //notToday,
        var mensaje = MenuOption('notToday');
        $('.alertasH').html(mensaje); 
        Limpiar();
        alertify.error('Segun tu horario, no es un dia laboral para ti.',2);
    } else {
                HraEntraLess10 = SacarMini(HraE, 10, 'menos');
                HraEntraPlus5 = SacarMini(HraE, 5, 'mas');
                HraEntraPlus15 = SacarMini(HraE, 15, 'mas');
                HraSalidaLess5 = SacarMini(HraS, 5, 'menos');
                HraSalidaPlus30 = SacarMini(HraS, 30, 'mas');
                
                // console.log(HraEntraLess10);
                // console.log(HraEntraPlus5);
                // console.log(HraEntraPlus15);
                // console.log(HraSalidaLess5);
                // console.log(HraSalidaPlus30);
                // console.log(hraCp);
                if ((new Date(hraCp).getTime() >= new Date(HraEntraLess10).getTime()) && (new Date(hraCp).getTime() <= new Date(HraEntraPlus5).getTime())) {
                    //puntual,
                    // console.log('aqui man 10 y 5 temprano');
                    var mensaje = MenuOption('puntual');
                    $('.alertasH').html(mensaje); 
                    RegistrarAsistenci(clave, horitaa, 'Asistencia Puntual');
                    datos(clave);
                    alertify.success('Gracias por registrar su entrada.',2);
                    hablarAsis('Gracias por registrar su entrada.');            
                } else if ((new Date(hraCp).getTime() > new Date(HraEntraPlus5).getTime())  && (new Date(hraCp).getTime() <= new Date(HraEntraPlus15).getTime())) {
                //retardoMenor
                    var mensaje = MenuOption('retardoMenor');
                    $('.alertasH').html(mensaje);
                    alertify.warning('Retraso Menor.',2);
                    RegistrarAsistenci(clave, horitaa, 'Asistencia con retraso menor');
                    datos(clave);
                    hablarAsis('Tienes un Retraso Menor.');               
                } else if((new Date(hraCp).getTime() > new Date(HraEntraPlus15).getTime())  && (new Date(hraCp).getTime() <= new Date(HraSalidaLess5).getTime())) {
                //retardoMayor
                // console.log('aqui man 15 y 5 muy tarde '+new Date(hraCp).getTime()  +' original ' + HraEntraPlus15 + ' y '+HraSalidaLess5);
                    var mensaje = MenuOption('retardoMayor');
                    $('.alertasH').html(mensaje);  
                    RegistrarAsistenci(clave, horitaa, 'Asistencia con retraso mayor');
                    datos(clave);
                    alertify.error('Retraso Mayor.',2);
                    hablarAsis('Tienes un Retraso Mayor.');               
                
                } else if( (new Date(HraSalidaLess5).getTime() <= new Date(hraCp).getTime())  && (new Date(hraCp).getTime() <= new Date(HraSalidaPlus30).getTime())) {
                // salida
                //  console.log('aqui man 5 y 30 adios' + HraSalidaLess5 + ' ' + HraSalidaPlus30);
                var mensaje = MenuOption('salida');
                    $('.alertasH').html(mensaje);
                    RegistrarSalida(clave, horitaa, 'Registro de Salida');
                    datos(clave);
                    alertify.notify('Salida.',2);
                    hablarAsis('Gracias por registrar tu salida.');               
                } else {
                    if(new Date(HraSalidaPlus30).getTime() > new Date(hraCp).getTime()){
                        // noEsHora
                        var mensaje = MenuOption('saliste');
                        $('.alertasH').html(mensaje);
                        Limpiar();
                        alertify.notify('Segun tu horario ya saliste',2);
                        hablarAsis('Segun tu horario ya saliste');               
                    }else{
                        var mensaje = MenuOption('noEsHora');
                        $('.alertasH').html(mensaje);
                        Limpiar();
                        alertify.notify('Aun no es tu hora de entrada.',2);
                        hablarAsis('Aun no es tu hora de entrada.');   
                    } 
                } 


        }  
}
function Limpiar(){
    setTimeout(function(){
        $('.alertasH').empty();
        $('.infoUsuario').empty();
        $("#frmAsistencia-AS")[0].reset();
        $('#ClaveReg').prop('disabled', false);
        $('#ClaveReg').focus();
    },6000);
}
function RegistrarAsistenci(clave, hraAct, insidencia){
    $.ajax({
        type: "POST",
        url: "../mAsistencias/insertAsistent.php",
        data: {clave, hraAct, insidencia},
        dataType: "html",
        success: function (response) {
            Limpiar();
        //    console.log(response)
        }
    });
}
function RegistrarSalida(clave, hraAct, insidencia){
    
    $.ajax({
        type: "POST",
        url: "../mAsistencias/insertSalida.php",
        data: {clave, hraAct, insidencia},
        dataType: "html",
        success: function (response) {
            Limpiar();
        }
    });
}
function hablarAsis(texto){
    //se requiere conexion a internet
    if (voz == 'on') {
        var textoAtraducir;
        textoAtraducir=texto; 
        responsiveVoice.speak(textoAtraducir,"Spanish Female"); 
        alertify.success("<i class='fa fa-volume-up fa-lg'></i>", 2);
    }
}
$('#soundActiv').change(function() {
    if ($(this).prop( "checked" ) == true) {
        voz = 'on';
        // console.log(voz);
    }else{
        voz = 'off';
        // console.log(voz);
    }
    
})
function UsuarioCompro(clave) {
    $.ajax({
        type: "POST",
        url: "../mAsistencias/cmpUsuario.php",
        data: {clave},
        dataType: "html",
        success: function (response) {
            // console.log(response);
            if (response == 'Si') {
                asistenciaCheck(clave);
        } else if(response == 'Activo') {
            var res = MenuOption('activo');
            $('.alertasH').html(res);
            Limpiar();
            hablarAsis('No esta activo.');
            alertify.error('No esta activo.',2);
        }else{
            var res = MenuOption('inexistente');
            $('.alertasH').html(res);
            Limpiar();
            hablarAsis('La clave que escribiste no está relacionada con ningún trabajador.');
            alertify.error('La clave que escribiste no está relacionada con ningún trabajador.',2);
        }
        }
    }); 
}
function ComprobarEntrada() {
    $.ajax({
        url: "../mAsistencias/ComprobarEntradas.php",
        data: {},
        dataType: "html",
        success: function (response) {
            // console.log(response);
        }
    });
}
function datos(clave) {
    $.ajax({
        type: "POST",
        url: "../mAsistencias/sacarDatos.php",
        data: {clave},
        dataType: "html",
        success: function (response) {
            // console.log("datps"+ response);
            op = '<br><div style="font-size: 30px;" class="alert alert-danger" role="alert">'+response + ' </div>';
            $('.infoUsuario').html(op);
        }
    });
}