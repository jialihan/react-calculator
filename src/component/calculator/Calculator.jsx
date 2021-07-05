import React, { useEffect, useState, useCallback } from 'react';
import Button from 'component/button/Button';
import "./Calculator.css";

export function Calculator(props) {
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [sum, setSum] = useState(0);
    const [sign, setSign] = useState('+');
    const [isNewNum, setIsNewNum] = useState(true);
    const [preOperator, setPreOperator] = useState('');
    const [prevInput, setPrevInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [displayResult, setDisplayResult] = useState('')
    const onClickHandler = (val, type) => {
        if(val==='C')
        {
            clearHandler();
        }
        else if(val==='+/-'){
            toggleSignHandler();
        }
        else if(val==='%')
        {
            percentageHanlder();
        }
        else if(val === '+')
        {
            if(!isNewNum)
            {
                compute('+');
            }
            setSign('+');
            setIsNewNum(true);
        }
        else if(val === '-')
        {
            if(!isNewNum)
            {
                compute('-');             
                // setSign('-');
                // setIsNewNum(true);
            }
            // else{
            //     appendNumber('-');
            // }
            setSign('-');
            setIsNewNum(true);
        }
        else if(val==='*')
        {
            if(!isNewNum)
            {
                compute('*');
            }
            if(isEnterPressed)
            {
                // 1 - 2 = -1 * 6 should output -6
                setSum(0);
                setPrevInput(sum);
            }
            setPreOperator('*');
            // if(!isToggled)
            // {
            //     // after toggle, reset it to "+" sign
            //     setSign('+');
            //     setPrevInput("-1");
            // }
            setIsNewNum(true);
        }
        else if(val==='/')
        {
            if(!isNewNum)
            {
                compute('/');
            }
            setPreOperator('/');
            if(isToggled)
            {
                // after toggle, reset it to "+" sign
                setSign('+');
            }
            setIsNewNum(true);
        }
        else if(val === '=')
        {
            compute('=');
            setPrevInput('');
            setPreOperator('');
            // if(isToggled)
            // {
            //     // after toggle, reset it to "+" sign
            //     setSign('+');
            // }
            setIsNewNum(true);
            setIsEnterPressed(true);
        }
        else{
            appendNumber(val);  
        }
        if(isToggled && val !== '+/-')
        {
            setIsToggled(false);
        }
        if(isEnterPressed && val !== '=')
        {
            setIsEnterPressed(false);
        }
    }
    const clearHandler = ()=> {
        setTextInput('');
        setSum(0);
        setPrevInput('');
        setIsNewNum(true);
        setDisplayResult('');
    }
    const toggleSignHandler = ()=> {
        if(displayResult === '')
        {
            return;
        }
        let newNum;
        if(displayResult[0]==='-')
        {
            newNum = displayResult.slice(1,displayResult.length);
        }
        else
        {
            newNum = '-'+displayResult;
        }
        if(isEnterPressed)
        {
            setSum(parseFloat(newNum));
        }
        else
        {
            setTextInput(newNum);
        }
        updateResult(newNum);

        // setSum(0); // all future calc is from this current newNum
        setIsNewNum(false); // because now we have a newNum
        setIsToggled(true);
    }
    const percentageHanlder = ()=>{
        let newNum = parseFloat(displayResult) / 100;
        setTextInput(newNum);
        setDisplayResult(newNum);
    }
    const appendNumber = (num)=>{
        let newNum;
        if(isNewNum) {
            newNum = ''+num;
        }
        else {
            if(num==='.' && textInput.indexOf('.')>=0) {
                return;
            }
            newNum = textInput+num;
        }   
        setTextInput(''+newNum);
        updateResult(''+newNum);
        setIsNewNum(false);
    }
    const compute = (op)=>{
        let curNum = parseFloat(textInput);
        console.log("current num: " + curNum);
        if(op === '*' || op === "/")
        {
                let newPreInput;
                if(prevInput)
                {
                    // 4(preInput) *(preOperator) 2(curNum) *(op)
                    newPreInput =  preOperator === "*" ? prevInput  * curNum :  prevInput  / curNum; 
                    updateResult(''+newPreInput);
                }
                else if(preOperator)
                {
                    // 1 + 2 = 3 * 6 /(current op) 2
                    newPreInput = preOperator === "*" ? sum * curNum : sum / curNum;
                }
                else {
                    // 4 * 2 
                    newPreInput = curNum;
                }
                setPrevInput(newPreInput);
            // }
        }   
        if(op === '+' || op==='-' || op === '=') {
            // 1 - 2 = -1 -> toggle = 1 -> "=" show sum error case
            // if(op==='=' && isToggled)
            // {
            //     // invalid "=" after toggle, return -1
            //     setSum(0);
            //     setTextInput('-1');
            //     updateResult('-1');
            //     setPrevInput('-1');
            //     setSign('+');
            //     return;
            // }
            let newSum = 0;
            if(prevInput)
            {
                // 2 + 4 * 2 + ...
                const tmp = preOperator === '*' ? prevInput * curNum : prevInput / curNum;
                newSum = sum + (sign==='-' ? -tmp : tmp);
            }
            else if(preOperator)
            {
                // 1 + 2 = 3 * 3 ....
                newSum = preOperator === "*" ? sum * curNum : sum / curNum;
            }
            else
            {
                // 2 + 3 - ...
                let tmp = 0;
                if(sign)
                {
                    tmp = sign==='-' ? -curNum : curNum;
                }
                newSum = sum + tmp;
            }
            setSum(newSum);
            updateResult(''+newSum);
            setTextInput(''+curNum);
        }
    }
    const updateResult =  (result) => {
        setDisplayResult(result);
    }

    return (
    <>
    <div className="grid-container">
        <div className="results">
            {/* <p>1111888888222222222</p> */}
            <p>{displayResult ? displayResult : '0'}</p>
        </div>
        <Button value="C" type="tool" clicked={onClickHandler}>C</Button>
        <Button value="+/-" type="tool" clicked={onClickHandler} >+/-</Button>
        <Button value="%" type="tool" clicked={onClickHandler} >%</Button>
        <Button value="/" type="op" clicked={onClickHandler} >÷</Button>
        <Button value="7" clicked={onClickHandler} >7</Button>
        <Button value="8" clicked={onClickHandler} >8</Button>
        <Button value="9" clicked={onClickHandler} >9</Button>
        <Button value="*" type="op" clicked={onClickHandler} >*</Button>
        <Button value="4" clicked={onClickHandler} >4</Button>
        <Button value="5" clicked={onClickHandler} >5</Button>
        <Button value="6" clicked={onClickHandler} >6</Button>
        <Button value="-" type="op" clicked={onClickHandler} >-</Button>
        <Button value="1" clicked={onClickHandler} >1</Button>
        <Button value="2" clicked={onClickHandler} >2</Button>
        <Button value="3" clicked={onClickHandler} >3</Button>
        <Button value="+" type="op" clicked={onClickHandler} >+</Button>
        <Button type="zero" value="0" clicked={onClickHandler} >0</Button>
        <Button value="." clicked={onClickHandler} >.</Button>
        <Button value="=" type="op" clicked={onClickHandler} >=</Button>
    </div>
    <h3> sum = {sum} </h3>
    <h3> prevNumber = {prevInput} </h3>
    <h3> prev Op = {preOperator} </h3>
    <h3> current Num = {textInput}  </h3>
    <h3> Display result = {displayResult}  </h3>
    </>
    )
}
