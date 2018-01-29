<style lang="postcss" scoped>
.footer-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.75rem;
  padding: 0 0.5rem;
}
.footer-nav .item {
  flex: 1;
  padding: 0 0.4rem 0;
}
.footer-nav .item a {
  display: block;
  text-align: center;
  background: #cb9573;
  color: #fff;
  line-height: 2.75rem;
  font-size: 1.25rem;
  height: 8.5rem;
  border-radius: 0.25rem;
  border: .125rem solid #6f8070;
  font-weight: bold;
  color: #fff;
  transform: rotate(7deg) translateY(0);
}
.footer-nav .item.active a{
  transform: rotate(0) translateY(-0.5rem);
}
</style>


<template>
  <div class="footer-nav">
    <div class="item"
      :class="{active: category.type === 0}"
      @click="changeType(0)">
      <a href="javascript:void(0)">
        人物
      </a>
    </div>
    <div class="item"
      :class="{active: category.type === 1}"
      @click="changeType(1)">
      <a href="javascript:void(0)">
        事件
      </a>
    </div>
    <div class="item"
      :class="{active: category.type === 2}"
      @click="changeType(2)">
      <a href="javascript:void(0)">
        推理
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      category: 'getCategory'
    })
  },
  methods: {
    changeType (noteType) {
      this.$store.commit('updateNoteType', noteType)
      this.$store.dispatch('getCategory')
    }
  }
}
</script>

