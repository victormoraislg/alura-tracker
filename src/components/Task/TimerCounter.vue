<template>
  <section>
    <strong class="display">
      {{ timeSpent }}
    </strong>
  </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskTimerCounter',
  props: {
    timeInSeconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timeSpent() : string {
      return new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
    }
  },
});

</script>

<style>

.display {
  color: var(--primary-text);
}

</style>