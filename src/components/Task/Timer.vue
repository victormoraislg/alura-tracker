<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TaskTimerCounter :timeInSeconds="timeInSeconds"/>
    <button class="button" @click="start" :disabled="timerRunning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="end" :disabled="!timerRunning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TaskTimerCounter from './TimerCounter.vue';

export default defineComponent({
  name: 'TaskTimer',
  components: {
    TaskTimerCounter
  },
  emits: [
    'onStop'
  ],
  data() {
    return {
      timeInSeconds: 0,
      cron: 0,
      timerRunning: false,
    }
  },
  methods: {
    start() {
      this.timerRunning = true;
      this.cron = setInterval(() => {
        this.timeInSeconds++;
      }, 1000);
    },
    end() {
      this.$emit('onStop', this.timeInSeconds);
      this.timerRunning = false;
      this.timeInSeconds = 0;
      clearInterval(this.cron);
    }
  }
});

</script>