<template>
  <div class="main">
    <div class="quiz center">
      <h1 class="title">Country Quiz</h1>
      <img
        src="@/assets/undraw_adventure_4hum 1.svg"
        alt="adventure"
        class="adventure"
      />
      <div v-show="questions[questionIndex].type == 'flag'">
        <img :src="questions[questionIndex].flag" alt="flag" class="flag" />
        <p>Which country does this flag belong to?</p>
        <answer :answer="options[0].name" option="A" @selected="checkAnswer" />
        <answer :answer="options[1].name" option="B" @selected="checkAnswer" />
        <answer :answer="options[2].name" option="C" @selected="checkAnswer" />
        <answer :answer="options[3].name" option="D" @selected="checkAnswer" />
      </div>
      <div v-show="questions[questionIndex].type == 'capital'">
        <p>{{ questions[questionIndex].capital }} is the capital of</p>
        <answer :answer="options[0].name" option="A" @selected="checkAnswer" />
        <answer :answer="options[1].name" option="B" @selected="checkAnswer" />
        <answer :answer="options[2].name" option="C" @selected="checkAnswer" />
        <answer :answer="options[3].name" option="D" @selected="checkAnswer" />
      </div>
      <button @click="nextQuestion" v-show="isCorrect === true">Next</button>
    </div>
  </div>
</template>

<script>
import Answer from "@/components/Answer";

export default {
  components: { Answer },
  name: "Test",
  data() {
    return {
      questions: [],
      questionIndex: 0, // This is for show each question and is 0 becuase questions is an array
      isCorrect: undefined, // The answer is correct or no
      countriesIndex: new Array(4)
        .fill(0)
        .map((n) => Math.floor(Math.random() * 36 + n)), // Select the countries randomly (The API return an array with the countries info)
      points: 0,
      options: [], // The answer options like A. Spain, B. Italy...
    };
  },

  created() {
    fetch("https://restcountries.eu/rest/v2/currency/eur")
      .then((res) => res.json())
      .then((data) => {
        this.countriesIndex.forEach((n, i) => {
          // This push the country info to this.questions and add a type for the question that can be flag or capital
          if (i % 2 === 0) {
            this.questions.push({
              ...data[n],
              type: "flag",
            });
          } else {
            this.questions.push({
              ...data[n],
              type: "capital",
            });
          }
        });
        this.options = this.getOptions();
      });
  },

  methods: {
    checkAnswer(answer) {
      // Answer is received from an event emitted by Answer component
      if (answer === this.questions[this.questionIndex].name) {
        this.isCorrect = true;
        this.points += 1;
      } else {
        this.isCorrect = false;
      }
    },
    nextQuestion() {
      this.questionIndex += 1; // Change the question
      this.options = this.getOptions(); // Change the order of the options
      this.isCorrect = false; // Hide the next question button
    },
    getOptions() {
      const order = this.getOrder();

      return this.changePosition(order);
    },
    getOrder() {
      // Chosse two different numbers
      const order = new Array(2)
        .fill(0)
        .map((n) => Math.floor(Math.random() * 4 + n)); // Choose a number between 0 and 3

      // Check that the numbers be differents
      if (order[0] === order[1] && order[0] !== 3) {
        order[1] = order[0] + 1;
        return order;
      }
      if (order[0] === order[1] && order[0] === 3) {
        order[1] = order[0] - 1;
        return order;
      }
      return order;
    },
    changePosition(positions) {
      let questionsCopy = [...this.questions]; // For don't mutate this.questions
      positions.forEach((n) => {
        // Change the position of questionCopy[0] and questionCopy[1]
        // For get different order of the answers
        const aux = questionsCopy[n];
        questionsCopy[n] = questionsCopy[0];
        questionsCopy[0] = aux;
      });

      return questionsCopy;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
.center {
  margin: 0 auto;
}
.title {
  position: absolute;
  left: 0;
  top: -50px;
}

.quiz {
  width: 350px;
  height: 480px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid red;
  position: relative;
  margin-top: 100px;
  padding: 50px 0;
}
.flag {
  width: 80px;
  height: 50px;
}
.adventure {
  position: absolute;
  width: 150px;
  height: 100px;
  right: 0;
  top: -60px;
}

.correct {
  color: white;
  background: #60bf88;
  border: none;
}
.incorrect {
  color: white;
  background: #ea8282;
}

button {
  width: 80px;
  height: 50px;
  background: #f9a826;
  color: white;
  text-align: center;
  padding: 15px 0;
  border: none;
  border-radius: 12px;
  margin: 20px 30px 0 0;
  align-self: flex-end;
}
</style>
