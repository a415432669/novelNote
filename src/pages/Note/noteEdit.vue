<style lang="postcss" scoped>

.note-edit{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #efdabc;
  transform: translateY(0);
}
.edit-header{
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 2.75rem;
  background-color: #7d726f;
  box-shadow:0 .1rem .1rem rgba(0, 0, 0, .2);
  color: #fff;
  padding:0 .75rem;
}
.edit-header .w-left, .edit-header .w-right{
  height: 2.75rem;
  display: flex;
  align-items: center;
}
.edit-header .w-left .icon{
  margin-right: .25rem;
}

.editor-container{
  position: absolute;
  top: 2.75rem;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: .75rem;
}
.editor{
  overflow-y: hidden;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  tab-size: 4;
  line-height: 1.42;
  outline: none;
  height: 100%;
  background: transparent;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>


<template>
<transition name="fade">
  <div class="note-edit" v-if="visible">
    <header class="edit-header">
      <div class="w-left" @click="close">
        <my-icon icon="left"></my-icon> {{category.current&&category.current.title}}
      </div>
      <div class="w-right">
        <a href="javascript:void(0)" @click="submit">
          <my-icon icon="confirm"></my-icon>
        </a>
      </div>
    </header>
    <div class="editor-container">
      <textarea class="editor" v-model="content">
      </textarea>
    </div>
  </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  computed: {
    ...mapGetters({
      category: 'getCategory'
    })
  },
  data () {
    return {
      content: ''
    }
  },
  mounted () {
  },
  methods: {
    close () {
      this.content = ''
      this.$emit('update:visible', false)
    },
    updateContent () {
      this.$refs.content.innerHTML.replace(/<br>/g, '\n')
    },
    async submit () {
      if (this.type === 'add') {
        await this.$store.dispatch('addNote', this.content)
      } else if (this.type === 'edit') {

      }
      this.close()
    }
  }
}
</script>

