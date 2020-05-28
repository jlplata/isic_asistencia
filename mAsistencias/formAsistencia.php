<?php
//Variable de Nombre
$varGral="-AS";
?>
<form id="frmAsistencia<?php echo $varGral?>">

    <input type="hidden"  id="horaT">
    <div class="row">
        <div class="col-lg-12 alertasH">
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4  ">
            <div class="form-group">
                <input type="number" class="form-control" onkeypress="pulsar(event)" id="ClaveReg" style="height: 81px;font-size: 35px;" placeholder ="Clave de Personal" autofocus='autofocus' required>
            </div>
        </div>
        <div class=" col text-right">
            <input type="checkbox" id="soundActiv" data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No">
            &nbsp; Activar Sonido
            </button>
        </div>
    </div>
    <div class="row">
        <div class=" col-lg-12 text-center">
            <div class="widget">
                <div class="fecha">
                    <p id="diaSemana" class="diaSemana"></p>
                    <p id="dia" class="dia"></p>
                    <p>de</p>
                    <p id="mes" class="mes"></p>
                    <p>del</p>
                    <p id="anio" class="anio"></p>
                </div>
                <div class="reloj">
                    <p id="horas" class="horas"></p>
                    <p>:</p>
                    <p id="minutos" class="minutos"></p>
                    <p>:</p>
                    <div class="cajaSegundos">
                        <p id="ampm" class="ampm"></p>
                        <p id="segundos" class="segundos"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 infoUsuario">
           <br>
                
        </div>
    </div>

</form>