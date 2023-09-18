import { useState } from "react";
import "./accordion.css";

export default function Accordion({ data }) {
  return (
  <div className="accordion">
    {data.map((item, index) => 
    <AccordionItem num={index} title={item.title} text={item.text} key={item.title}/>
    )}
  </div>);
}

function AccordionItem({num, title, text}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} >
            <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? '-' : '+'}</p>
            {isOpen && <div className="content-box">{text}</div>}
        </div>
    )
}