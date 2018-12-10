<template lang='pug'>
.home
  Navmenu
</template>

<script>
import Navmenu from "@/components/Navmenu.vue";

export default {
  components: {
    Navmenu
  },
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
