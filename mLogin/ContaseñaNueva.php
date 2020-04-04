<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id_usuario = trim($_POST['id']);
$contraseña = trim($_POST['contra']);

//Inserto registro en tabla pacientes 
$cadena = "UPDATE usuarios
			SET
				contra      = '$contraseña'
			WHERE 
				nombre_usuario = '$id_usuario'";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>