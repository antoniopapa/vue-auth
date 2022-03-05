<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please reset your password</h1>

      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" placeholder="Password">
        <label>Password</label>
      </div>

      <div class="form-floating">
        <input v-model="data.password_confirm" type="password" class="form-control" placeholder="Password Confirm">
        <label>Password Confirm</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "Reset",
  setup() {
    const data = reactive({
      password: '',
      password_confirm: ''
    });
    const route = useRoute();
    const router = useRouter();

    const submit = async () => {
      await axios.post('reset', {
        ...data,
        token: route.params.token
      });

      await router.push('/login');
    }

    return {
      data,
      submit
    }
  }
}
</script>
