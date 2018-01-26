<template>
  <li
    :class="{active: category.current && category.current.id === data.id}"
    v-tap="selectCate"
    v-hold="delCate">
    {{data.title}}
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['data'],
  computed: {
    ...mapGetters({
      category: 'getCategory'
    })
  },
  methods: {
    selectCate (cId) {
      this.$store.commit('updateCurrent', this.data)
      this.$store.dispatch('getNotes')
    },
    delCate () {
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
      this.$confirm('确定要删除吗?')
        .then(() => {
          this.$store.dispatch('delCate', this.data.id)
        })
    }
  }
}
</script>

