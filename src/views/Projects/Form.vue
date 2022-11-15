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
import { NotificationType } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import { CREATE_PROJECT, EDIT_PROJECT } from '@/store/actions';

export default defineComponent({
  name: 'FormView',
  props: {
    id: {
      type: String,
    }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.data.find(p => p.id == this.id);
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
        this.store.dispatch(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName
        })
        .then(() => this.projectSaved());
      } else {
        this.store.dispatch(CREATE_PROJECT, this.projectName)
        .then(() => this.projectSaved());
      }


    },
    projectSaved() {
      this.projectName = '';
      this.notify(NotificationType.SUCCESS, 'Excelent!', 'The project was saved successfully!');
      this.$router.push('/projects');
    }
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();

    return {
      store,
      notify
    }
  }
});

</script>