// import React, { useState, useContext } from "react";
// import Editor from "react-simple-code-editor";
// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism.css";
// import { TextareaAutosize } from "@mui/material";
// import { Theme } from "../../Theme";
// import { AppContext } from "../../../App";


// // const code = `function add(a, b) {
// //   return a + b;
// // }

// // const a = 123;
// // `;

// const hightlightWithLineNumbers = (input, language) =>
//   highlight(input, language)
//     .split("\n")
//     .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
//     .join("\n");

// function CodeEditor () {
//   const [codeValue, setCodeValue] = useState('');

//   const {themeToggler} = useContext(AppContext);

//   return (
//     <Editor
//       value={codeValue}
//       onValueChange={code => setCodeValue(code)}
//       highlight={code => hightlightWithLineNumbers(code, languages.js)}
//       padding={20}
//       textareaId="codeArea"
//       className="editor"
//       tabSize={4}
//       style={{
//         fontFamily: '"Fira code", "Fira Mono", monospace',
//         fontSize: 18,
//         outline: 0,
//         overflowX:'visible',
//         overflow:'auto',
//       }}
//     />

//   );
// }

// export default CodeEditor;


// import React, { useState } from 'react'

// import { CodeEditorEditable } from 'react-code-editor-editable'
// import 'highlight.js/styles/dracula.css';

// const App = () => {
//   const [value, setValue] = useState('<div></div>')

//   return (
//     <div className='center'>
//       <CodeEditorEditable
//         value={value}
//         setValue={setValue}
//         width='50vw'
//         height='50vh'
//         language='cpp'
//         tabSize={4}
//         inlineNumbers
//       />
//     </div>
//   )
// }

// export default App


import React, { useState, useContext, useEffect } from "react";
import AceEditor from "react-ace";
import { CompilerContext } from "./Compiler";
import { AppContext } from '../../../App';
import { useParams } from "react-router-dom";

import "brace/mode/python";
import "brace/mode/c_cpp";
import "brace/mode/java";

import "brace/theme/monokai";
import "brace/theme/dracula";
import "brace/theme/github";
import "brace/theme/tomorrow";
import "brace/theme/cobalt";
import "brace/theme/chrome";
import "brace/ext/language_tools";

// import "./styles.css";

export default function CodeEditor() {
  const { selectLang, setSelectLang, setCode, value, updateValue } = useContext(CompilerContext)
  const { themeToggler, rootUser } = useContext(AppContext)

  const { id } = useParams();


  function onChange(newValue) {
    updateValue(newValue);
    setCode(newValue)
  }





  const getSnippet = () => {
    if (selectLang === 'Cpp') {
      return `#include <bits/stdc++.h>
using namespace std;

int main(){
    
    // Write logic
    
    return 0;
}`
    } else if (selectLang === 'C') {
      return `#include <stdio.h>
int main() {

    // Write logic

    return 0;
}`
    } else if (selectLang === 'Java') {
      return `// Don't change class name
class Main {
    public static void main(String[] args) {
        // Write logic
    }
}`
    }

    return '# Write logic'
  }


  const getSolution = async () => {
    try {

      const res = await fetch('/getSolution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: rootUser._id,
          problem_id: id,
          lang: selectLang,
        })
      })

      const Data = await res.json();
      console.log(Data);

      if (res.status === 400) {
        updateValue(getSnippet)
        setCode(getSnippet)
        return;
      }

      if (Data.solution === "") {
        updateValue(getSnippet)
        setCode(getSnippet)
      } else {
        updateValue(Data.solution)
        setCode(Data.solution)
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    console.log(rootUser);
    getSolution();

  }, [selectLang])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginTop: '1rem',
    }}>
      <AceEditor
        focus
        value={value}
        fontSize={18}
        width={'100%'}
        // placeholder="Start coding"
        mode={selectLang === 'Python' ? 'python' : (
          selectLang === 'Java' ? 'java' : 'c_cpp'
        )}
        theme={themeToggler ? "cobalt" : 'chrome'}
        onChange={onChange}
        name="Id"
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 4
        }}
        enableSnippets={true}
        editorProps={{ 
          $blockScrolling: true,
        }}
        className='editor_box'
       
      />
    </div>
  );
}

