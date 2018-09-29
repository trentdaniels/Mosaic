<template>
  <div id="app">
    <section class="hero is-bold is-primary is-fullheight">
      <transition name="fade">
        <router-view/>
      </transition>
    </section>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
.fade-enter {
  opacity: 0;
  
}
.fade-leave-to {
  opacity: 0;
  
}
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}
.fade-enter-active {
  transition: opacity 1s ease-in-out;
}

</style>
