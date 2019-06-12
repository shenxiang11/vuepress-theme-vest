<template>
  <div class="article-list">
    <Article
      v-for="article in list"
      :key="article.path"
      :article="article"
    />
  </div>
</template>

<script>
import Article from './ArticleListItem';

export default {
  components: {
    Article,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.article-list
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
</style>

