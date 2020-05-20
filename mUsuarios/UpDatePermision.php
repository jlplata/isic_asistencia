<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id          = $_POST['id'];
$checkDp    = trim($_POST['checkDp']); 
$checkEc    = trim($_POST['checkEc']); 
$checkUs    = trim($_POST['checkUs']); 
$checkTm    = trim($_POST['checkTm']); 

//Se actualiza registro en tabla usuarios
$cadena = "UPDATE usuarios 
			SET 
				permiso_datos_persona       = '$checkDp',
				permiso_ecivil              = '$checkEc',
				permiso_usuario             = '$checkUs',
				permiso_temas               = '$checkTm'
			WHERE 
				id_usuario = $id";

$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>