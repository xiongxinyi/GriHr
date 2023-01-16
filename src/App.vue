<template>

  <router-view/>
</template>

<style>
body,html{
  padding: 0;
  margin: 0;
}
/* 均匀分布在左右侧 */
.flex-float{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 中心线对齐（左右挨着对齐） */
.flex{
  display: flex;
  align-items: center;
}
.page_content{
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px;
  background: #fff;
  margin-top: 30px;
}
</style>
