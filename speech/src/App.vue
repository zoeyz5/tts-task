<script setup>
import { ref, onMounted } from 'vue'
import { speak } from './speak.vue'
import pinyin from 'pinyin'
const transcript = ref('')
const isRecording = ref(false)
let currentPage = 0;
let currentIndex = 0;
let beginning = true;
let timer = 0;
let count = 0;

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
sr.lang = 'cmn-Hans-CN'

const words = [[{pinyin: "nǐ", character:"你"}, ],
                [{pinyin: "hǎo", character:"好"}]
  ]

onMounted(() => {
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
		for (let i = 0; i < evt.results.length; i++) {
			const result = evt.results[i]
		}

		const t = Array.from(evt.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('')
		
		transcript.value = t
	}
})

//place sr inside a function
function start(){
  console.log(count)
  if(count < 2){
    speak(words[currentPage][currentIndex].character, 'zh')

    setTimeout(() => {
      if(!isRecording.value){
      sr.start()
      }
    }, 1000)

    setTimeout(stop, 4000)
  }
  else clearInterval(timer)
}

function stop(){
  sr.stop()
  if(pinyin(transcript.value) == words[currentPage][currentIndex].pinyin){
    currentIndex = currentIndex + 1
    count = count + 1
    if(currentIndex == words[currentPage].length){
      currentPage = currentPage + 1
      currentIndex = 0
    }
    console.log("page" + currentPage)
    console.log("index" + currentIndex)
  }
  //console.log(transcript.value)
}

const ToggleMic = () => {
    if(beginning){
      speak('read after me', 'en')
      beginning = false
    }
    //speak
    // speak(words[currentPage][currentIndex].character, 'zh')
    // console.log(count)
    //   if(count < 4){
    //     timer = setInterval(start, 5000)
    //   }
    //   else{
    //     clearInterval(timer)
    //   }
    timer = setInterval(start, 5000)

}
</script>

<template>
	<div class="app">
    <p v-for="w in words[currentPage]">
      {{ w.character }}
    </p>
		<button :class="`mic`" @click="ToggleMic">Record</button>
		<div class="transcript" v-text="transcript"></div>
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}
</style>