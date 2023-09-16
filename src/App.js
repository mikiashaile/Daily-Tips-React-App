import { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
const skills = [
  {skillName: 'Typescript', stars: '⭐⭐⭐⭐⭐', bgColor: 'red'},
  {skillName: 'Angular', stars: '⭐⭐⭐⭐⭐', bgColor: 'blue'},
  {skillName: 'Java', stars: '⭐⭐⭐', bgColor: 'purple'},
  {skillName: 'React', stars: '⭐⭐⭐⭐', bgColor: 'green'}
]

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

  function getSection() {
    const newSection = sectionType === 'profile' ? 'flashCard' : 'profile';
    setSectionType(newSection);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div className={sectionType === 'profile' ? 'card' : 'card wide'}>
      <h1>{advice}</h1>
      <button onClick={getAdvice} disabled={count >= 10}>
        Get Advice
      </button>
      <button onClick={getSection} style={{margin: '20px'}}>
        Toggle Section
      </button>
      <DisplayMessage count={count}/>
      {sectionType === 'profile' ? (
        <>
        <Avatar />
        <div className="data">
          <Intro />
          <SkillList />
        </div>
        </>
      ) : (<FlashCard />)}
    </div>
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