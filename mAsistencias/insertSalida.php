<?php

include'../conexion/conexionli.php';

//Variable de Nombre
$varGral="-Us";
$id_dato            = trim($_POST['clave']);
$incidencia_salida = trim($_POST['insidencia']);
$hora_salida        = $_POST['hraAct'];
// $fecha_salida       = $_POST['fecha_salida'];
//        = $_POST['hora_salida'];
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

$cadena = "UPDATE asistencias
                SET
                    fecha_salida = '$fecha',
                    hora_salida  = '$hora_salida',
                    incidencia_salida = '$incidencia_salida'
                WHERE 
                    id_datos = $id and fecha_entrada = '$fecha'";
$consultarMenu = mysqli_query($conexionLi, $cadena);
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>