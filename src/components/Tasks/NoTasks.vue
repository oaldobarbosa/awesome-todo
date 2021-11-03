<template>

    <q-banner class=" no-tasks bg-grey-3">
        <template v-slot:avatar>
            <q-icon name="check" color="primary" />
        </template>
        No Taks Available!
        <template v-slot:action>
            <q-btn @click="$emit('showAddTask')" flat color="primary" label="Add Task" />
        </template>
    </q-banner>

</template>

<script>
export default {

}
</script>

<style>
    .no-tasks{
        border-radius: 5px;
    }

</style>