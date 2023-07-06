const dictionary = ["alpaca", "alligator", "apple", "ball", "banana", "buffalo", "butterfly", "camel", "carrot", "cat", "catfish", "cheetah", "dolphin", "donkey", "eagle", "elephant", "elephant", "falcon", "fish", "flamingo", "flower", "giraffe", "gorilla", "grape", "guitar", "hat", "hedgehog", "hippo", "house", "ibis", "iguana", "iguana", "internet", "island", "jackfruit", "jacket", "jaguar", "jellyfish", "jungle", "kangaroo", "kangaroo", "king", "koala", "lemon", "lemur", "lemur", "lion", "lion", "mango", "mango", "monkey", "monkey", "mongoose", "narwhal", "narwhal", "newt", "notebook", "ocean", "octopus", "octopus", "orange", "ostrich", "parrot", "peacock", "penguin", "penguin", "queen", "quail", "quokka", "quokka", "rabbit", "raccoon", "rhinoceros", "rhinoceros", "rose", "shark", "snake", "sun", "sunflower", "sloth", "tortoise", "tiger", "tiger", "tree", "toucan", "toucan", "umbrella", "uakari", "uakari", "vase", "vampire", "violet", "vulture", "walrus", "walrus", "water", "whale", "whale", "xylophone", "xenops", "xenops", "yak", "yak", "zebra", "zebra", "zebu", "zebu"];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");
const speedElement = document.getElementById("speed");
var noWords = document.getElementById("detlss");
var hideHigh = document.getElementsByClassName("hideHigh");

document.getElementById("start").addEventListener("click", function () {
  let wordCount = Math.floor(Math.random() * 5) + 3; 
  if(noWords.value >= 3  && noWords.value<=100){
      wordCount = noWords.value
    }
  words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    words.push(dictionary[randomIndex]);
  }
  wordIndex = 0;

  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });

  quoteElement.innerHTML = spanWords.join("");
  quoteElement.childNodes[0].className = "highlight";
  messageElement.innerText = "";

  typedValueElement.value = "";
  typedValueElement.focus();

  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", (e) => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const typingSpeed = Math.round((words.length / (elapsedTime / 1000)) * 60);
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds. Your typing speed is ${typingSpeed} words per minute.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    typedValueElement.value = "";
    wordIndex++;

    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }

    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.className = "";
  } else {
    typedValueElement.className = "error";
  }
});
