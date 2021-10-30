<template>
    <v-container>
        <div>
            <p>Aquí va la gráfica de {{pais}}</p>
            <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
            ></v-progress-circular>
            <apexchart v-if="!loading" width="1000" type="line" :options="options" :series="series" v-bind:key="series"></apexchart>
        </div>
    </v-container>
</template>

<script>

export default {
    props: ['pais', 'tipo'],
    
    watch:{
        series:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
        },
        pais:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.pais = newCripto
            this.cargarDatos()
        },
        tipo:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.tipo = newCripto
            this.cargarDatos()
        }
    },

    methods:{
        async cargarDatos(){
            this.dates = []
            this.values = []
            this.nombres = []
            await this.axios.get('https://storage.googleapis.com/covid19-open-data/v3/location/'+this.pais+'.json').then((response)=>{
                console.log(response);
                response.data.columns.forEach(element =>{
                    this.nombres.push(element)
                })
                response.data.data.forEach(element =>{
                    this.dates.push(element[1])
                    var indice = this.nombres.indexOf(this.tipo)
                    this.values.push(element[indice])
                })
            this.dates.slice(-2)
            this.values.slice(-2)
            //this.options[0].xaxis = this.dates;//Qué debemos meter aquí
            //this.series[0].data = this.values;//Qué debemos meter aquí
            this.series = [{
                data: this.values
            }]

            this.options = {
                xaxis: {
                    categories: this.dates,
                    tickAmount: 15,
                },
                yaxis: {
                    decimalsInFloat: 0,
                },
                stroke: {
                    width: 1,
                }
            
            }
            this.loading = false
            
            })
            console.log(this.dates)
            console.log(this.values)
        }
    },

    data: () => ({
        displayChart:true,
        loading:true,
        options: {
            chart: { 
                id: 'vuechart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
        tipo:"",
        dates:[],
        values:[],
        nombres:[],
    })

}
</script>
