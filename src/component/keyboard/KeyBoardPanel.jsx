import React, { useEffect, useState } from 'react';
import Button from 'component/button/Button';

function KeyBoardPanel({ updateResuls }) {
  const [isNewNum, setIsNewNum] = useState(true);
  const [sum, setSum] = useState(0);
  const [curNum, setCurNum] = useState('');
  useEffect(() => {
    updateResuls(curNum);
  }, [curNum]);
  const onClickHandler = (val, type) => {
    if (type === 'num' || type === 'zero') {
      console.log('clicked number: ' + val);
      if (isNewNum) {
        setCurNum(val);
        setIsNewNum(false);
      } else {
        setCurNum(curNum + val);
      }
    } else {
      let newSum = sum + parseInt(curNum);
      if (val === '+') {
        console.log('clicked: + ');
        if (!isNewNum) {
          setSum(newSum);
          setCurNum(newSum.toString()); // calculate prev sum
        }
      } else if (val === '=') {
        console.log('clicked: = ');
        setSum(newSum);
        setCurNum(newSum.toString()); // store as new sum
      } else if (val === 'C') {
        // clear all to 0
        setSum(0);
        setCurNum('0');
      }

      setIsNewNum(true);
    }
  };
  return (
    <div>
      <div>
        <Button value="C" type="tool" clicked={onClickHandler} />
        <Button value="+/-" type="tool" clicked={onClickHandler} />
        <Button value="%" type="tool" clicked={onClickHandler} />
      </div>
      <div>
        <Button value="7" clicked={onClickHandler} />
        <Button value="8" clicked={onClickHandler} />
        <Button value="9" clicked={onClickHandler} />
      </div>
      <div>
        <Button value="4" clicked={onClickHandler} />
        <Button value="5" clicked={onClickHandler} />
        <Button value="6" clicked={onClickHandler} />
      </div>
      <div>
        <Button value="1" clicked={onClickHandler} />
        <Button value="2" clicked={onClickHandler} />
        <Button value="3" clicked={onClickHandler} />
        <Button value="+" type="op" clicked={onClickHandler} />
      </div>
      <div>
        <Button value="0" type="zero" clicked={onClickHandler} />
        <Button value="." clicked={onClickHandler} />
        <Button value="=" type="op" clicked={onClickHandler} />
      </div>
    </div>
  );
}

export default KeyBoardPanel;
