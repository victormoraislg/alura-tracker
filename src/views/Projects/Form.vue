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
import { defineComponent, ref } from 'vue';
import { NotificationType } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import { CREATE_PROJECT, EDIT_PROJECT } from '@/store/actions';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormView',
  props: {
    id: {
      type: String,
    }
  },
  setup(props) {
    const store = useStore();
    const projectName = ref();
    const { notify } = useNotifier();
    const router = useRouter();


    if (props.id) {
      const project = store.state.projects.data.find(p => p.id == props.id);
      projectName.value = project?.name || '';
    }

    const projectSaved = () => {
      projectName.value = '';
      notify(NotificationType.SUCCESS, 'Excelent!', 'The project was saved successfully!');
      router.push('/projects');
    }

    const saveProject = () => {
      if (props.id) {
        store.dispatch(EDIT_PROJECT, {
          id: props.id,
          name: projectName.value
        })
        .then(() => projectSaved());
      } else {
        store.dispatch(CREATE_PROJECT, projectName.value)
        .then(() => projectSaved());
      }
    }

    return {
      projectName,
      saveProject
    }
  }
});

</script>