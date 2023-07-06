
  
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";


import React , {useContext,useState,useEffect, useMemo} from "react";
import { AppContext } from "../App";


import MicIcon from "@mui/icons-material/Mic";

import {
  IconButton,
} from "@mui/material";


export default function VoiceSearch() {

    const {setSearch,setSearchText} = useContext(AppContext)

    const [tog, setTog] = useState(true)

    // const commands = [
    //   {
    //     command: 'I would like to order',
    //     callback: () => console.log(`Your order is for`)
    //   },
    //   {
    //     command: 'The weather is :condition today',
    //     callback: (condition) => console.log(`Today, the weather is ${condition}`)
    //   },
    //   {
    //     command: 'My top sports are * and *',
    //     callback: (sport1, sport2) => console.log(`#1: ${sport1}, #2: ${sport2}`)
    //   },
    //   {
    //     command: 'Pass the salt (please)',
    //     callback: () => console.log('My pleasure')
    //   },
    //   {
    //     command: ['Hello', 'Hi'],
    //     callback: ({ command }) => console.log(`Hi there! You said: "${command}"`),
    //     matchInterim: true
    //   },
    //   {
    //     command: 'Beijing',
    //     callback: (command, spokenPhrase, similarityRatio) => console.log(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
    //     // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //     isFuzzyMatch: true,
    //     fuzzyMatchingThreshold: 0.2
    //   },
    //   {
    //     command: ['eat', 'sleep', 'leave','blogs'],
    //     callback: (command) => console.log(`Best matching command: ${command}`),
    //     isFuzzyMatch: true,
    //     fuzzyMatchingThreshold: 0.1,
    //     bestMatchOnly: true
    //   },
    //   {
    //     command: 'clear',
    //     callback: ({ resetTranscript }) => resetTranscript()
    //   }
    // ]
    

    const {
      transcript,
      resetTranscript,
      listening,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    
    useEffect(() => {
      setSearchText(transcript)
      setTimeout(() => {
        if(!listening){
          setSearch(false)
          setSearchText('')
          resetTranscript();
          setSearchText('')
        }
      },1500);
    }, [listening, resetTranscript, setSearch, setSearchText, transcript])
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }


    // const start = () =>{
    //     setSearch(true);
    //     SpeechRecognition.startListening({ continuous: true });
    //     console.log("Now listening...");
    //     return () => {
    //       SpeechRecognition.stopListening();
    //       console.log("Stopped Listening");
    //     };
    //     // SpeechRecognition.startListening();
    // }

    // return (
    //   <div>
        
    //     <button onClick={start}>Start</button>
        
    //     {/* <button onClick={resetTranscript}>Reset</button> */}
    //     {/* <p>{transcript}</p> */}
    //   </div>
    // );

    // const [testInput, setTestInput] = useState("");
    // const { transcript, listening } = useSpeechRecognition();

    // const handleTestInput = (event) => {
    //   setTestInput(event.target.value);
    // };
  
    // useMemo(() => {
    //   // setTestInput(transcript);
    //   setSearchText(transcript);
    // }, [transcript]);
  
    // const start = () =>{
    //   if (!listening) {
       
    //       setSearch(true);
    //       console.log("hello world2");
    //       SpeechRecognition.startListening({
    //         language: "en-US",
    //       });
    //   }
    //   else {
    //     setSearch(false);
    //     console.log("hello world");
    //     SpeechRecognition.stopListening();
    //   }
    // }


    const start = () =>{
      if(tog){
        setTog(false);
        setSearch(true);
        SpeechRecognition.startListening();
        console.log("Now listening...");
        return () => {
          // setSearch(false)
          SpeechRecognition.stopListening();
          console.log("Stopped Listening");
        };
      }else{
        SpeechRecognition.stopListening();
        setTog(true);
      }
        
        // SpeechRecognition.startListening();
    }


    return(
      <>
        {/* <TextField
              sx={{ mt: "auto" }}
              // label="Message"
              placeholder="Type Something!"
              multiline
              fullWidth
              maxRows={3}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"> */}
                    <IconButton
                      onClick={ start}
                      color="primary"
                      iconStyle={{
                        width : 10
                      }}
                    >
                      <MicIcon />
                    </IconButton>
                  {/* </InputAdornment>
                )
              }}
              value={testInput}
             
              // onChange={handleTestInput}
              // variant="filled"
            /> */}
      </>

    )

  }
