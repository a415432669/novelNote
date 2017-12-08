<style lang="postcss" scoped>
  .note-item{
    padding: 0 .6rem;
    margin-top: .6rem;
  }
  .note-content{
    position: relative;
    background-color: #f5f3f9;
    border-radius: .2rem;
    box-shadow: 0 .1rem .15rem rgba(0,0,0,.2);
  }
  .note-content .p-date{
    font-size: .75rem;
    padding-left: 3rem;
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: 1px solid #eee;
    color: #666
  }
  .note-content .p-title{
    padding-left: 3rem;
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
    width: 1rem;
    height: 1rem;
    right: .4rem;
    top: .4rem;
  }
  .del .icon{
    width: 100%;
    height: 100%;
    fill: #ccc;
  }
</style>


<template>
  <div class="page">
    <my-header title="小说笔记">
      <div slot="right">
        <a href="javascript:void(0)" @click="diologVisible=true">
          <my-icon icon="edit" ></my-icon>
        </a>
      </div>
    </my-header>
    <div class="note-box">
      <div class="note-item" v-for="item in books" :key="item.id">
        <div class="note-content">
          <div class="p-date">{{item.date|momentTime}}</div>
          <div class="p-title">
            <router-link :to="{name:'Note', params:{id:item.id}}">{{item.title}}</router-link>
          </div>
          <a class="del">
            <my-icon icon="close"></my-icon>
          </a>
        </div>
      </div>
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
      diologVisible: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('getBooks')
    }
  },
  components: {
    BookAdd
  }
}
</script>

