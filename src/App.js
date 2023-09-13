import { useEffect, useState } from "react";
const skills = [
  {skillName: 'Typescript', stars: '⭐⭐⭐⭐⭐', bgColor: 'red'},
  {skillName: 'Angular', stars: '⭐⭐⭐⭐⭐', bgColor: 'blue'},
  {skillName: 'Java', stars: '⭐⭐⭐', bgColor: 'purple'},
  {skillName: 'React', stars: '⭐⭐⭐⭐', bgColor: 'green'}
]

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
    {skills.map((sk) => <Skill skillName={sk.skillName} bgColor={sk.bgColor} stars={sk.stars}/>)}
  </div>
}

function Skill(props) {
  return <div style={{backgroundColor: props.bgColor}}>
    <span style={{color: 'white'}}>{props.skillName} </span>
    <span>{props.stars}</span>
  </div>
}