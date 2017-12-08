<template>
  <svg :class="iconClass">
    <use :xlink:href="'#icon-'+ icon"></use>
  </svg>
</template>

<style lang="postcss">
.icon{
  vertical-align:inherit;
}
</style>
<script>
export default {
  props: [
    'icon',
    'className'
  ],
  computed: {
    iconClass () {
      const {icon, className} = this
      return className ? `icon icon-${icon} ${className}` : `icon icon-${icon}`
    }
  }
}
</script>

