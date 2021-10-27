<template>
    <v-container>
        <div>
            <p>Aquí va la gráfica con {{cripto}} {{moneda}} {{plazo}}</p>
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
    props: ['cripto', 'moneda', 'plazo'],
    
    watch:{
        series:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
        },
        cripto:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.cript = newCripto
            this.cargarDatos()
        },
        moneda:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.coin = newCripto
            this.cargarDatos()
        },
        plazo:function(newCripto, oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.time = newCripto
            this.cargarDatos()
        }
    },

    methods:{
        async cargarDatos(){
            await this.axios.get('https://api.coingecko.com/api/v3/coins/'+this.cript+'/market_chart?vs_currency='+ this.coin + '&days='+ this.time).then((response)=>{
                console.log(response);
                response.data.prices.forEach(element => {

                    const milliseconds = element[0] // 1575909015000
                    const dateObject = new Date(milliseconds)
                    var day = dateObject.getDate();
                    var mes = dateObject.getMonth();
                    var year = dateObject.getFullYear();

                    var formatDate = day + '/' + mes + '/' + year
                    this.dates.push(formatDate)
                })
                response.data.prices.forEach(element => {
                    this.values.push(element[1])
                })
            })
            this.dates.shift()
            this.values.shift()
            console.log(this.dates)
            console.log(this.values)
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
        cript:"",
        coin:"",
        time:"",
        dates:[],
        values:[],
    })

}
</script>
