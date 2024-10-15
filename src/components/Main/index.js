import monsters1 from './images/monsters1.png'
import {useRef, useState} from "react";
export default function({damage, setDamage, minusDamage, setMinusDamage, userData, setUserData, collectLength, sendMessage, getCoin}){
    const xStep = 302.5;
    const yStep = 302.5;
    const [click, setClick] = useState(false);
    const elmDmgEffect = useRef(null);
    function addElmDmg(e){
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;


        const elm = document.createElement("div");
        elm.innerText = "-" + userData.kickDamage;
        elm.className = "effectP";
        elm.style.top = y + "px";
        elm.style.left = x + "px";
        elmDmgEffect.current.appendChild(elm);


        setTimeout(() => elmDmgEffect.current.removeChild(elm), 1000);
    }
    function setDmg(e){
        setMinusDamage(minusDamage - userData.kickDamage);//185
        addElmDmg(e)
        setClick(true);
        setTimeout(() => setClick(false), 500);
        if(minusDamage - userData.kickDamage <= 0){ //new Level
            userData.level++;
            const level = userData.level * 150;
            const add = userData.level  * 10;
            setDamage(level);
            setMinusDamage(level);
            sendMessage(`New Monster. Wave ${Math.floor(userData.level / (collectLength * 4)) + 1}. You have earned ${add} ${getCoin(1)} & 1 ${getCoin(2)}`);


            userData.coins.coin1 += add;
            userData.coins.coin2 += 1;


            setUserData(userData);
        }
    }
    return (<div className="center">
        <div id="monster" className={click ? "clickEffect" : ''} style={{
            backgroundImage: `url(${monsters1})`,
            backgroundPositionX: -(xStep * userData.level),
            backgroundPositionY: -(yStep * Math.floor(userData.level / collectLength)),
        }} onClick={setDmg}>
            <div ref={elmDmgEffect}></div>
        </div>
        <div id="damage">
        <div style={{width: `${minusDamage * 100 / damage}%`}} ><p style={{fontWeight: "bold"}} className="center">{minusDamage} / {damage}</p></div>
        </div>

    </div>)
}