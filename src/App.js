import { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
import Accordion from "./Accordion";
import TipCalc from "./TipCalculator"
const skills = [
  {skillName: 'Typescript', stars: '⭐⭐⭐⭐⭐', bgColor: 'red'},
  {skillName: 'Angular', stars: '⭐⭐⭐⭐⭐', bgColor: 'blue'},
  {skillName: 'Java', stars: '⭐⭐⭐', bgColor: 'purple'},
  {skillName: 'React', stars: '⭐⭐⭐⭐', bgColor: 'green'}
]

const accrodionData = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [sectionType, setSectionType] = useState('profile');
  
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  function getSection(section) {
    setSectionType(section);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <>
    <div class="wide">
      <button onClick={()=>getSection('profile')} style={{margin: '20px'}}>
        Profile
      </button>
      <button onClick={()=>getSection('flashCard')} style={{margin: '20px'}}>
        Flash Cards
      </button>
      <button onClick={()=>getSection('accordion')} style={{margin: '20px'}}>
        Accordion
      </button>
      <button onClick={()=>getSection('tip')} style={{margin: '20px'}}>
        Tip Calculator
      </button>
    </div>

      <div className={sectionType === 'profile' ? 'card' : 'card wide'}>
      <h1>{advice}</h1>
      <DisplayMessage count={count}/>
      <button onClick={getAdvice} className="advice" disabled={count >= 10}>
        Get Advice
      </button>
      {sectionType === 'profile' ? (
        <>
        <Avatar />
        <div className="data">
          <Intro />
          <SkillList />
        </div>
        </>
      ) : sectionType === 'flashCard' ? (<FlashCard />) : 
      sectionType === 'accordion' ? (<Accordion data={accrodionData}/>) : 
      (<TipCalc />)}
    </div>
    </>
  );
}

function DisplayMessage(props) {
  return (
    <p style={{margin: '20px'}}>
      You recieved <strong>{props.count}</strong> so far. Your daily limit is
      10.
    </p>
  );
}

function Avatar() {
  return <img src="profile-avatar.jpg" alt="avatar" className="avatar"/>;
}

function Intro() {
  return <div>
    <h1>Jake Sully</h1>
    <p>A Lead Software Developer with 10+ years of experience developing innovative software solutions and applications for enterprise customers. A proven track record of building and leading diverse development teams throughout all phases of SDLC. Adept at coordinating with cross-functional stakeholders to execute multi-million-dollar technology projects.</p>
  </div>
}

function SkillList() {
  return <div className="skill-list">
    {skills.map((sk) => <Skill skillName={sk.skillName} bgColor={sk.bgColor} stars={sk.stars} key={sk.skillName}/>)}
  </div>
}

function Skill(props) {
  return <div style={{backgroundColor: props.bgColor}}>
    <span style={{color: 'white'}}>{props.skillName} </span>
    <span>{props.stars}</span>
  </div>
}