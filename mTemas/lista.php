<?php

include'../conexion/conexionli.php';
include'../funciones/diasTranscurridos.php';


//Variable de Nombre
$varGral="-CT";

$fecha=date("Y-m-d"); 
$cadenaMenu = "SELECT
                    id_tema,
                    activo,
                    nombre_tema,
                    fecha_registro,
                    hora_registro,
                    color_letra,
                    color_base,
                    color_base_fuerte,
                    color_borde
                FROM
                    temas";
$consultarMenu = mysqli_query($conexionLi, $cadenaMenu);
?>


<div class="table-responsive">
<table id="example<?php echo $varGral;?>" class="table table-striped table-bordered" style="width:100%">

        <thead>
            <tr class='hTabla'>
                <th scope="col">#</th>
                <th scope="col">Editar</th>
                <th scope="col">Exportar</th>
                <th scope="col">Aplicar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha de Creación</th>
                <th scope="col">Hora de Creación</th>
                <th scope="col">Activo</th>
            </tr>
        </thead>

        <tbody>
        <?php
        // Recorro el arreglo y le asigno variables a cada valor del item
        $n=1;
        while( $row = mysqli_fetch_array($consultarMenu) ) {

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
            $fechaR     = dias_transcurridos($fecha,$row[3]);
            $ver = ($fechaR == 1 ) ? 'Creado hace '.$fechaR.' día' : 'Creado hace '.$fechaR.' días' ;
            $HoraR      = $row[4];
            $colorl     = $row[5];
            $colorb     = $row[6];
            $colorbf     = $row[7];
            $colorbd     = $row[8];
            


            ?>
            <tr class="centrar">
                <th scope="row" class="textoBase">
                    <?php echo $n?>
                </th>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="editar btn btn-outline-success btn-sm activo" id="btnEditar<?php echo $varGral?><?php echo $n?>" onclick="llenar_formulario_CT('<?php echo $id?>','<?php echo $nombre?>','<?php echo $colorl?>','<?php echo $colorb?>','<?php echo $colorbf?>','<?php echo $colorbd?>')">
                                <i class="far fa-edit fa-lg"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="exportar btn btn-outline-dark btn-sm activo" id="btnExportar<?php echo $varGral?><?php echo $n?>" onclick="exportarTemas('<?php echo $id?>')">
                                <i class="fas fa-file-export"></i>
                    </button>
                </td>
                <td>
                    <button <?php echo $dtnDesabilita?> type="button" class="aplicar btn btn-outline-info btn-sm activo" id="btnAplicar<?php echo $varGral?><?php echo $n?>" colorL= '<?php echo $colorl?>' colorB = '<?php echo $colorb?>' colorBF = '<?php echo $colorbf?>' colorBd = '<?php echo $colorbd?>' n='<?php echo $n?>' onclick="aplicarTema(<?php echo $id ?>,'enlace')">
                             <i class="fas fa-check-double"></i>
                    </button>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $nombre ?>
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $ver ?> 
                    </label>
                </td>
                <td>
                    <label class="textoBase">
                        <?php echo $HoraR ?>
                    </label>
                </td>

                <td>
                    <input value="<?php echo $chkValor?>" onchange="cambiar_estatus_CT(<?php echo $id?>,<?php echo $n?>)" class="toggle-two" type="checkbox" <?php echo $chkChecado?> data-toggle="toggle" data-onstyle="outline-success" data-width="60" data-size="sm" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="check<?php echo $n?>">
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
                <th scope="col">Exportar</th>
                <th scope="col">Aplicar</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha de Creación</th>
                <th scope="col">Hora de Creación</th>
                <th scope="col">Activo</th>
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
                [ 20, 40, 60, -1 ],
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
                            nuevo_registro_CT();
                          }
                      },
                      {
                          extend: 'excel',
                          text: "<i class='far fa-file-excel fa-lg' aria-hidden='true'></i> &nbsp;Exportar a Excel",
                          className: 'btn btn-outline-secondary btnEspacio',
                          title:'Lista_de_Temas',
                          id: 'btnExportar',
                          exportOptions: {
                            columns:  [4,5,6],
                          }
                      },
                      { 
                        text: "<i class='fas fa-file-import'></i> Importar Tema",
                        className: 'btn btn-outline-dark btnEspacio',
                        id: 'btnExportar',
                        action: function () {
                            abrirModalArchivo();
                        }
                      }

            ]
        } );
    } );

</script>

<script>
    $('.toggle-two').bootstrapToggle();
    $('button.aplicar').each(function() {
        var aver = $(this).attr('id');
        console.log('este es el id '+ aver);

        $(this).mouseover(function () {
            var colorL =  $(this).attr('colorL');
            var colorB =  $(this).attr('colorB');
            var colorBF = $(this).attr('colorBF');
            var colorBd = $(this).attr('colorBd');
            cssTema(colorBF, colorB, colorL, colorBd);  
        });

        $(this).mouseout(function () {
            var idTema=$("#inicioIdTema").val();
            aplicarTema(idTema,'login');
        });
    });
</script>