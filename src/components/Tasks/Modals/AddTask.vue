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

        <q-card-section class="q-pt-none">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Sed omnis animi et voluptatibus enim nostrum sequi debitis 
          soluta cum sunt dignissimos quas provident, possimus cupiditate 
          a nesciunt, rem, vero quidem. 
        </q-card-section>

        <q-card-actions align="right">
          <q-btn 
          flat 
          label="Save" 
          color="primary" 
          v-close-popup />
        </q-card-actions>
      </q-card>
</template>

<script>
export default {

}
</script>

<style>

</style>