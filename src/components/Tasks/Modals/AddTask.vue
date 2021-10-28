<template>
  <q-card>
        <q-card-section class="row">
          <div class="text-h6">Add Task</div>

          <q-space />

          <q-btn 
          v-close-popup
          flat 
          dense
          round 
          icon="close" />
        </q-card-section>

        <q-form @submit="submitForm">

            <q-card-section class="q-pt-none">

                    <div class="row q-mb-sm">
                        <q-input 
                        outlined 
                        v-model="taskToSubmit.name" 
                        :rules="[val => !!val || 'Name is required']"
                        ref="name"
                        label="Task Name"
                        class="col" />
                    </div>

                    <div class="row q-mb-sm">           
                        <q-input 
                        outlined 
                        label="Due Date"
                        ref="dueDate"
                        v-model="taskToSubmit.dueDate" 
                        >
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="taskToSubmit.dueDate" >
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>


                    <div class="row q-mb-sm">
                        <q-input 
                        outlined 
                        label="Due Time"
                        ref="dueTime"
                        v-model="taskToSubmit.dueTime"
                        >
                            <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="taskToSubmit.dueTime" format24h>
                                    <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </div>


                {{taskToSubmit.name}} - 
                {{taskToSubmit.dueTime}} - 
                {{taskToSubmit.dueDate}}
            </q-card-section>


            <q-card-actions align="right">
            <q-btn 
            type="submit"
            label="Save" 
            color="primary" />
            </q-card-actions>
        </q-form>
      </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            taskToSubmit: {
                name: "",
                dueDate: "",
                dueTime: "",
                completed: false,
            }
        }
    },
    methods:{
        ...mapActions('tasks', ['addTask']),

        submitForm(){
            this.$refs.name.validate();
            if (!this.$refs.name.hasErro) {
            this.submitTask()              
            }
        },
        submitTask(){
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        }

    }

}
</script>

<style>

</style>