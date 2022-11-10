<template>
  <section>
    <form @submit.prevent="saveProject">
      <div class="field">
        <label for="projectName" class="label">Project name</label>
        <input type="text" id="projectName" class="input" v-model="projectName">
      </div>
      <div class="field">
        <button class="button" type="submit">Save</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import { ADD_PROJECT, EDIT_PROJECT } from '@/store/mutations';

export default defineComponent({
  name: 'FormView',
  props: {
    id: {
      type: String,
    }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(p => p.id == this.id);
      this.projectName = project?.name || '';
    }
  },
  data() {
    return {
      projectName: ''
    };
  },
  methods: {
    saveProject() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName
        });
      } else {
        this.store.commit(ADD_PROJECT, this.projectName);
      }

      this.projectName = '';
      this.$router.push('/projects');
    }
  },
  setup() {
    const store = useStore();

    return {
      store
    }
  }
});

</script>