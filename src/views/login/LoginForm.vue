<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword"
               placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="mb-3">
        <router-link to="/forgot">Forgot password?</router-link>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>

    <a href="javascript:void(0)" class="btn btn-outline-danger text-center mt-3 w-100"
       @click="googleAuth"
    >Login with Google</a>
  </main>
</template>

<script lang="ts">
import {reactive, SetupContext} from "vue";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gAuth from 'vue3-google-auth'

export default {
  name: "LoginForm",
  emits: ['loginData', 'success'],
  setup(props: any, context: SetupContext) {
    const data = reactive({
      email: '',
      password: ''
    });
    const GAuth = gAuth.useGAuth();

    const submit = async () => {
      const response = await axios.post('login', data);

      await context.emit('loginData', response.data);
    }

    const googleAuth = async () => {
      const googleUser = await GAuth.signIn();

      const {status, data} = await axios.post('google-auth', {
        token: googleUser.wc.id_token
      }, {withCredentials: true});

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      if (status === 200) {
        context.emit('success');
      }
    }

    return {
      data,
      submit,
      googleAuth
    }
  }
}
</script>
