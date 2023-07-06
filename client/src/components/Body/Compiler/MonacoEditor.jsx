import React, { useContext, useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
import { CompilerContext } from "./Compiler";
import { AppContext } from "../../../App";
import { useParams } from "react-router-dom";



function MonacoEditor() {

  const { sizes2, selectLang, theme, setTheme, setSelectLang, setCode, value, updateValue } = useContext(CompilerContext)
  const { themeToggler, rootUser } = useContext(AppContext)
  const { id } = useParams();

  const [lang, setLang] = useState(selectLang.toLowerCase())

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

  useEffect(() => {
    updateValue(getSnippet());
    setLang(selectLang.toLowerCase())
  }, [selectLang])


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

    getSolution();

  }, [selectLang])

 




  const handleEditorChange = (value) => {
    updateValue(value);
    setCode(value)
  };

  const [height, setHeight] = useState(450)

  useEffect(() => {
    console.log('insiade',sizes2);
    setHeight((Math.floor(sizes2[0]) - 70))
  }, [sizes2])
  

  useEffect(() => {
    setTheme(themeToggler ? 'vs-dark' : 'light');
  }, [themeToggler])
  
  

  return (
    <div style={{
      marginTop: '1rem'
    }}>

      <Editor
        height={height + 'px'}
        defaultLanguage="cpp"
        language={lang}
        theme={theme}
        value={value}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        className="monaco_editor"
        options={{
          scrollBeyondLastLine: false,
          fontSize: "16px",
          mouseWheelZoom: true
        }}
      />
    </div>
  );
}

export default MonacoEditor;