<script setup lang="ts">
import Files from './Files.vue';
import Plugins from './Plugins.vue';
import { ref } from 'vue';

interface IControl {
  key: string,
  icon: string,
}

const controls: IControl[] = [
  {
    key: 'files',
    icon: 'icon-folder-open',
  },
  {
    key: 'plugins',
    icon: 'icon-chajian1',
  },
];

const activeControlKey = ref('files');

</script>

<template>
  <div class="side-bar">
    <!-- Tabs -->
    <div class="controls">
      <div
        v-for="control in controls"
        :key="control.key"
        class="iconfont controls-item"
        :class="{ [control.icon]: true, active: activeControlKey === control.key }"
        @click="activeControlKey = control.key"
      >
      </div>
    </div>
    <!-- Tabs pane -->
    <div class="tabs-pane">
      <!-- Project files tree -->
      <files v-show="activeControlKey === 'files'"/>
      <!-- Plugins -->
      <plugins v-show="activeControlKey === 'plugins'"/>
    </div>
  </div>
</template>

<style lang="less">
.side-bar {
  @size: 48px;
  width: 100%;
  height: 100%;
  display: flex;

  .controls {
    width: @size;
    overflow: hidden;
    height: 100%;
    flex-shrink: 0;

    &-item {
      width: @size;
      height: @size;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      color: rgb(87, 96, 106);
      cursor: pointer;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: @size;
        left: 0;
        right: 0;
      }

      &.active::after {
        background-color: #fd8c73;
      }
    }
  }

  .tabs-pane {
    width: 100%;
    flex: 1;
  }
}
</style>
