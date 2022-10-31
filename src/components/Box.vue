<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BoxItem'
});

</script>

<style scoped>
.box {
  background: #FAF0C4;
}
</style>