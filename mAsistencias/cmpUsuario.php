<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//Variable de Nombre

$clave   = $_POST['clave'];
    $cadena = "SELECT 
                    clave,
                    activo
                FROM
                    datos
                WHERE
                    clave = $clave";
            
$Result = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);
    while($row = mysqli_fetch_array($Result)) {
                $claveC = $row[0];        
                $activo = $row[1];        
            }             
            if (($claveC == $clave) && ($activo == 1)) {
               $res = 'Si';
            } else if (($claveC == $clave) && ($activo == 0)){
                $res = 'Activo';
            }else {
                $res = 'No';
            }
            echo $res;

//Cierro la conexionLi
mysqli_close($conexionLi);
?>