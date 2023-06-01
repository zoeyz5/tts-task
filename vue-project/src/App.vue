<script setup>
  import { ref, onMounted } from 'vue'
  import pinyin from 'pinyin'
  import { speak } from './speak.vue'
  let eight = new SpeechSynthesisUtterance("八");
  let pull = new SpeechSynthesisUtterance("拔");
  let target = new SpeechSynthesisUtterance("靶");
  let dad = new SpeechSynthesisUtterance("爸");
  let Csound = [eight, pull, target, dad]
  Csound = Csound.map(sound => sound.lang = 'zh')
  let current = 0;
  // remove punctuation from string
  function removePunctuation(string) {
    return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  }
  const words = [{pinyin: "bā", character:"八", meaning:"eight", sound: eight},
                 {pinyin: "bá", character:"拔", meaning:"to pull out", sound: pull},
                 {pinyin: "bǎ", character:"靶", meaning:"target", sound: target},
                 {pinyin: "bà", character:"爸", meaning:"dad", sound: dad},
  ]
  let starting = new SpeechSynthesisUtterance("Hello, my name is Kai, I'm your tutor for today. Please pronounce these words after me");
  let failing = new SpeechSynthesisUtterance("Sorry, your pronunciation is not accurate, please try again:");

  function play(sound){
    speechSynthesis.speak(sound);
    console.log(sound);
  }

  const transcript = ref('')
  const isRecording = ref(false)
  var res = ''

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const sr = new Recognition()
  sr.lang = 'zh'
  onMounted(() => {
    // speak("你好", 'zh');
    // speak("hello my name is jkq", 'en');
	sr.continuous = true
	sr.interimResults = true
	sr.onstart = () => {
		console.log('SR Started')
		isRecording.value = true
	}
	sr.onend = () => {
		console.log('SR Stopped')
		isRecording.value = false
	}
	sr.onresult = (evt) => {
		const t = Array.from(evt.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('')
		
		transcript.value = t
    res = t
	}
})

const ToggleMic = () => {
	if (isRecording.value) {
		sr.stop()
    if(pinyin(res[0]) == words[current].pinyin && current <= 3){
      current = current+1
    }else{
      play(failing)
    }

	} else {
		sr.start()
    speechSynthesis.speak(words[current].sound)
	}
}

const loop = () => {
  if(pinyin(transcript) == words[current].pinyin){
    current = current+1
  }else{
    speechSynthesis.speak(fail);
  }
}

</script>


<template>
  <header>Tone Examples(1)</header>
  <div class="nav">
    <table class="table">
      <tr>
        <th>Pinyin</th>
        <td v-for="word in words">{{ word.pinyin }}</td>
      </tr>
      <tr>
        <th>Character</th>
        <td v-for="word in words">{{ word.character }}</td>
      </tr>
      <tr>
      <th>Meaning</th>
        <td v-for="word in words">{{ word.meaning }}</td>
      </tr>
      <tr>
      <th>Sound</th>
        <td v-for="word in words">
          <button :class="'sound'" @click = "play(word.sound)">Sound</button>
        </td>
      </tr>
    </table>
  </div>

  <div class="app">
    <button :class="'start'" @click = "play(starting); play(words[0].sound)">Start</button>
    <button :class="`mic`" @click="ToggleMic">Play/Verify</button>
    <div class="transcript" v-text="transcript"></div>

  </div>
  
</template>


<style>
table {
  border-collapse: collapse;
}

table td {
  border: 1px solid #000;
}

table tr {
  border: 1px solid #000;
}

table td {
  padding: 10px;
}

</style>
