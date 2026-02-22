<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import TasksList from '@/components/TasksList.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import CategoryManager from '@/components/CategoryManager.vue'
</script>

<template>
  <AdminLayout>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="mb-4">{{ $t('tasks') }}</h2>
          <AddTaskForm />
          <TasksList />
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="mb-4">{{ $t('categories') }}</h2>
          <CategoryManager />
        </v-col>
      </v-row>
    </v-container>
  </AdminLayout>
</template>