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
  background-color: #e2cc91;
  border-right: .125rem solid #646754;
}
.side li{
  font-size: 1rem;
  padding: .45rem;
  border-bottom: .125rem solid #646754;
}
.side li.active{
  color: red;
}
.main{
  flex: 1;
  padding: .8rem;
  overflow-y:scroll;
  padding-bottom: 4rem;
}
.note-item{
  position: relative;
  background: #fff;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 1.4rem .8rem .4rem;
  font-size: .85rem;
  border: .125rem solid #595c49;
  margin-bottom: .8rem;
  min-height: 4.5rem;
  border-radius: .5rem;
  z-index: 10;
}
.note-item::before, .note-item::after{
  content: "";
  display: block;
  position: absolute;
  left: .3rem;
  top: .3rem;
  width: .8rem;
  height: .8rem;
  background-color: #fff;
  border-radius: 50%;
  border: 0.125rem solid #595c49;
}
.note-item::after{
  left: auto;
  right: .3rem;
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
.tip{
    font-size: .8rem;
    color: rgb(136, 135, 135);
    text-align: center;
    padding: 1rem 0;
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
        <cate-item
          v-for="item in category.data"
          :key="item.id"
          :data="item"
          ></cate-item>
      </ul>
    </aside>
    <div class="main">
      <note-item v-for= "item in notes.data" :data="item" :key="item.id"></note-item>
      <div class="note-add" @click="addNote" v-if="category.data.length">
        <div class="w-icon">
          <my-icon icon="add" ></my-icon>
        </div>
      </div>
      <div class="tip" v-if="category.data.length===0">
        请点击右上角添加<span v-if="category.type===0">人物</span><span v-if="category.type===1">事件</span><span v-if="category.type===2">推理</span>
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
import noteItem from './noteItem.vue'
import cateItem from './cateItem.vue'
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
    addNote () {
      this.editType = 'add'
      this.editDialog = true
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
    noteEdit,
    noteItem,
    cateItem
  }
}
</script>
