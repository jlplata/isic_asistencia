<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//Variable de Nombre
$a          = $_POST['a'];


    $cadena = "SELECT   id_horario,
                    id_datos_persona
            FROM 	horarios 
            where id_datos_persona = $a";
            
$Result = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);

    while( $row = mysqli_fetch_array($Result) ) {
                 $a_DPHorario = $row[1];
                if ($a_DPHorario == $a) {
                    echo "Si";
                }else {
                    echo "No";
                }
            }

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexionLi
mysqli_close($conexionLi);
?>
