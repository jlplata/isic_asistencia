<?php

include'../conexion/conexionli.php';

//Variable de Nombre
$varGral="-CT";

$nombre = trim($_POST['nombre']);
$colorL = trim($_POST['colorL']);
$colorB = trim($_POST['colorB']);
$colorBF = trim($_POST['colorBF']);
$colorBd = trim($_POST['colorBd']);

$activo    = 1;

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");
$cadenaMenu = "INSERT INTO temas
                            (nombre_tema,
                            color_letra,
                            color_base,
                            color_base_fuerte,
                            color_borde,
                            activo,
                            fecha_registro,
                            hora_registro)
                            VALUES
                            ('$nombre',
                            '$colorL',
                            '$colorB',
                            '$colorBF',
                            '$colorBd',
                            $activo,
                            '$fecha',
                            '$hora')";
$consultarMenu = mysqli_query($conexionLi, $cadenaMenu);
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>