<div class="modal fade" id="Modalhorarios" tabindex="-1" role="dialog" aria-labelledby="ModalhorariosLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="txtTitularHorario">Horarios</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class ="container">
         <div class="row">

         <label id ="idH" style=" display:none;" ></label>
          
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div class="form-group">
                <select id="Turno" style="width: 100%" >
                  <option value="Turno Especial"> Turno Especial</option>
                  <option value="Turno Matutino"> Turno Matutino</option>
                  <option value="Turno Vespertino"> Turno Vespertino</option>
                  <option value="Turno Nocturno"> Turno Nocturno</option>
                </select>
            </div>
            

        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
         
            <label style="font-size: 24px;" id = "Hrs" value = 0 valueL = 0 valueM = 0 valueMi = 0 valueJ = 0 valueV = 0 valueS = 0 valueD = 0 class="label-danger">Horas Totales 30 Hrs</label>
        </div>
        
      </div>
      
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-dark"  id = 'Lunes' >Lunes</button>
                <button type="button" class="btn btn-outline-dark" id = 'Martes'>Martes</button>
                <button type="button" class="btn btn-outline-dark" id = 'Miercoles'>Miercoles</button>
                <button type="button" class="btn btn-outline-dark" id = 'Jueves'>Jueves</button>
                <button type="button" class="btn btn-outline-dark" id = 'Viernes'>Viernes</button>
                <button type="button" class="btn btn-outline-dark" id = 'Sabado'>Sabado</button>
                <button type="button" class="btn btn-outline-dark" id = 'Domingo'>Domingo</button>
              </div>
            </div>
          </div> 
<br>
        <h5 class="modal-title" id="Dia">Lunes</h5>
          <section id = "HLunes">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraEL">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraEL"  autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSL">Hora de salida:</label>
                      <input type="time"  class="form-control " id="HoraSL" min="18:00" max="23:00" >
                  </div>
              </div>
            </div>
          </section>
          <section id = "HMartes">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraEM">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraEM" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSM">Hora de salida:</label>
                      <input type="time" class="form-control " id="HoraSM" required>
                  </div>
              </div>
            </div>
          </section>
          <section id = "HMiercoles">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraEMi">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraEMi" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSMi">Hora de salida:</label>
                      <input type="time" class="form-control " id="HoraSMi" required>
                  </div>
              </div>
            </div>
          </section>
          <section id = "HJueves">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraEJ">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraEJ" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSJ">Hora de salida:</label>
                      <input type="time" class="form-control " id="HoraSJ" required>
                  </div>
              </div>
            </div>
          </section>
          <section id = "HViernes">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraEV">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraEV" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSV">Hora de salida:</label>
                      <input type="time" class="form-control " id="HoraSV" required>
                  </div>
              </div>
            </div>
          </section>
          <section id = "HSabado">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraES">Hora de entrada:</label>
                      <input type="time" class="form-control " id="HoraES" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSS">Hora de salida:</label>
                      <input type="time" class="form-control " id="HoraSS" required>
                  </div>
              </div>
            </div>
          </section>
          <section id = "HDomingo">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraED">Hora de entrada:</label>
                      <input type="time" class="form-control" id="HoraED" autofocus required>
                  </div>
              </div>
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-4">
                  <div class="form-group">
                      <label for="HoraSD">Hora de salida:</label>
                      <input type="time" class="form-control" id="HoraSD" required>
                  </div>
              </div>
            </div>
          </section>
                    
        
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="Borrar();" data-dismiss="modal">Close</button>

          <button class="btn btn-primary" type="button" id="BtnGuardarH" disable onclick="GuardarH();">Guardar</button>
      </div>
    </div>
  </div>
</div>