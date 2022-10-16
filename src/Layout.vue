<script setup lang="ts">
import Editor from './views/Editor.vue';
import SideBar from './views/SideBar.vue';
import StatusBar from './views/StatusBar.vue';
import Tools from './views/Tools.vue';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from './stores/layout';

const layoutStore = useLayoutStore();

const { sideBarWith, toolsHeight } = storeToRefs(layoutStore);
const { setSideBarWith, setToolsHeight, removeSide, removeTools } = layoutStore;

/* Handle The divider between SideBar and Editor */
// Document mouse move event listener
const onMouseMoveForSideEditorDivider = (e: MouseEvent) => {
  const { clientX } = e;

  // Handle the bound
  if (clientX > window.innerWidth - 300) {
    return;
  }

  if (clientX < 100) {
    removeSide();
    return;
  }

  if (clientX < 218) {
    return;
  }

  setSideBarWith(clientX);
};

// Document mouse up event listener
const onMouseUpForSideEditorDivider = () => {
  document.removeEventListener('mousemove', onMouseMoveForSideEditorDivider);
};

// Mouse down event listener of the divider between SideBar and Editor
const onSideEditorDividerMouseDown = () => {
  document.addEventListener('mouseup', onMouseUpForSideEditorDivider);
  document.addEventListener('mousemove', onMouseMoveForSideEditorDivider);
};

/* Handle The divider between Editor and Tools */
let lastY = 0;
// Document mouse move event listener
const onMouseMoveForEditorToolsDivider = (e: MouseEvent) => {
  const { clientY } = e;

  if (clientY === lastY) {
    return;
  }

  // Drop down
  if (clientY > lastY) {
    // Update lastY
    lastY = clientY;

    if (clientY < 80) {
      return;
    }

    if (clientY === 80) {
      setToolsHeight(window.innerHeight - 22 - 80);
      return;
    }

    if (clientY >= window.innerHeight - 22 - 80) {
      removeTools();
      return;
    }

    setToolsHeight(window.innerHeight - 22 - clientY);
  }

  // Drop up
  if (clientY < lastY) {
    // Update lastY
    lastY = clientY;

    if (clientY >= window.innerHeight - 100) {
      return;
    }

    if (clientY === window.innerHeight - 22) {
      setToolsHeight(80);
      return;
    }

    if (clientY <= 80) {
      setToolsHeight(window.innerHeight - 22);
      return;
    }

    setToolsHeight(window.innerHeight - 22 - clientY);
  }
};

// Document mouse up event listener
const onMouseUpForEditorToolsDivider = () => {
  document.removeEventListener('mousemove', onMouseMoveForEditorToolsDivider);
};

// Mouse down event listener of the divider between Editor and Tools
const onEditorToolsDividerMouseDown = (e: MouseEvent) => {
  lastY = e.clientY;
  document.addEventListener('mouseup', onMouseUpForEditorToolsDivider);
  document.addEventListener('mousemove', onMouseMoveForEditorToolsDivider);
};

</script>

<template>
  <div class="layout">
    <div class="layout-container">
      <!-- SideBar -->
      <div
        class="layout-container-sidebar"
        :style="{ width: `${sideBarWith}px` }"
      >
        <side-bar />
      </div>
      <!-- The Divider between SideBar and Editor -->
      <div
        class="layout-divider"
        :style="{
          top: 0,
          left: `${sideBarWith - 2}px`,
          width: '4px',
          height: 'calc(100% - 22px)',
          cursor: 'col-resize',
        }"
        @mousedown="onSideEditorDividerMouseDown"
      />
      <!-- Editor and Tools -->
      <div
        class="layout-container-content"
        :style="{ left: `${sideBarWith}px`, width: `calc(100% - ${sideBarWith}px)` }"
      >
        <!-- Editor -->
        <div
          class="layout-container-content-editor"
          :style="{ height: `calc(100% - ${toolsHeight}px)` }"
        >
          <editor />
        </div>
        <!-- The Divider between Editor and Tools -->
        <div
          class="layout-divider"
          :style="{
            left: 0,
            bottom: `${toolsHeight - 2}px`,
            width: '100%',
            height: '4px',
            cursor: 'row-resize',
          }"
          @mousedown="onEditorToolsDividerMouseDown"
        />
        <!-- Tools -->
        <div
          class="layout-container-content-tools"
          :style="{ height: `${toolsHeight}px` }"
        >
          <tools />
        </div>
      </div>
    </div>
    <div class="layout-statusbar">
      <status-bar />
    </div>
  </div>
</template>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0;
    right: 0;

    &-sidebar {
      position: absolute;
      left: 0;
      top: 0;
      height: calc(100% - 22px);
      background-color: #F5F7F9;
    }

    &-content {
      position: absolute;
      top: 0;
      left: 348px;
      height: calc(100% - 22px);

      &-editor {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
      }

      &-tools {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        background-color: #F5F7F9;
        overflow: hidden;
      }
    }
  }

  &-statusbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 22px;
  }

  .layout-divider {
    position: absolute;
    z-index: 10;

    &:active {
      background-color: antiquewhite;
    }
  }
}
</style>
