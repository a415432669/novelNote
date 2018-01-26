<style lang="postcss" scoped>
  .note-item{
    position: relative;
    touch-callout: none;
    user-select: none;
    touch-callout: none;
  }
  .w-close{
    position: absolute;
    right: -.5rem;
    top: -.5rem;
    width: 1.2rem;
    height: 1.2rem;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .6rem;
    box-shadow: 0 .15rem .15rem rgba(0,0,0,.2)
  }
  .w-close svg{
    fill: #fff;
  }
</style>

<template>
   <div class="note-item" v-tap.prevent="editNote" v-hold.prevent="showClose">
     <div class="w-content" v-html="htmlFormate(data.content)">
     </div>
     <a href="javascript:void(0)" v-tap.stop="delNotes" class="w-close" v-show="closeVisible">
       <my-icon icon="close"></my-icon>
     </a>
   </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      closeVisible: false
    }
  },
  methods: {
    editNote () {
      if (this.closeVisible) {
        this.closeVisible = false
        return
      }
      this.$parent.editType = 'edit'
      this.$store.commit('updateNoteId', this.data.id)
      this.$store.commit('updateNoteContent', this.data.content)
      this.$parent.editDialog = true
    },
    htmlFormate (html) {
      return html.replace(/\n/g, '<br />')
    },
    showClose (e) {
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
      this.closeVisible = true
    },
    delNotes () {
      this.$store.dispatch('delNote', this.data.id)
    }
  }
}
</script>
