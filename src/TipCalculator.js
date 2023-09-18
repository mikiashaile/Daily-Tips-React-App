import { useState } from "react"

export default function Tips() {

const [selectedTip, setSelectedTip] = useState(10);
const [selectedFrTip, setselectedFrTip] = useState(10);
const [billAmount, setBillAmount] = useState(0);

const averageTip = (selectedTip + selectedFrTip)/2;
const tipAmount = (averageTip*billAmount)/100;
const totalAmount = tipAmount + Number(billAmount);


function handleSelectTip(val) {
    setSelectedTip(val)
}

function handleSelectFriTip(val) {
    setselectedFrTip(val)
}
  return (<div className="tip-container">
    <div className="tip-input">
        <label for="tip-input">How much was the bill? </label>
        <input name ="tip-input" type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)}></input>
    </div>
    <SelectTip value={selectedTip} onSelect={handleSelectTip} label="You tip rate" />
    <SelectTip value={selectedFrTip} onSelect={handleSelectFriTip} label="You friend's tip rate" />
    <h3>You have to pay {`$${totalAmount} ($${billAmount} + $${tipAmount} tip)`}! </h3>
  </div>)
}

function SelectTip ({onSelect, value, label}) {
    function handleSelect(e) {
        onSelect(Number(e.target.value) ?? 0);
    }
    return (
        <div className="tip-input">
        <label for="tip-select">{label} </label>
        <select name="tip-select" value={value} className="input" onChange={handleSelect}>
            <option value="10">Basic</option>
            <option value="15">Good</option>
            <option value="20">Very Good</option>
            <option value="22">Excellent</option>
    </select>
        </div>
        
    )
}