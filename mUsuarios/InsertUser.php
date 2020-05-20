<?php

include'../conexion/conexionli.php';

//Variable de Nombre
$varGral="-Us";
$person_name = trim($_POST['person_name']);
$user_name   = trim($_POST['user_name']);
$UsFechaCdu  = trim($_POST['UsFechaCdu']);
$UsTema      = trim($_POST['UsTema']);
$checkDp     = trim($_POST['checkDp']);
$checkEc     = trim($_POST['checkEc']);
$checkUs     = trim($_POST['checkUs']);
$checkTm     = trim($_POST['checkTm']);
$activo      = 1;
$contra      = 12345678;
$fecha       = date("Y-m-d"); 

$cadenaMenu = "INSERT INTO usuarios
                            (id_dato,
                            id_tema,
                            nombre_usuario,
                            contra,
                            permiso_datos_persona,
                            permiso_ecivil,
                            permiso_usuario,
                            permiso_temas,
                            fecha_caducidad,
                            fecha_registro,
                            activo)
                            VALUES
                            ('$person_name',
                            '$UsTema',
                            '$user_name',
                            $contra,
                            '$checkDp',
                            '$checkEc',
                            '$checkUs',
                            '$checkTm',
                            '$UsFechaCdu',
                            '$fecha',
                            $activo)";
$consultarMenu = mysqli_query($conexionLi, $cadenaMenu);
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>