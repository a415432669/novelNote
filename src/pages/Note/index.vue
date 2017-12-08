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
  width: 7rem;
  background-color: #fbf3ea;
}
.side li{
  padding: .45rem;
  border-bottom: 1px solid #eee;
}
.side li.active{
  color: red;
}
.main{
  flex: 1;

}

.main ul{

}

</style>


<template>
<div class="page">
  <my-header :title="noteDetail&&noteDetail.title">
    <div slot="right">
      <a href="javascript:void(0)" @click="cateDiologVisible=true" >
        <my-icon icon="edit" ></my-icon>
      </a>
    </div>
  </my-header>
  <div class="content">
    <aside class="side">
      <ul>
        <li v-for="(item, index) in category.data" :key="item.id" :class="{active: cateIndex === index}">
          {{item.title}}
        </li>
      </ul>
    </aside>
    <div class="main">
    </div>
  </div>
  <note-footer></note-footer>
   <cate-add
      :visible.sync="cateDiologVisible"
      @update:visible="val => visible = val">
    </cate-add>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import noteFooter from './noteFooter.vue'
import cateAdd from './cateAdd.vue'
export default {
  computed: {
    ...mapGetters({
      noteDetail: 'noteDetail',
      category: 'getCategory'
    })
  },
  data () {
    return {
      cateIndex: 0,
      cateDiologVisible: false
    }
  },
  mounted () {
    this.$store.dispatch('getDetail')
    this.$store.dispatch('getCategory')
  },
  components: {
    cateAdd,
    noteFooter
  }
}
</script>
