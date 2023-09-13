import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div className="card">
      <h1>{advice}</h1>
      <button onClick={getAdvice} disabled={count >= 10}>
        Get Advice
      </button>
      <DisplayMessage count={count}/>

      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
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
    <Skill skillName="Typescript" emoji="⭐⭐⭐⭐⭐" bgColor="red" color="white"/>
    <Skill skillName="Angular" emoji="⭐⭐⭐⭐⭐" bgColor="blue" color="white"/>
    <Skill skillName="React" emoji="⭐⭐⭐" bgColor="purple" color="white"/>
    <Skill skillName="Java" emoji="⭐⭐⭐" bgColor="purple" color="white"/>
  </div>;
}

function Skill(props) {
  return <div style={{backgroundColor: props.bgColor}}>
    <span style={{color: props.color}}>{props.skillName} </span>
    <span>{props.emoji}</span>
  </div>
}
