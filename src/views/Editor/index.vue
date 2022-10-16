<script setup lang="ts">
import Editor from './Editor.vue';
import { storeToRefs } from 'pinia';
import { useFilesStore } from '../../stores/files';

const filesStore = useFilesStore();
const { openedFiles, currentOpenedFilePath } = storeToRefs(filesStore);
const { setCurrentOpenedFilePath, closeOpenedFile } = filesStore;

</script>

<template>
  <div class="editor-container">
    <div class="file-tabs">
      <ul class="file-tabs-header">
        <li
          v-for="file in openedFiles"
          :key="file.path"
          class="file-tabs-header-item"
          :class="file.path === currentOpenedFilePath ? 'active' : ''"
          @click="setCurrentOpenedFilePath(file.path)"
        >
          <div class="file-tabs-header-item-bar"></div>
          <div class="file-tabs-header-item-name">{{ file.name }}</div>
          <div class="file-tabs-header-item-close iconfont icon-guanbi" @click.stop="closeOpenedFile(file.path)"></div>
        </li>
      </ul>
      <div
        v-for="file in openedFiles"
        :key="file.path"
        class="file-tabs-body"
        :class="{ active: file.path === currentOpenedFilePath }"
      >
        <editor :file="file" />
      </div>
    </div>
  </div>
</template>


<style lang="less">
.editor-container {
  height: 100%;

  .file-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;

    @header-height: 35px;
    &-header {
      flex-shrink: 0;
      height: @header-height;
      display: flex;
      align-items: stretch;
      z-index: 20;

      &-item {
        padding-left: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 13px;
        position: relative;

        &-bar {
          position: absolute;
          width: 100%;
          height: 1px;
          top: 0;
          left: 0;
        }

        &.active {
          .file-tabs-header-item-bar {
            background-color: #fd8c73;
          }
        }

        &-name {
          margin-right: 8px;
        }

        &-close {
          font-size: 12px;
          height: 20px;
          width: 20px;
          margin: 0 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;

          &:hover {
            background-color: rgba(184, 184, 184, 0.31);
          }
        }
      }
    }

    &-body {
      width: 100%;
      height: calc(100% - @header-height);
      position: absolute;
      left: 0;
      top: @header-height;
      flex: 1;
      background-color: #FFFFFF;

      &.active {
        z-index: 10;
      }
    }
  }
}
</style>
