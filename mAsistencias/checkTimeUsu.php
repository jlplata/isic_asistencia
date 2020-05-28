<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$clave = $_POST['clave'];

//seleccione registros tabla datos
$cadena = "SELECT   hrs.turno,
                    hrs.l_entrada,
                    hrs.l_salida,
                    hrs.m_entrada,
                    hrs.m_salida,
                    hrs.mi_entrada,
                    hrs.mi_salida,
                    hrs.j_entrada,
                    hrs.j_salida,
                    hrs.v_entrada,
                    hrs.v_salida,
                    hrs.s_entrada,
                    hrs.s_salida,
                    hrs.d_entrada,
                    hrs.d_salida
                    FROM
                        datos as d right JOIN horarios as hrs
                        on hrs.id_datos_persona = d.id_datos 
                    WHERE   d.clave = $clave";

$consultar = mysqli_query($conexionLi, $cadena);
$row_cnt = $consultar->num_rows;

	$arreglo = $consultar->fetch_assoc();
	$data['cRegistros'] = $row_cnt;
	$data['result'] = $arreglo ;

//returns data as JSON format
echo json_encode($data);
?>