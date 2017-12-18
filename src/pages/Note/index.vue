<style lang="postcss" scoped>
.content{
  position: absolute;
  top: 2.75rem;
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
}
.side{
  width: 6rem;
  background-color: #fbf3ea;
}
.side li{
  font-size: .85rem;
  padding: .45rem;
  border-bottom: 1px solid #eee;
}
.side li.active{
  color: red;
}
.main{
  flex: 1;
  padding: .4rem;
  overflow-y:scroll;
  padding-bottom: 4rem;
}
.note-item{
  background: #fff;
  width: 100%;
  font: normal 14px verdana;
  line-height: 1.5;
  padding: .4rem .4rem;
  font-size: .85rem;
  border: solid 1px #ddd;
  margin-bottom: .4rem;
  min-height: 4rem;
}
.note-add .w-icon{
  width: 1.7rem;
  height: 1.7rem;
  padding: .2rem;
  background-color: #7e726f;
  border-radius: 50%;
  text-align: center;
}
.note-add .w-icon .icon{
  fill: #666;
  width: 1.3rem;
  height: 1.3rem;
  fill: #fff
}
.note-add{
  display: flex;
  justify-content: center;
  width: 100%;
}

</style>


<template>
<div class="page">
  <my-header :title="noteDetail&&noteDetail.title">
    <div slot="left">
      <a href="javascript:void(0)" @click="$router.back()">
         <my-icon icon="left"></my-icon>
      </a>
    </div>
    <div slot="right">
      <a href="javascript:void(0)" @click="cateDiologVisible=true" >
        <my-icon icon="edit" ></my-icon>
      </a>
    </div>
  </my-header>
  <div class="content">
    <aside class="side">
      <ul>
        <li
          v-for="item  in category.data"
          :key="item.id"
          v-show = "category.type === item.type"
          :class="{active: category.current && category.current.id === item.id}"
          @click="selectCate(item)">
          {{item.title}}
        </li>
      </ul>
    </aside>
    <div class="main">
      <div class="note-item"
        v-for= "item in notes.data"
        :key="item.id"
        @click="editNote(item)">
        <div class="w-content" v-html="htmlFormate(item.content)">
        </div>
      </div>
      <div class="note-add" @click="addNote" v-if="category.data.length">
        <div class="w-icon">
          <my-icon icon="add" ></my-icon>
        </div>
      </div>
    </div>
  </div>
  <note-footer></note-footer>
  <cate-add
    :visible.sync="cateDiologVisible"
    @update:visible="val => visible = val">
  </cate-add>
  <note-edit
    :visible.sync="editDialog"
    :type="editType"
    @update:visible="val => visible = val">
  </note-edit>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import noteFooter from './noteFooter.vue'
import cateAdd from './cateAdd.vue'
import noteEdit from './noteEdit.vue'
export default {
  computed: {
    ...mapGetters({
      noteDetail: 'noteDetail',
      category: 'getCategory',
      notes: 'getNotes'
    })
  },
  data () {
    return {
      cateIndex: 0,
      cateDiologVisible: false,
      editDialog: false,
      editType: 'add'
    }
  },
  async mounted () {
    this.$store.commit('updateNoteType', 0)
    const detail = await this.$store.dispatch('getDetail')
    if (detail === undefined) {
      this.$router.push({name: 'Home'})
    }
    this.$store.dispatch('getCategory')
  },
  methods: {
    selectCate (cId) {
      this.$store.commit('updateCurrent', cId)
      this.$store.dispatch('getNotes')
    },
    addNote () {
      this.editType = 'add'
      this.editDialog = true
    },
    htmlFormate (html) {
      return html.replace(/\n/g, '<br />')
    },
    editNote ({id, content}) {
      this.editType = 'edit'
      this.$store.commit('updateNoteId', id)
      this.$store.commit('updateNoteContent', content)
      this.editDialog = true
    }
  },
  components: {
    cateAdd,
    noteFooter,
    noteEdit
  }
}
</script>
