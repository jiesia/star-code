<script setup lang="ts">
import type { IFile } from '../types';
import { reactive } from 'vue';

interface IProps {
  data: IFile[];
}

// Props
const props = defineProps<IProps>();

// Emits
const emit = defineEmits(['onSelect']);

// Control the expand state of directory
const expandStates = reactive(new Array(props.data.length).fill(false));

// Clock tree node
function onClickFile(e: MouseEvent, file: IFile, index: number) {
  e.stopPropagation();
  emit('onSelect', file);
  expandStates[index] = !expandStates[index];
}

function onSelectSubFile(file: File) {
  emit('onSelect', file);
}

</script>

<template>
  <ul class="file">
    <li
      v-for="file, index in data"
      :key="file.path"
      class="sub-file"
      @click="onClickFile($event, file, index)"
    >
      <div
        v-if="file.children.length"
        class="iconfont icon-xiangxia sub-file-icon"
        :class="{ expand: expandStates[index] }"
      >
      </div>
      <div :class="{ fold: file.children.length }">
        {{ file.name }}
      </div>
      <files-tree v-if="expandStates[index]" :data="file.children" @onSelect="onSelectSubFile"></files-tree>
    </li>
  </ul>
</template>

<style lang="less">
.file {
  font-size: 13px;
  padding-left: 0px;
  line-height: 22px;

  .sub-file {
    margin-left: 16px;
    cursor: pointer;
    position: relative;

    &-icon {
      position: absolute;
      left: -22px;
      font-size: 14px;
      width: 22px;
      height: 22px;
      color: #57606a;
      display: flex;
      align-items: center;
      justify-content: center;

      &.expand {
        transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
      }
    }
  }
}
</style>
