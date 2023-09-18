import { useState } from "react";
import "./accordion.css";

export default function Accordion({ data }) {
    const [currentOpen, setCurrentOpen] = useState(null);

  return (
  <div className="accordion">
    {data.map((item, index) => 
    <AccordionItem 
        num={index} 
        title={item.title} 
        text={item.text} 
        key={item.title} currentOpen={currentOpen} onToggle={setCurrentOpen}/>
    )}
  </div>);
}

function AccordionItem({num, title, text, currentOpen, onToggle }) {
    const isOpen = num === currentOpen;
    function handleToggle() {
        onToggle(num)
    }
    return (
        <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle} >
            <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? '-' : '+'}</p>
            {isOpen && <div className="content-box">{text}</div>}
        </div>
    )
}