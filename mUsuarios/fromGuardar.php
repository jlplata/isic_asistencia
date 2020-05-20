<?php
//Variable de Nombre
$varGral="-Us";
?>
<form id="frmGuardar<?php echo $varGral?>">


<input type="hidden"  id="UsNameCompG">
<input type="hidden"  id="PerNameCompG">
    
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="person_name">Persona:</label>
                <select id="person_name" class="select2" style="width: 100%" >

                </select>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div class="form-group">
                <label for="UserNameG">Nombre de Usuario:</label>
                <input type="text" class="form-control" id="UserNameG"   autofocus required >
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="UsFechaCduG">Fecha de Caducidad:</label>
                <input type="date" class="form-control activo" id="UsFechaCduG" required value="<?php echo $fecha ?>">
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div class="form-group">
                <label for="UsTema">Temas:</label>
                <select id="UsTema" class="select2" style="width: 100%" >

                </select>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <h4>Permisos de acceso</h4>
                    <button type="button" id="BtnPermisosE" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                    Sin Permisos
                    </button>
                </div>
            </div>
        </div>


        <div class="container">
            <div class="row">
                
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <br>
                    <section id = "Dp">
                        <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkDp">
                        &nbsp; Datos Personales
                        </button>
                    </section>
                </div>
                
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <br>
                    <section id = "Ec">
                        <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkEc">
                        &nbsp; Estado Civil
                        </button>
                    </section>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <section id = "Us">  
                        <br>                  
                        <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkUs">
                        &nbsp; Usuarios
                        </button>
                    </section>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                    <section id = "Tm">
                        <br>
                        <input type="checkbox"  data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="<i class='fa fa-check'></i> Si" data-off="<i class='fa fa-times'></i> No" id="checkTm">
                        &nbsp; Temas
                        </button>
                    </section>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <br>
                <div class="col text-left">
                    <br>
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarG<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>
                <div class="col text-right">
                    <br>
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnGuardar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>
    </div>


</form>