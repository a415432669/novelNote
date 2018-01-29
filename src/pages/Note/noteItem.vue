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
    bottom: -.5rem;
    width: 1.6rem;
    height: 1.6rem;
    background-color: #efdb78;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: .125rem solid #595c49;
    z-index: 100;
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
