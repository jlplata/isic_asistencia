<?php
//Variable de Nombre
$varGral="-CT";
?>
<form id="frmGuardar<?php echo $varGral?>">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="form-group">
                <label for="nombTema">Nombre:</label>
                <input type="search" class="form-control" id="nombTema"   autofocus required >
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorL">Color de letras: </label>
                    <input type="hidden" name="colorL" id="colorL" class="minicolors-input demo" value="#ffffff" size="7">  
                    <br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorB">Color de Base: </label>
                    <input type="hidden" name="colorB" id="colorB" class="minicolors-input demo" value="#db913d" size="7">  
                    <br>            
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorBF">Color de Base Fuerte: </label>
                    <input type="hidden" name="colorBF" id="colorBF" class="minicolors-input demo" value="#db913d" size="7">  
                    <br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorBd">Color de Borde: </label>
                    <input type="hidden" name="colorBd" id="colorBd" class="minicolors-input demo" value="#db913d" size="7">  
                    <br>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-left">
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarG<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>
                <div class="col text-right">
                    <button  type="button" class="btn btn-outline-info  activo btnEspacio" id="btnProbar<?php echo $varGral?>G">
                        <i class="fas fa-play"></i>
                        Probar
                    </button>
                </div>
                <div class="col text-right">
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnGuardar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>

    </div>

</form>