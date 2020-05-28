<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//Variable de Nombre

$id_dato   = $_POST['clave'];
$fecha       = date("Y-m-d");
$hora=date ("H:i:s");


    $cadenaD = "SELECT
                    id_datos
                FROM
                    datos
                WHERE
                    clave = $id_dato";
            
$Resultd = mysqli_query($conexionLi, $cadenaD);
//$row = mysqli_fetch_array($consultar);
    while($rowd = mysqli_fetch_array($Resultd)) {
                $id = $rowd[0];        
            }     

    $cadena = "SELECT 
                    id_datos,
                    fecha_entrada,
                    hora_entrada,
                    hora_salida,
                    checkH
                FROM
                    asistencias
                WHERE 
                    id_datos = $id and fecha_entrada = '$fecha'";
            
$Result = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);
    while($row = mysqli_fetch_array($Result)) {
                $id_datos = $row[0];        
                $fecha_entrada = $row[1];  
                $hora_entrada = $row[2];      
                $hora_salida = $row[4];      
                $check = $row[3];      
            }
            if (($id_datos == NULL) && ($fecha_entrada == NULL) && (($hora_entrada == NULL))) {
                $res = 'Si';
            } else if (($id_datos == $id) && ($fecha_entrada == $fecha) && ($hora_entrada != NULL)) {
                if ($check == 1) {
                    $res = 'Si';
                }else {
                    $res = 'Ya'; 
                }
            } else {
                $res = 'No';
            }
            echo $res;
            // ($id_datos == $id) && ($hora_salida == NULL) && ($fecha_salida == Null)
//Cierro la conexionLi
mysqli_close($conexionLi);
?>