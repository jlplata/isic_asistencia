<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id          = $_POST['id'];
$UsTemaE     = $_POST['UsTema']; 
$person_name = $_POST['person_name'];
$user_name   = trim($_POST['user_name']);
$UsFechaCdu  = trim($_POST['UsFechaCdu']); 
$checkDpE    = trim($_POST['checkDp']); 
$checkEcE    = trim($_POST['checkEc']); 
$checkUsE    = trim($_POST['checkUs']); 
$checkTmE    = trim($_POST['checkTm']); 

//Se actualiza registro en tabla usuarios
$cadena = "UPDATE usuarios 
			SET 
				nombre_usuario        		= '$user_name',
				id_dato 		            = $person_name,
				id_tema                     = $UsTemaE,
                fecha_caducidad 			= '$UsFechaCdu',
				permiso_datos_persona       = '$checkDpE',
				permiso_ecivil              = '$checkEcE',
				permiso_usuario             = '$checkUsE',
				permiso_temas               = '$checkTmE'
			WHERE 
				id_usuario = $id";

$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>