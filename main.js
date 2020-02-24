const Typerwriter = function(textElement, words, wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.txt = "";
  this.wait = parseInt(wait, 10);
  this.wordIndex = 0;
  this.isDeleting = false;
  this.type();
};

Typerwriter.prototype.type = function() {
  // Current index of word
  const currentIndex = this.wordIndex % this.words.length;

  // Get full text of current word
  const fullWord = this.words[currentIndex];

  // Check if currently deleteing
  if (this.isDeleting) {
    this.txt = fullWord.substring(0, this.txt.length - 1);
  } else {
    // Add Char
    this.txt = fullWord.substring(0, this.txt.length + 1);
  }

  // Insert text into span element
  this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Type speed
  let typeSpeed = 200;

  // If deleting, remove letters faster than were being added
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // Check if word is complete
  if (!this.isDeleting && this.txt === fullWord) {
    // pause
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
    // Pause before resume typing
    typeSpeed = 200;
  }

  setTimeout(() => {
    this.type();
  }, typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  const textElement = document.querySelector(".txt-type");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const wait = textElement.getAttribute("data-wait");

  new Typerwriter(textElement, words, wait);
}
