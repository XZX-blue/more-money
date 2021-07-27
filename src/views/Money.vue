<template>
  <Layout class-prefix="layout">
    <NumberPad></NumberPad>
    <Types></Types>
    <Notes></Notes>
    <Tags :data-source="tags"></Tags>
  </Layout>
</template>

<script >

import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";

export default {

  name: 'Money',
  data(){
    return {
      tags:['衣','食','住','行','彩票']
    }
  },

  components: {Tags, Notes, Types, NumberPad},
};
</script>

<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>
<style lang="scss" scoped>
</style>



