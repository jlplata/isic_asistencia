<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id_usuario = $_POST['id'];
$contraseña = trim($_POST['contra']);
$dato       = trim($_POST['dato']);

//Inserto registro en tabla pacientes 
$cadena = "UPDATE usuarios
			SET
                id_usuario = $id_usuario,
				contra      = $contraseña
			WHERE 
				id_dato= $dato";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>