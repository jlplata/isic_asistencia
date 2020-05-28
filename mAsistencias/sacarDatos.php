<?php

include'../conexion/conexionli.php';

include'../funciones/calcularEdad.php';

$id_dato = $_POST['clave'];

    $cadenaD = "SELECT
                CONCAT(d.nombre,' ',d.ap_paterno,' ',d.ap_materno),
                d.fecha_nac,
                d.correo,
                d.curp,
                d.clave,
                e.descripcion
                FROM
                datos as d
                INNER JOIN ecivil as e ON d.id_ecivil = e.id_ecivil
                WHERE d.clave = '$id_dato'";            
$Result = mysqli_query($conexionLi, $cadenaD);
//$row = mysqli_fetch_array($consultar);
    while($row = mysqli_fetch_array($Result)) {
                $nombre = $row[0]; 
                $fecha_nac = $row[1]; 
                $correo = $row[2]; 
                $curp = $row[3];
                $clave = $row[4];
                $descripcion = $row[5];
                $edad = CalculaEdad($fecha_nac);
                $todo = "Su nombre es <i>" .$nombre."</i>, con una edad de <i>".$edad."</i>,
                 como correo principal <i>".$correo."</i>, su curp es
                 <i>".$curp."</i> y su estado civil es <i>".$descripcion."</i>. Gracias.";
                }     
                echo $todo;
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>