<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

$horaAct = date ("H:i:s");


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

while($rowd = mysqli_fetch_array($Resultd)) {
    $id = $rowd[0];

    $day = date("l");
    switch ($day) {
        
        case "Monday":
            $dia = $rowd[1];
        break;
        case "Tuesday":
            $dia = $rowd[2];
        break;
        case "Wednesday":
            $dia = $rowd[3];
        break;
        case "Thursday":
            $dia = $rowd[4];
        break;
        case "Friday":
            $dia = $rowd[5];
        break;
        case "Saturday":
            $dia = $rowd[6];
        break;
        case "Sunday":
            $dia = $rowd[7];
        break;

    }

    $horaprueba =  new date('H:i:s', $dia);
    echo $horaprueba;

}     


//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>