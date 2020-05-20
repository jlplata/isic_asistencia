<?php
//Variable de Nombre
$varGral="-Us";
?>
<form id="frmActualizar<?php echo $varGral?>">

    <input type="hidden"  id="eIDUs">
    <input type="hidden"  id="UsNameComp">
    <input type="hidden"  id="PerNameComp">

    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="person_nameE">Persona:</label>
                <select id="person_nameE" class="select2" style="width: 100%" >

                </select>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div class="form-group">
                <label for="UserName">Nombre de Usuario:</label>
                <input type="text" class="form-control" id="UserName"   autofocus required >
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="UsFechaCdu">Fecha de Caducidad:</label>
                <input type="date" class="form-control activo" id="UsFechaCdu" required value="<?php echo $fecha ?>">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="UsTemaE">Temas:</label>
                <select id="UsTemaE" class="select2" style="width: 100%" >

                </select>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-12 ">
                    <h3>Permisos de acceso</h3>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkDpE">
                    &nbsp; Datos Personales
                    </button>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkEcE">
                    &nbsp; Estado Civil
                    </button>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkUsE">
                    &nbsp; Usuarios
                    </button>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkTmE">
                    &nbsp; Temas
                    </button>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <br>
                <div class="col text-left">
                    <br>
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarE<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>
                <div class="col text-right">
                    <br>
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnGuardarE<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>
    </div>

</form>