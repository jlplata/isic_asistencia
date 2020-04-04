<!-- Modal -->
<div id="modalContra" class="modal fade">
	<div class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">
							
				<h4 class="modal-title">Cambio de Contraseña</h4>	
                <button type="button" class="close" data-dismiss="modal" onClick="LimpiarContras();" aria-hidden="true">&times;</button>
            </div>
            <form id = "frmContraN" action="" method="post">
			<div class="modal-body">
					<div class="input-group mb-3">
                        <input type="password" class="form-control" id = "NContra" placeholder="Nueva Contraseña">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" id="MostrarNContra" type="button"><i id = "NCOj" class='fa fa-eye-slash'></i></button>
                        </div>
                    </div>       
					<div class="input-group mb-3">
                        <input type="password" class="form-control" id = "CNContra" placeholder="Confirmar Contraseña" >
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" id="MostrarCNContra" type="button"><i id = "CNCOj" class='fa fa-eye-slash'></i></button>
                        </div>
                    </div>       

                    <div class="container">
                        <div class="row">
                            <div class="col text-left">
                                <button  type="button" class="btn btn-outline-danger" id="btnCancelarModa" onClick="LimpiarContras();" data-dismiss="modal">
                                    <i class='fa fa-ban fa-lg'></i>
                                    Cancelar
                                </button>
                            </div>
                                <button checked type="button" class="btn btn-outline-dark" id="btnGenerarContra" onClick="GenerarContra();">
                                    <i class='fas fa-dice fa-lg'></i>
                                    Generar
                                </button>
                            <div class="col text-right">
                                <button type="button" class="btn btn-outline-primary" onClick="ContraNueva();" id="btnGuardarContra">
                                    <i class='fa fa-save fa-lg'></i>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            </form>
		</div>
	</div>
</div>   