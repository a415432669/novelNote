<style lang="postcss" scoped>
  .note-item{
    padding: 0 .6rem;
    margin-top: .6rem;
  }
  .note-content{
    position: relative;
    background-color: #fedfa3;
    border-radius: .5rem;
    border: .125rem solid #6f8070
  }
  .note-content .link{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .note-content .p-date{
    font-size: .75rem;
    padding-left: 2rem;
    height: 1.8rem;
    line-height: 1.8rem;
    color: #666
  }
  .note-content .p-title{
    padding-left: 2rem;
    padding-top: .6rem;
    padding-bottom: .6rem;
    padding-right: .5rem;
  }
  .note-content .p-title a{
    display: block;
  }
  .note-content .p-title a:active{
    background-color: transparent;
  }
  .del{
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    right: -.125rem;
    top: -.125rem;
    background-color: #fff;
    border: .125rem solid #6f8070;
     border-radius: .5rem;
  }
  .del .icon{
    width: 100%;
    height: 100%;
    fill: #ccc;
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
    <my-header title="推理笔记">
      <div slot="right">
        <a href="javascript:void(0)" @click="diologVisible=true">
          <my-icon icon="edit" ></my-icon>
        </a>
      </div>
    </my-header>
    <div class="note-box" >
      <div class="note-item" v-for="item in books" :key="item.id">
        <div class="note-content">
          <div class="p-date">{{item.date|momentTime}}</div>
          <div class="p-title">
           {{item.title}}
          </div>
          <router-link class="link" :to="{name:'Note', params:{id:item.id}}">
          </router-link>
          <a class="del" v-tap = 'delBook.bind(null, item.id)'>
            <my-icon icon="close"></my-icon>
          </a>
        </div>
      </div>
      <div class="tip">请点击右上角添加笔记</div>
    </div>
    <book-add
      :visible.sync="diologVisible"
      @update:visible="val => visible = val">
    </book-add>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import BookAdd from './bookAdd.vue'
export default {
  computed: {
    ...mapGetters({
      'books': 'getBooks'
    })
  },
  data () {
    return {
      diologVisible: false,
      empty: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('getBooks')
    },
    delBook (id) {
      this.$confirm('确定要删除吗')
        .then(() => {
          this.$store.dispatch('delBook', id)
        })
        .catch(() => {
          console.log('你点击了取消')
        })
    }
  },
  components: {
    BookAdd
  }
}
</script>

