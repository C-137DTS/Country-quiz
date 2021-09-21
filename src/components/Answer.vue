<template>
  <div class="answer" v-on:click="$emit('selected', answer)">
    <p>
      <span class="mr">{{ option }}</span> {{ answer }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Answer",

  props: {
    answer: {
      type: String,
      default: "",
    },
    option: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
ul {
  padding: 0;
}

.answer {
  width: 300px;
  height: 40px;
  background: white;
  border: 2px solid #6066d0b2;
  color: #6066d0cc;
  padding: 8px 10px 7px 10px;
  border-radius: 10px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.answer:hover {
  background: #f9a826;
  color: white;
  border: 2px solid #f9a826;
}
.mr {
  margin-right: 20px;
}
</style>
