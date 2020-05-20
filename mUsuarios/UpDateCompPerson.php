<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//Variable de Nombre
$IDps   = $_POST['person_name'];
$idC = $_POST['id'];

    $cadena = "SELECT
                    id_dato,
                    id_usuario
                FROM
                    usuarios
                WHERE
                    id_dato = $IDps";
            
$Result = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);
    while($row = mysqli_fetch_array($Result)) {
                $iDpn = $row[0];
                $id = $row[1];
            }             
            $res = (($iDpn == $IDps && $id != $idC) or ($iDpn == NULL && $id == $idC)) ? 'No' : 'Si';
            echo $res;
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexionLi
mysqli_close($conexionLi);

?>