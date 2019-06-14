<template>
  <article class="article-item">
    <h3 class="title">
      <a :href="article.path">{{article.title}}</a>
    </h3>
    <div class="content-box">
      <div class="thumbnail" v-if="article.frontmatter.thumbnail">
        <img :src="article.frontmatter.thumbnail" />
      </div>
      <div
        class="excerpt"
        v-html="article.excerpt"
      ></div>
    </div>
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

  .content-box
    display: flex
    .thumbnail
      flex-shrink: 0
      width: 200px
      height: 200px
      overflow: hidden
      margin-right: 20px
      img
        max-width: 100%
        max-height: 100%
        min-width: 100%
        min-height: 100%
        object-position: center
        object-fit: cover
    .excerpt
      width: 0
      flex-grow: 1

  /deep/ .excerpt
    img
      max-width 100%
</style>

