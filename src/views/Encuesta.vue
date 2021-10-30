<template>
  <v-container>
    <h2>Esta es una encuasta para que les alumnes del Tec de Monterrey contesten si dsean regresar a clases presenciales</h2>
    <v-card style="padding:40px;">
    

    <h3> Escribe tu nombre </h3> 
    <v-text-field 
      id="nombre"
      v-model="usuario.nombre"
      label="Dime tu nombre"
      hide-details="auto"
    ></v-text-field>

    <div style="margin-top:35px;"></div>

    <h3> Escribe tu apellido </h3> 

    <v-text-field 
      id="apellido"
      v-model="usuario.apellido"
      label="Dime tu apellido"
      hide-details="auto"
    ></v-text-field>

    <div style="margin-top:35px;"></div>

    <h3> Escribe tu matricula </h3>

    <v-text-field 
      id="matricula"
      v-model="usuario.matricula"
      label="Dime tu matricula"
      hide-details="auto"
    ></v-text-field>

    <div style="margin-top:35px;"></div>

    <h3> De que campus eres</h3> 
    <div style="margin-top:10px;"></div>
    <v-select
        v-model="usuario.campus"
        :items="items"
        label="Campus del Tec de Monterrey"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
        dense
    ></v-select>

    <div style="margin-top:35px;"></div>

    <h3> ¿Quieres tener clases presenciales el semestre que viene? </h3> 

    <v-switch
        v-model="autoUpdate"
        :disabled="isUpdating"
        class="mt-0"
        color="green lighten-2"
        hide-details
        @click="cambiarIr"
        
      ></v-switch>

      <div style="margin-top:35px;"></div>

      <v-btn id="Guardar"  style="margin-top:20px;" elevation="2" @click="Guardar" dark color="green">Guardar</v-btn>
    </v-card>
    <v-btn id="Mostrar"  style="margin-top:20px;" elevation="2" @click="MostrarResultados" dark color="green">Mostrar Resultados</v-btn>
    <v-card v-if="mostrar" style="margin-top:20px;">
      <h3>Total de alumnos encuestados {{count}}</h3>
      <h3>Total de alumnos que quieren ir a clases presenciales {{irCount}}</h3>
    </v-card>
  </v-container>
</template>


<script>

  export default {
    name: 'Encuesta',


    methods:{
        
        cambiarIr(){
          this.usuario.irCampus = !this.usuario.irCampus
        },
        async MostrarResultados(){
          this.count = 0;
          this.irCount = 0;
          await this.axios.get('https://backend-semanatec.herokuapp.com/form/list').then((response)=>{
            console.log(response)
            response.data.forEach(element => {
              this.count += 1
              if (element.irCampus) {
                this.irCount += 1
              }
            })
            this.mostrar = true;
          })
        },
        async Guardar(){
            await this.axios.post('https://backend-semanatec.herokuapp.com/form',this.usuario).then((response)=>{
                console.log(response);
                this.usuario.nombre=""
                this.usuario.apellido=""
                this.usuario.matricula=""
            })
        },
        mounted(){
            this.axios.get('https://backend-semanatec.herokuapp.com/form/list').then((response)=>{
            console.log(response)
            response.data.forEach(element => {
              this.count += 1
              if (element.irCampus) {
                this.irCount += 1
              }
            })
          })
        },
      
    },

    
    data: () => ({
      items: ['Aguascalientes','Chiapas', 'Chihuahua', 'Ciudad de México', 'Santa Fe', 'Cuernavaca', 'Guadalajara', 'Estado de México', 'Hidalgo'],
      
      usuario:{
        nombre:"",
        apellido:"",
        matricula:"",
        campus:"",
        irCampus:false,
      },
      count:0,
      irCount:0,
      mostrar:false,
    }),

    
  }
</script>
