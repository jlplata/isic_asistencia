<?php
// Conexion mysqli
include'../conexion/conexionli.php';

$cadena = "SELECT
                id_tema,
                nombre_tema
            FROM
                temas
            WHERE 
                activo=1  
            ORDER BY 
                id_tema";
$Result = mysqli_query($conexionLi, $cadena);

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