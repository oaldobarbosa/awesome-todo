<template>
    <q-card>
        <modal-header>Edit Task</modal-header>

        <q-form @submit="submitForm">

            <q-card-section class="q-pt-none">
                <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
                <modal-due-date :dueDate.sync="taskToSubmit.dueDate" @clear="clearDues" />
                <modal-due-time v-if="taskToSubmit.dueDate" :dueTime.sync="taskToSubmit.dueTime"  />

            </q-card-section>

            <modal-buttons></modal-buttons>
        </q-form>

    </q-card>
</template>

<script>
import ModalHeader from 'components/Tasks/Modals/Shared/ModalHeader.vue';
import { mapActions } from 'vuex'
import ModalTaskName from 'components/Tasks/Modals/Shared/ModalTaskName.vue';
import ModalDueDate from 'components/Tasks/Modals/Shared/ModalDueDate.vue';
import ModalDueTime from 'components/Tasks/Modals/Shared/ModalDueTime.vue';
import ModalButtons from 'components/Tasks/Modals/Shared/ModalButtons.vue';

export default {
    props: ['task', 'id',],
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
        ...mapActions('tasks', ['updateTask']),

        submitForm(){
            this.$refs.modalTaskName.$refs.name.validate();
            if (!this.$refs.modalTaskName.$refs.name.hasErro) {
            this.submitTask()              
            }
        },
        submitTask(){
            this.updateTask({
                id: this.id,
                updates: this.taskToSubmit
            })
            this.$emit('close')
        },
        clearDues(){
            this.taskToSubmit.dueDate = "";
            this.taskToSubmit.dueTime = "";
        }

    },
    components:{
        'modal-header': require("components/Tasks/Modals/Shared/ModalHeader.vue").default,
        'modal-task-name': require("components/Tasks/Modals/Shared/ModalTaskName.vue").default,
        'modal-due-date': require("components/Tasks/Modals/Shared/ModalDueDate.vue").default,
        'modal-due-time': require("components/Tasks/Modals/Shared/ModalDueTime.vue").default,
        'modal-buttons': require("components/Tasks/Modals/Shared/ModalButtons.vue").default     
    },
    mounted() {
        this.taskToSubmit = Object.assign({}, this.task)
    }

}
</script>

<style>

</style>