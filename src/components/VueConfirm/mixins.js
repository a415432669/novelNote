export default {
  mounted () {
    let listener = () => {
      this.show = false
    }
    window.addEventListener('hashchange', listener)
    window.addEventListener('popstate', listener)
    window.addEventListener('pagehide', listener)
  }
}
