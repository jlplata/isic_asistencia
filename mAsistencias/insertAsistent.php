<?php

include'../conexion/conexionli.php';

//Variable de Nombre
$varGral="-Us";
$id_dato            = trim($_POST['clave']);
$incidencia_entrada = trim($_POST['insidencia']);
$hora_entrada       = $_POST['hraAct'];
// $fecha_salida       = $_POST['fecha_salida'];
// $hora_salida        = $_POST['hora_salida'];
// $incidencia_salida  = trim($_POST['incidencia_salida']);

$fecha       = date("Y-m-d");

    $cadenaD = "SELECT
                    id_datos
                FROM
                    datos
                WHERE
                    clave = $id_dato";
            
$Result = mysqli_query($conexionLi, $cadenaD);
//$row = mysqli_fetch_array($consultar);
    while($row = mysqli_fetch_array($Result)) {
                $id = $row[0];        
            }      

$cadena = "INSERT INTO asistencias
                            (id_datos,
                            fecha_entrada,
                            hora_entrada,
                            incidencia_entrada,
                            checkH)
                            -- fecha_salida,
                            -- hora_salida,
                            -- incidencia_salida)
                            VALUES
                            ($id,
                            '$fecha',
                            '$hora_entrada',
                            '$incidencia_entrada',
                            0)";
$consultarMenu = mysqli_query($conexionLi, $cadena);
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>