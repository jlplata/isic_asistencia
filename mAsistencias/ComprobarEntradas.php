<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Conexion mysqli
include ("../conexion/conexionli.php");

$horaAct = date("H:i:s");
//seleccione registros tabla datos
$cadena = "SELECT   hrs.id_datos_persona,
                    hrs.l_salida,
                    hrs.m_salida,
                    hrs.mi_salida,
                    hrs.j_salida,
                    hrs.v_salida,
                    hrs.s_salida,
                    hrs.d_salida
                    FROM
                        datos as d right JOIN horarios as hrs
                        on hrs.id_datos_persona = d.id_datos";

$Resultd = mysqli_query($conexionLi, $cadena);

while( $row = mysqli_fetch_array($Resultd) ) {
    $id = $row[0];

    $day = date("l");
    switch ($day) {
        
        case "Monday":
            $dia = $row[1];
            $cmbio = 'l_salida';
        break;
        case "Tuesday":
            $dia = $row[2];
            $cmbio = 'm_salida';
        break;
        case "Wednesday":
            $dia = $row[3];
            $cmbio = 'mi_salida';
        break;
        case "Thursday":
            $dia = $row[4];
            $cmbio = 'j_salida';
        break;
        case "Friday":
            $dia = $row[5];
            $cmbio = 'v_salida';
        break;
        case "Saturday":
            $dia = $row[6];
            $cmbio = 's_salida';
        break;
        case "Sunday":
            $dia = $row[7];
            $cmbio = 'd_salida';
        break;

    }

    $horaprueba = Date($dia);
    $NuevaFecha = strtotime ('-5 minute',strtotime ($horaprueba) ) ;
    $NuevaFecha = date ('H:i:s',$NuevaFecha); 

    if ($NuevaFecha == $horaAct) {
        $cadenaa = "UPDATE asistencias as asi INNER JOIN horarios as SP ON 
                    asi.id_datos = SP.id_datos_persona 
                        set checkH = 1 
        where $cmbio BETWEEN '$NuevaFecha' AND '$horaprueba'";
        $Resultado = mysqli_query($conexionLi, $cadenaa);
    }
}
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>