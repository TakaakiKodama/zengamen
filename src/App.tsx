import React, { useState } from 'react'
import './App.css';
import styled, { css } from 'styled-components'

type Sizes = {
  font: string
  hight: string
}

type Props = {
  sizes: Sizes
  changeSize: React.Dispatch<React.SetStateAction<Sizes>>
}


const App: React.FC = () => {
  const [sizes, changeSize] = useState({ font: "50vw", hight: "1em" })
  return (
    <React.Fragment>
      <TextContainer>
        <FlipBordWrapper sizes={sizes} changeSize={changeSize} >
          <FlipBord sizes={sizes} changeSize={changeSize} />
        </FlipBordWrapper>
      </TextContainer>
    </React.Fragment>
  )
}

export default App;

const TextContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FlipBordWrapper = styled.div<Props>`
  width: 100%;
  textarea {
    width: 100%;
    border: none;
　  outline: none;
    overflow:hidden;
    height: ${props => props.sizes.hight};
    text-align: center;
    vertical-align: middle;
    font-size: ${props => props.sizes.font};
  }
`

const FlipBord: React.FC<Props> = ({ sizes, changeSize }) => {
  const [inputLetter, writeLetter] = useState("")
  const calcSize = (inputLetter: string) => {
    console.log("something wrong")
    function getLen(str: string) {
      var result = 0;
      for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        if ((chr >= 0x00 && chr < 0x81) ||
          (chr === 0xf8f0) ||
          (chr >= 0xff61 && chr < 0xffa0) ||
          (chr >= 0xf8f1 && chr < 0xf8f4)) {
          result += 0.5;
        } else {
          result += 1;
        }
      }
      return result;
    };
  
    const LetterSizes = inputLetter.split("\n").map(row => getLen(row))
    const rowLength = Math.max.apply(null, LetterSizes)
    const colLength = LetterSizes.length

    const lengthPerSize = (rowLength: number, colLength: number) => {
      if (rowLength >= colLength) {
        return `${Math.min.apply(null, [50, 98 / rowLength])}vw`
      } else {
        return `${Math.min.apply(null, [50, 98 / colLength])}vh`
      }
    }
    const newSize: Sizes = {
      font: lengthPerSize(rowLength, colLength),
      hight: `${colLength}em`
    }
    return newSize
  }
  const change = (e: any) => {
    const inputLetter = e.target.value
    writeLetter(inputLetter)
    changeSize(calcSize(inputLetter))
  }

  return (
    <div>
      <textarea wrap="off" value={inputLetter} onChange={change} name="" id="flip"  >{inputLetter}</textarea>
    </div>
  )
}

