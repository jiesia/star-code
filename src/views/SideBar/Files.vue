<script setup lang="ts">
import type { IFile } from '../../types';
import Tree from '../../components/FilesTree.vue';
import { invoke } from '@tauri-apps/api/tauri';
import { storeToRefs } from 'pinia';
import { useFilesStore } from '../../stores/files';

const filesStore = useFilesStore();
const { filesTree } = storeToRefs(filesStore);
const { openFile } = filesStore;

// Select file node
async function onSelect(file: IFile) {
  // Click directory
  if (file.children.length) {
    return;
  }

  // Click file, then search the file's content
  file.content = await invoke('get_file_content', { path: file.path });
  openFile(file);
}

</script>

<template>
  <div class="files-tree">
    <tree :data="filesTree" @on-select="onSelect" />
  </div>
</template>

<style lang="less">
.files-tree {
  padding: 10px;
}
</style>
