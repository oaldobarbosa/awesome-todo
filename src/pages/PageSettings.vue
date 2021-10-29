<template>
  <q-page class="q-pa-md">
      <!-- <p>Settings Page</p> -->

      <q-card class="my-card text-white q-pa-xs" >
        <q-card-section class="row justify-between">
          <div>
            <div class="text-h5">Seu Plano</div>
            <div class="text-subtitle4">Plano Clássico</div>
          </div>

          <div>
            <q-btn size="13px" dense flat no-caps label="Ver Mais" icon-right="arrow_forward" />
          </div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          <div class="row">
            <div class="left">
              <q-circular-progress
                show-value
                class="text-light-white q-ma-md"
                :value="61"
                :thickness="0.2"
                track-color="grey-5"
                placeholder="aldo"
                size="100px"
                color="card"
              />

            </div>

            <div class="right"></div>
          </div>
          
           
          
        </q-card-section>

        <q-separator dark inset />

        <q-card-actions>
          <div class="footer-card">
            válido até: 18/10/2021
          </div>          
        </q-card-actions>
      </q-card>

  </q-page>
</template>

<script>

  export default {
    
  }
  
</script>

<style>

.my-card{
  background-color: #44D466;
}

 
</style>