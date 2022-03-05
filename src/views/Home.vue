<template>
  <div class="container mt-5 text-center">
    <h3>{{ auth ? message : 'You are not logged in' }}</h3>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "Home",
  setup() {
    const message = ref('You are not logged in');
    const store = useStore();
    const auth = computed(() => store.state.auth);

    onMounted(async () => {
      try {
        const {data} = await axios.get('user');

        message.value = `Hi ${data.first_name} ${data.last_name}`;

        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });

    return {
      message,
      auth
    }
  }
}
</script>
