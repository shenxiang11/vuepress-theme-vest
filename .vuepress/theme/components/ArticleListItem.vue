<template>
  <article class="article-item">
    <h2 class="title">
      <a :href="article.path">{{article.title}}</a>
    </h2>
    <div
      class="excerpt"
      v-html="article.excerpt"
    ></div>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    }
  }
};
</script>

<style lang="stylus" scoped>
.article-item
  display: block
  margin: 10px 0
  padding: 40px
  background: #fff
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.06), 0 1px 5px 0 rgba(0,0,0,0.12)
  border-radius: initial
</style>

