
<?php
// Conexion mysqli
include'../conexion/conexionli.php';
//metodo para dias creados
include'../funciones/diasTranscurridos.php';
//Variable de Nombre
$varGral="-Us";
$fecha=date("Y-m-d"); 

$cadena = "SELECT
                u.id_usuario,
                u.activo,
                CONCAT(d.nombre,' ',d.ap_materno,' ', d.ap_paterno),
                u.nombre_usuario,
                u.fecha_registro,
                u.fecha_caducidad,
                d.id_datos,
                u.id_tema,
                u.permiso_datos_persona,
                u.permiso_ecivil,
                u.permiso_usuario,
                u.permiso_temas
                FROM usuarios as u 
                INNER JOIN 	datos as d 
                            on u.id_dato = d.id_datos";
$consultar = mysqli_query($conexionLi, $cadena);
//$row = mysqli_fetch_array($consultar);

?>
<div class="table-responsive">
<table id="example<?php echo $varGral;?>" class="table table-striped table-bordered" style="width:100%">

        <thead>
            <tr class='hTabla'>
                <th scope="col">#</th>
                <th scope="col">Editar</th>
                <th scope="col">Resetear Password</th>
                <th scope="col">Permisos de Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Nombre de Usuario</th>
                <th scope="col">Fecha de Creación</th>
                <th scope="col">Fecha de Caducidad</th>
                <th scope="col">Status</th>
            </tr>
        </thead>

        <tbody>
        <?php
        // Recorro el arreglo y le asigno variables a cada valor del item
        $n=1;
        while( $row = mysqli_fetch_array($consultar) ) {

            $id          = $row[0];

            if ($row[1] == 1) {
                $chkChecado    = "checked";
                $dtnDesabilita = "";
                $chkValor      = "1";
            }else{
                $chkChecado    = "";
                $dtnDesabilita = "disabled";
                $chkValor      = "0";
            }

            $nombre     = $row[2];
            $user_name    = $row[3];

            $fechaRr = $row[4];
            $fechaCd = $row[5];
            
            $fechaR     = dias_transcurridos($fecha, $row[4]);
            if ($fechaR <= 1) {
                $ver = ($fechaR < 1 ) ? 'Fue creado el día de hoy.' : 'Creado hace '.$fechaR.' día.' ;
                
            }else{
                $ver = 'Creado hace '.$fechaR.' días' ;
            }
            
            $fechaC     = dias_transcurridos($row[5], $fecha);
            if ($fechaC <= 1) {
                $verC = ($fechaC < 1 ) ? 'El tiempo de uso de este usuario a cadudado.' : 'El tiempo de uso de este usuario caducira en '.$fechaC.' día.' ;

            }else{
                $verC = 'El tiempo de uso de este usuario caducira en '.$fechaC.' días.' ;
            }

            $IDD = $row[6];
            $IDT = $row[7];
            $checkDp = $row[8];
            $checkEc = $row[9];
            $checkUs = $row[10];
            $checkTm = $row[11];
           ?>
           
            <tr class="centrar">
                <th scope="row" class="textoBase">
                    <?php echo $n?>
                </th>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="editar btn btn-outline-success btn-sm activo" id="btnEditar<?php echo $varGral?><?php echo $n?>" onclick="llenar_formulario_Us('<?php echo $id?>','<?php echo $IDD?>','<?php echo $user_name?>','<?php echo $IDT?>','<?php echo $checkDp?>','<?php echo $checkEc?>','<?php echo $checkUs?>','<?php echo $checkTm?>','<?php echo $fechaCd?>')">
                                <i class="far fa-edit fa-lg"></i>
                    </button>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="RestPass btn btn-outline-warning btn-sm activo" id="btnResetPass<?php echo $varGral?><?php echo $n?>" onclick="ResetPass('<?php echo $id?>')">
                                <i class="fas fa-redo-alt"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="PermisosUs btn btn-outline-info btn-sm activo"  id="btnPermisosUs<?php echo $varGral?><?php echo $n?>" onclick="abrirModalPermisos_Us('<?php echo $id?>','<?php echo $user_name?>','<?php echo $checkDp?>','<?php echo $checkEc?>','<?php echo $checkUs?>','<?php echo $checkTm?>')">
                                <i class="fas fa-vote-yea"></i>
                    </button>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $nombre?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $user_name?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $ver?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $verC?>
                    </label>
                </td>
                <td>
                    <input value="<?php echo $chkValor?>" onchange="cambiar_estatus_Us(<?php echo $id?>,<?php echo $n?>)" class="toggle-two" type="checkbox" <?php echo $chkChecado?> data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="check<?php echo $n?>">
                </td>
            </tr>
        <?php
        $n++;
        }
        ?>

        </tbody>
        <tfoot>
            <tr class='hTabla'>
            <th scope="col">#</th>
            <th scope="col">Editar</th>
            <th scope="col">Resetear Password</th>
            <th scope="col">Permisos de Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nombre de Usuario</th>
            <th scope="col">Fecha de Creación</th>
            <th scope="col">Fecha de Caducidad</th>
            <th scope="col">Status</th>
            </tr>
        </tfoot>
    </table>
<div>

<?php
//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexionLi
mysqli_close($conexionLi);
?>

<script type="text/javascript">
  var varGral='<?php echo $varGral?>';
  $(document).ready(function() {
        $('#example'+varGral).DataTable( {
            "language": {
                    // "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    "url": "../plugins/dataTablesB4/langauge/Spanish.json"
                },
            "order": [[ 0, "asc" ]],
            "paging":   true,
            "ordering": true,
            "info":     true,
            "responsive": true,
            "searching": true,
            stateSave: true,
            dom: 'Bfrtip',
            lengthMenu: [
                [ 10, 25, 50, -1 ],
                [ '10 Registros', '25 Registros', '50 Registros', 'Todos' ],
            ],
            columnDefs: [ {
                // targets: 0,
                // visible: false
            }],
            buttons: [
                      {
                          text: "<i class='fas fa-plus fa-lg' aria-hidden='true'></i> &nbsp;Nuevo Registro",
                          className: 'btn btn-outline-primary btnEspacio',
                          id: 'btnNuevo',
                          action : function(){
                           nuevo_registro_Us();
                          }
                      },
                      {
                          extend: 'excel',
                          text: "<i class='far fa-file-excel fa-lg' aria-hidden='true'></i> &nbsp;Exportar a Excel",
                          className: 'btn btn-outline-secondary btnEspacio',
                          title:'Lista_usuarios',
                          id: 'btnExportar',
                          exportOptions: {
                            columns:  [4,5,6,7],
                          }
                      }

            ]
        } );
    } );

</script>
<script>
    $('.toggle-two').bootstrapToggle();
</script>
