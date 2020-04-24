<?php
//Variable de Nombre
$varGral="-CT";
?>
<form id="frmActualizar<?php echo $varGral?>">

<input type="hidden"  id="eIDCT">

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div class="form-group">
                <label for="nombTemaE">Nombre:</label>
                <input type="search" class="form-control" id="nombTemaE"   autofocus required >
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorLe">Color de letras: </label>
                    <input type="hidden" name="colorLe" id="colorLe" class="minicolors-input demo" value="#ffffff" size="7">  
                    <br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorBe">Color de Base: </label>
                    <input type="hidden" name="colorBe" id="colorBe" class="minicolors-input demo" value="#ffffff" size="7">  
                    <br>            
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorBFe">Color de Base Fuerte: </label>
                    <input type="hidden" name="colorBFe" id="colorBFe" class="minicolors-input demo" value="#ffffff" size="7">  
                    <br>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                    <label for="colorBde">Color de Borde: </label>
                    <input type="hidden" name="colorBde" id="colorBde" class="minicolors-input demo" value="#ffffff" size="7">  
                    <br>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-left">
                    <button  type="button" class="btn btn-outline-danger  activo btnEspacio" id="btnCancelarA<?php echo $varGral?>">
                        <i class='fa fa-ban fa-lg'></i>
                        Cancelar
                    </button>
                </div>
                <div class="col text-right">
                <button  type="button" class="btn btn-outline-info  activo btnEspacio" id="btnProbar<?php echo $varGral?>E">
                        <i class="fas fa-play"></i>
                        Probar
                    </button>
                    <button  type="submit" class="btn btn-outline-primary  activo btnEspacio" id="btnActualizar<?php echo $varGral?>">
                        <i class='fa fa-save fa-lg'></i>
                        Guardar Información
                    </button>
                </div>
            </div>
        </div>

    </div>

</form>