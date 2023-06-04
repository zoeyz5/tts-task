<script>
    import { ref, onMounted, watchEffect  } from 'vue'
    import pinyin from 'pinyin'
    import { speak } from './speak.vue'

    export default {
        // setup() {
        //     const userID = ref(0)

        //     watchEffect(() => console.log('Value: ' + userID.value))

        //     setTimeout(() => {
        //     userID.value = 1
        //     }, 1000)

        //     return {
        //     userID,
        //     }
        // },
        data() {
            return {
                current: 0,
                transcript: "",
            }
        },
        watch: {
            current: {
            handler: (newTitle, oldTitle) => {
                console.log('current changed from ' + oldTitle + ' to ' + newTitle)
            }
            },
        },
        mounted() {
            
            sr.continuous = true
            sr.interimResults = false
            sr.onstart = () => {
                console.log('SR Started')
                isRecording.value = true
            }
            sr.onend = () => {
                console.log('SR Stopped')
                isRecording.value = false
            }
            sr.onresult = (evt) => {
                console.log(evt)
                const t = evt.results[evt.results.length-1][0].transcript
                this.transcript = pinyin(t).flat().join("").replace(/[.,，。\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                console.log(this.transcript)
                if(this.transcript.includes(answer[this.current])){
                    speak("correct", 'en');
                    this.current = this.current+1;
                    speak(examples[this.current], 'zh');
                }
                else{
                    console.log(speechSynthesis.getVoices());
                    if(!this.transcript.toLowerCase().includes("correct") || !this.transcript.toLowerCase().includes("wrong")){
                        speak("wrong", 'en');
                        speak(examples[this.current], 'zh');
                    }
                }


            }
            sr.start();
            // intro
            speak("we will learn some vocabulary", 'en');
            speak(examples[this.current], 'zh');
            
        }
    }  
    
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
        speak(examples[current], 'zh');
            console.log(transcript.value);
            // while(transcript.value == ""){}
            if(transcript.value == answer[current]){
                speak("correct", 'en');
                current = current+1;
            }
            else{
                speak("wrong", 'en');
            }
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
        sr.stop();
    }

    // onMounted(() => {
    //     // speak("你好", 'zh');
    //     // speak("hello my name is jkq", 'en');

    //     sr.continuous = true
    //     sr.interimResults = false
    //     sr.onstart = () => {
    //         console.log('SR Started')
    //         isRecording.value = true
    //     }
    //     sr.onend = () => {
    //         console.log('SR Stopped')
    //         isRecording.value = false
    //     }
    //     sr.onresult = (evt) => {
    //         const t = Array.from(evt.results)
    //             .map(result => result[0])
    //             .map(result => result.transcript)
    //             .join('')
    //         transcript.value = pinyin(t).flat().join("").replace(/[.,，。\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    //         console.log(transcript.value)
    //         if(transcript.value.includes(answer[current])){
    //             speak("correct", 'en');
    //             current = current+1;
    //         }
    //         else{
    //             speak("wrong", 'en');
    //             speak(examples[current], 'zh');
    //         }


    //     }
    //     sr.start();
    //     // intro
    //     speak("we will learn some vocabulary", 'en');
    //     // speak("词汇", 'zh');
    //     // speak("please follow me to pronounce the first vocabulary", 'en');
    //     // "nǐ" ], [ "hǎo" 
    //     //startTest();
	// })
</script>

<template>

    <h1>你</h1>
    <h1>好</h1>

    <div class="transcript" v-text="transcript"></div>
</template>