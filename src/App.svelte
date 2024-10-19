<script lang="ts">
  import router from 'page';
  import Home from './Home.svelte';
  import Prefix from './Prefix.svelte';
  import PageLogin from './PageLogin.svelte';

  let page = Home;

  router('/login', () => {
    page = PageLogin;
  });

  router('/', () => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      page = Home;
    }
  });

  router('/prefix', () => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      page = Prefix;
    }
  });


  router.start();

</script>

<svelte:component this={page} />