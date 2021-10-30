<template>
    <v-container>
        <h2>Estadísticas de Covid por país</h2>
        <v-row style="margin-top:10px;">
            <v-col cols="12" md="4">
                <v-select
                :items="paises"
                item-text="name"
                v-model="selectedPais"
                item-value="id"
                label="Elige el país"
                outlined
                ></v-select>
            </v-col>
            <v-col cols="12" md="4">
                <v-select
                :items="tipos"
                item-text="name"
                v-model="tipoCaso"
                item-value="id"
                label="Elige el dato a conocer"
                outlined
                ></v-select>
            </v-col>        
        </v-row>
        <v-row>
            <v-col cols="12">
                <CasosChart :pais="selectedPais" :tipo="tipoCaso"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import CasosChart from '../components/CasosChart.vue'
export default {
    components:{
        CasosChart
    },
    data : () =>({
        selectedPais:null,
        tipoCaso:null,
        paises:[
            {
                id:"MX",
                name:"México"
            },
            {
                id:"US",
                name:"Estados Unidos"
            },
            {
                id:"AR",
                name:"Argentina"
            },
            {
                id:"CO",
                name:"Colombia"
            },
            {
                id:"VE",
                name:"Venezuela"
            },
            {
                id:"PE",
                name:"Perú"
            },
            {
                id:"US",
                name:"Estados Unidos"
            },
            {
                id:"IT",
                name:"Italia"
            },
            {
                id:"FR",
                name:"Francia"
            },
            {
                id:"DE",
                name:"Alemania"
            },
            {
                id:"ES",
                name:"España"
            },
            {
                id:"JP",
                name:"Japón"
            },
            {
                id:"CN",
                name:"China"
            },

        ],
        tipos:[
            {
                id: "cumulative_confirmed",
                name:"Casos totales"
            },
            {
                id: "cumulative_deceased",
                name:"Muertes totales"
            },
            {
                id: "new_confirmed",
                name:"Casos en el día"
            },
            {
                id: "new_deceased",
                name:"Muertes en el día"
            },
        ] 
    })
    
}
</script>