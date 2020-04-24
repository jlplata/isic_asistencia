<div class="modal fade" id="modalArchivo" tabindex="-1" role="dialog" aria-labelledby="modalDatosCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document" >
        <div class="modal-content">
        <div class="modal-header" >
            <h5 class="modal-title" id="">Importar Tema</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form action="#" method="post" id="formSubidaA">
            
                <input id="imageA" type="file"  class="file"  data-theme="fas">
            
                <input type="hidden" class="form-control-file" name="claveArchivo" id="claveArchivo" >
                <input type="hidden" class="form-control-file" name="AtamanoKB" id="AtamanoKB" value="3000">
                <div class="col text-center">
                <button type="button" onclick="importarArchivo();" class="btn btn-outline-dark" style="margin-top:8px;">
                    <i class="fas fa-download"></i> Importar Tema
                </button>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-dismiss="modal">
                <i class="fas fa-times"></i> Cerrar
            </button>
        </div>
        </div>
        </div>
    </div>