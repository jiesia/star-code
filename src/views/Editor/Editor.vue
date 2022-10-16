<script setup lang="ts">
import type { IFile } from '../../types';
import hljsVuePlugin from '@highlightjs/vue-plugin';

const highlightjs = hljsVuePlugin.component;

interface IProps {
  file: IFile;
}

defineProps<IProps>();
</script>

<template>
  <highlightjs
    class="editor"
    contenteditable="true"
    :code="file.content"
  />
</template>

<style lang="less">
.editor {
  height: 100%;
  margin: 0;

  * {
    user-select: auto;
    -webkit-user-select: auto;
    -moz-user-select: auto;
  }

  .hljs {
    outline: none;
    background-color: #FFFFFF !important;
    height: 100%;
    font-size: 15px;
    line-height: 23px;
    padding: 0 1em !important;
  }
}
</style>
