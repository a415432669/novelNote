<style lang="postcss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.diolog{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.diolog-contnt{
  width: 18rem;
  padding: 1rem;
  border-radius: .1rem;
  border: 0.125rem solid #595c49;
  position: relative;
  border-radius: .5rem;
  background-color: #ffe09f;
}
h2{
  font-size:1.25rem;
  text-align: center
}
.ipt{
  display: block;
  width: 100%;
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 2.4rem;
  border: none;
  background-color: transparent;
  border-bottom: .125rem solid #595c49;
}
.ipt::-webkit-input-placeholder{
　　color:#595c49;
}
.btn{
  display: block;
  width: 100%;
  padding: .6rem 0 ;
  border: none;
  margin-top: .75rem;
  font-size: 1rem;
  color: #fff;
  outline: none;
  background-color: #fff;
  font-weight: bold;
  color: #595c49;
  border: 0.125rem solid #595c49;
  border-radius: .5rem;
}
.close{
  position: absolute;
  right: .5rem;
  top: .5rem;
  width: 1.2rem;
  height: 1.2rem;
  fill: #58504e;

}
.icon-close{
  width: 100%;
  height: 100%;
}
</style>


<template>
<transition name="fade">
  <div class="diolog" v-if="visible" @click="close">
    <div class="diolog-contnt" @click.stop>
      <h2>添加<span v-if="category.type===0">人物</span><span v-if="category.type===1">事件</span><span v-if="category.type===2">推理</span></h2>
      <input type="text" v-if="category.type===0" placeholder="新增人物" class="ipt" v-model="cateTitle" >
      <input type="text" v-if="category.type===1" placeholder="新增事件" class="ipt" v-model="cateTitle" >
      <input type="text" v-if="category.type===2" placeholder="新增推理" class="ipt" v-model="cateTitle" >
      <button class="btn" @click="submit">完成</button>
      <a href="javascript:void(0)" class="close" @click="close">
        <my-icon icon="close"></my-icon>
      </a>
    </div>
  </div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      category: 'getCategory'
    })
  },
  data () {
    return {
      cateTitle: ''
    }
  },
  methods: {
    close () {
      this.cateTitle = ''
      this.$emit('update:visible', false)
    },
    async submit () {
      if (this.cateTitle === '') {
        this.$store.dispatch('toast', '请输入标题')
        return false
      }
      try {
        await this.$store.dispatch('addCategory', this.cateTitle)
        this.$store.dispatch('toast', '添加成功')
        this.close()
      } catch (e) {
        this.$store.dispatch('toast', '出错')
      }
    }
  }
}
</script>
