<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <router-link to="/" class="nav-link px-2 text-white">Home</router-link>
          </li>
        </ul>

        <div class="text-end" v-if="auth">
          <router-link to="/" class="btn btn-outline-light me-2" @click="logout">Logout</router-link>
        </div>

        <div class="text-end" v-if="!auth">
          <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link to="/register" class="btn btn-outline-light me-2">Register</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {computed} from "vue";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "Nav",
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.auth);

    const logout = async () => {
      await axios.post('logout', {}, {withCredentials: true});

      axios.defaults.headers.common['Authorization'] = '';

      await store.dispatch('setAuth', false);
    }

    return {
      auth,
      logout
    }
  }
}
</script>
