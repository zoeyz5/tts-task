<script setup>
    import { ref, onMounted } from 'vue'
    import pinyin from 'pinyin'
    import { speak } from './speak.vue'

    const transcript = ref('')
    const isRecording = ref(false)

    const examples = ["你", "好"]
    const answer = ["nǐ", "hǎo"]

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const sr = new Recognition()

    sr.lang = 'zh'
    // implement a function startTest below which uses the speak function to speak words in the examples array and wait for user to speak, if the user speaks the correct word, the next word in the examples array will be spoken, if the user speaks the wrong word, the same word will be spoken again    
    function startTest(){
        let current = 0;
        sr.start();
        // speak(examples[current], 'zh');
        //     console.log(transcript.value);
        //     // while(transcript.value == ""){}
        //     if(transcript.value == answer[current]){
        //         speak("correct", 'en');
        //         current = current+1;
        //     }
        //     else{
        //         speak("wrong", 'en');
        //     }
        // while(current < examples.length){
        //     speak(examples[current], 'zh');
        //     console.log(transcript.value);
        //     if(transcript == answer[current]){
        //         speak("correct", 'en');
        //         current = current+1;
        //     }
        //     else{
        //         speak("wrong", 'en');
        //     }
        // }
        // sr.stop();
    }

    onMounted(() => {
        speak("你好", 'zh');
        speak("hello my name is jkq", 'en');
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
            transcript.value = pinyin(t)
        }
        sr.onspeechstart = () => {
            console.log('Speech Started')
        }
        sr.onaudiostart = () => {
        console.log("Audio capturing started");
        };
        sr.onsoundstart = () => {
  console.log("Some sound is being received");
};

        // intro
        speak("we will learn some vocabulary", 'en');
        // speak("词汇", 'zh');
        // speak("please follow me to pronounce the first vocabulary", 'en');
        // "nǐ" ], [ "hǎo" 
        startTest();
	})
</script>

<template>
    <!-- fill the components below that starts with speaking some intro sentences using speak function, pronounce "你好" in pinyin and start sr to wait for user to speak-->
    <h1>你</h1>

    <div class="transcript" v-text="transcript"></div>
</template>