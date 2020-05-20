<?php
// Conexion mysqli
include'../conexion/conexionli.php';

$cadena = "SELECT
                id_datos,
                CONCAT(nombre,' ',ap_materno,' ', ap_paterno),
                activo
            FROM
                datos 
            WHERE 
                activo=1  
            ORDER BY 
                id_datos";
$consultar = mysqli_query($conexionLi, $cadena);

while($row = mysqli_fetch_array($consultar))
{  
	if ($rowl[0]!=$row[0]) {
    ?>
    <option value="<?php echo $row[0];?>"><?php echo $row[1];?></option>
    <?php
	}
}
?>
