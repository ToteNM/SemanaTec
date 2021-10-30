<template>
        <form style="padding:30px">
        <div style="display: flex; align-items: center; justify-content: space-around;">
            <v-text-field
            v-model="form.name"
            label="Nombre"
            style="padding-right: 10px;"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="form.email"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            ></v-text-field>
        </div>
        <div style="display: flex; align-items: center;">
        <v-text-field
        style="max-width:20%; left:30px; padding-right: 30px;"
        v-model="form.edad"
        label="Edad"
        required
        @input="$v.edad.$touch()"
        @blur="$v.edad.$touch()"
        ></v-text-field>
        <v-select
        style="max-width:20%;"
        v-model="form.genero"
        :items="items"
        label="Género"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
        ></v-select>
        </div>
        <!--<v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
        ></v-select>-->
        <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="¿Está vacunado?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
        @click="cambiarVacunado"
        ></v-checkbox>

        <v-btn
        class="mr-4"
        @click="agregarForm"
        >
        submit
        </v-btn>
        <v-btn @click="clear">
        clear
        </v-btn>
    </form>
</template>

<script>
    export default {
        data:()=>({
            form: {
                name:"",
                email:"",
                edad:"",
                genero:"",
                vacunado:false,
            },
            items:[
                "Hombre",
                "Mujer",
                "Otro"
            ]
        }),
        methods:{
            cambiarVacunado(){
                this.form.vacunado = !this.form.vacunado
                console.log(this.form.vacunado)
                console.log(this.form.name)
                console.log(this.form.email)
                console.log(this.form.edad)
                console.log(this.form.genero)
            },
            async agregarForm(){
            await this.axios.post('https://backend-semanatec.herokuapp.com/form',this.form).then((response)=>{
                console.log(response);
            })
        },
        }
    }
</script>