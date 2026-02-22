import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CategoryDto {
  id: number
  name: string
}

export const useCategoryStore = defineStore('categories', () => {
  const categoriesList = ref<CategoryDto[]>([
    { id: 1, name: 'Trabajo' },
    { id: 2, name: 'Personal' }
  ])

  function addCategory(name: string) {
    categoriesList.value.push({
      id: Date.now(),
      name: name
    })
  }

  function deleteCategory(id: number) {
    categoriesList.value = categoriesList.value.filter((cat) => cat.id !== id)
  }

  return { categoriesList, addCategory, deleteCategory }
})