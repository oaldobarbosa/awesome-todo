<template>
  <q-page class="q-pa-md">

    <template v-if="tasksDownloaded">
      <!-- search and sort -->
      <div class="row q-mb-lg">
        <search />
        <sort />
      </div>

      <!-- No search Results -->
      <p v-if="!Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length && search">No Search Results.</p>

      <!-- no tasks -->
      <no-tasks @showAddTask="showAddTask = true" v-if="!Object.keys(tasksTodo).length && !search" ></no-tasks>

      <!-- list tasks -->
      <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />

      <!-- list completed -->
      <tasks-completed v-if="Object.keys(tasksCompleted).length" :tasksCompleted="tasksCompleted" />
      
      <!-- botao para adicionar nova task -->    
      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn 
        @click="showAddTask = true"
        round 
        color="primary" 
        size="24px" 
        icon="add" />
      </div>

    </template>

    <template v-else>
      <span class="absolute-center">
        <q-spinner
          color="primary"
          size="3em"
        />      
      </span>
    </template>




    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"  />   
    </q-dialog>

  </q-page>
</template>

<script>

import { mapGetters, mapState } from "vuex";

export default {
  data(){
    return{
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]), //mapear tasksTodo e tasksCompleted
    ...mapState('tasks', ['search', 'tasksDownloaded']) //mapear State de search
  },
  components: { //componentes

    'add-task': require("components/Tasks/Modals/AddTask.vue").default,
    'tasks-todo': require("components/Tasks/TasksTodo.vue").default,
    'no-tasks': require("components/Tasks/NoTasks.vue").default,
    'tasks-completed': require("components/Tasks/TasksCompleted.vue").default,
    'search': require("components/Tasks/Tools/Search.vue").default,
    'sort': require("components/Tasks/Tools/Sort.vue").default,
    
  },
};
</script>

<style>
</style>