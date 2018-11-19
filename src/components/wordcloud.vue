<template>
  <div id="app">
      <wordcloud :data="wordlist" nameKey="word" valueKey="tfidf" :wordPadding="num">
      </wordcloud>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'

export default {
  name: 'app',
  components: {
    wordcloud
  },
  props: [ 'stockcode' ],
  data () {
    return {
      num: 1,
      wordlist: []
    }
  },
  mounted: function () {
    this.get_wordcloud()
  },
  methods: {
    get_wordcloud () {
      this.axios.get(this.linkPrefix + '/stocks_api/wordcloud', {
        params: {
          stockcode: this.stockcode
        }
      })
        .then(response => {
          this.wordlist = response.data.wordcloud
        })
    }
  }
}
</script>

<style scoped>
#app{
  text-align: center;
}
</style>
