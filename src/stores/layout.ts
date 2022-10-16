import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layoutStore', () => {
  // States
  const sideBarWith = ref(348);
  const toolsHeight = ref(0);

  // Actions
  const setSideBarWith = (width: number) => {
    sideBarWith.value = width;
  };

  const removeSide = () => {
    sideBarWith.value = 48;
  };

  const setToolsHeight = (width: number) => {
    toolsHeight.value = width;
  };

  const removeTools = () => {
    toolsHeight.value = 0;
  };

  return {
    // States
    sideBarWith,
    toolsHeight,

    // Actions
    setSideBarWith,
    removeSide,
    setToolsHeight,
    removeTools,
  };
});
