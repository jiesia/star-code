import type { IFile } from '../types';
import { defineStore } from 'pinia';
import { invoke } from '@tauri-apps/api/tauri';
import { reactive, ref } from 'vue';

export const useFilesStore = defineStore('files', () => {
  // States
  const filesTree: IFile[] = reactive([]);
  const openedFiles: IFile[] = reactive([]);
  const currentOpenedFilePath = ref<IFile['path']>('');

  // Init project files tree
  (async function() {
    const data = await invoke('get_files_tree', { path: '/Users/jess/Code/star-code' }) as IFile[];
    filesTree.push(...data);
  }());

  function setCurrentOpenedFilePath(path: IFile['path']) {
    currentOpenedFilePath.value = path;
  }

  function openFile(newFile: IFile) {
    if (!openedFiles.some(file => file.path === newFile.path)) {
      openedFiles.push(newFile);
    }

    currentOpenedFilePath.value = newFile.path;
  }

  function closeOpenedFile(path: IFile['path']) {
    const index = openedFiles.findIndex(file => file.path === path);
    openedFiles.splice(index, 1);

    if (path === currentOpenedFilePath.value) {
      setCurrentOpenedFilePath(openedFiles[openedFiles.length - 1].path || '');
    }
  }

  return {
    // States
    filesTree,
    openedFiles,
    currentOpenedFilePath,

    // Actions
    setCurrentOpenedFilePath,
    openFile,
    closeOpenedFile,
  };
});
