<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//Variable de Nombre

$cadena = "SELECT
                d.id_datos,
                CONCAT(d.nombre,' ', d.ap_materno,' ', d.ap_paterno),
                d.activo            
                FROM
                    datos as d LEFT JOIN 
                    usuarios as u on u.id_dato = d.id_datos
                WHERE 
                    d.activo = 1 and ISNULL(u.id_dato)
                ORDER BY 
                    d.id_datos";
            
$Result = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);
while($row = mysqli_fetch_array($Result))
{  
	if ($rowl[0]!=$row[0]) {
    ?>
    <option value="<?php echo $row[0];?>"><?php echo $row[1];?></option>
    <?php
	}
}   
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexionLi
mysqli_close($conexionLi);
?>