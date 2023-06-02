<script>
// define a function speak that takes in sr and word as parameters, output the sound of the word
// use speechSynthesis.speak(word.sound) to output the sound of the word
export const speak = (word, lang) => {
    let sound = new SpeechSynthesisUtterance(word);
    sound.lang = lang;
    speechSynthesis.speak(sound);
    console.log('speak')
}

</script>