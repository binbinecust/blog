<template lang='pug'>
div home-page
</template>

<script>
export default {
  name: "home",
  methods: {
    save() {
      console.log("this is binbin test");
    }
  },
  mounted() {
    this.save();
  }
};
</script>
