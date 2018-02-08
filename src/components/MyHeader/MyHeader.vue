<style scoped lang="postcss">
  .g-header{
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 2.75rem;
    background-color: #7d726f;
    border-bottom: 0.125rem solid #595c49;
  }
  .g-header h1{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.25rem;
    color:#fff;
  }
  .g-header-left,
  .g-header-right {
    height: 2.75rem;
    display: flex;
    padding: 0 .75rem;
    align-items: center;
    justify-content: space-around;
    vertical-align: top;
    font-size: 1rem;
    a {
      color: inherit;
    }

  }
  .icon{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
      fill: #fff;
    }
</style>


<template>
  <div class="header-wrap">
    <header class="g-header">
      <div class="g-header-left">
        <slot name="left"></slot>
      </div>
      <h1>{{title}}</h1>
      <div class="g-header-right">
        <slot name="right"></slot>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

