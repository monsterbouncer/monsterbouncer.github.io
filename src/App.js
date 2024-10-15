//Monster Bouncer
import './App.css';
import Main from "./components/Main";
import {useEffect, useRef, useState} from "react";
import Header from "./components/Header";
import successIcon from './images/successIcon.svg'
import pendingIcon from "./images/pendingIcon.png"
import errorIcon from "./images/errorIcon.png"


function App() {
    const [damage, setDamage] = useState(100);
    const [minusDamage, setMinusDamage] = useState(100);
    const [userData, setUserData] = useState({
        level: 0,
        kickDamage: 1,
        coins: {
            coin1: 0,
            coin2: 0,
        }
    });
    const [collectLength, setCollectLength] = useState(6);
    const messageElm = useRef(null);
    const [messageId, setMessageId] = useState(0);
    const messagesIcons = {
        success: successIcon,
        pending: pendingIcon,
        error: errorIcon,
    };
    useEffect(() => {
        alert("test")
    }, []);
    function getCoin(coinN, isSmall = true, row = 1){
        return `<span class="coin coin${coinN} ${isSmall ? "small" : ""} row${row}"></span>`;
    }

    function sendMessage(message) {
        if (!messageElm.current) {
            return;
        }
        let pending = true
        function requestPending() {
            return (new Promise((resolve, reject) => {
                return setTimeout(() => resolve('sd'), 1000);
            }))
        }

        const elm = document.createElement("div");
        const id = messageId;
        setMessageId(messageId + 1);
        elm.innerHTML = `<div class="smallIconMessage"><img src="${messagesIcons.pending}" id="message_${id}_img"/></div><p class="flex align" style="flex-wrap: wrap;" id="message_${id}">Pending ...</p>`;
        let img;
        let messageP;
        requestPending().finally(() =>  {
            img =  document.getElementById(`message_${id}_img`);
            messageP = document.getElementById(`message_${id}`);
            pending = false;
        }).then((d) => {
                messageP.innerHTML = message;
                img.src = messagesIcons.success
                }
            ).catch((err) => {
                messageP.textContent = "Failed";
                img.src = messagesIcons.error;
        })



        elm.className = "message";
        let touchStartX = 0;
        let touchEndX = 0;
        let moveX = 0;
        let stop = false;

        function timeout() {
            //return;//todo TEST remove this line
            setTimeout(() => {
                if (stop || pending) {
                    return;
                }
                elm.classList.add("endMessage")
                setTimeout(() => elm.remove(), 500)
            }, 2000);
        }

        const handleTouchStart = (e) => {
            touchStartX = e.targetTouches[0].clientX;
            stop = true;
        };

        const handleTouchMove = (e) => {
            touchEndX = e.targetTouches[0].clientX;
            moveX = touchEndX - touchStartX;

            elm.style.transform = `translateX(${moveX}px)`;
            elm.style.transition = 'transform 0s';
        };

        const handleTouchEnd = () => {
            if (Math.abs(moveX) > 50) {
                elm.style.transition = 'transform 0.3s ease';
                elm.style.transform = `translateX(${moveX > 0 ? 1000 : -1000}px)`;
                setTimeout(() => {
                    elm.remove();
                }, 300);
            } else {
                elm.style.transition = 'transform 0.3s ease';
                elm.style.transform = 'translateX(0px)';
                stop = false;
                timeout();
            }
        };
        elm.addEventListener("touchstart", handleTouchStart);
        elm.addEventListener("touchmove", handleTouchMove);
        elm.addEventListener("touchend", handleTouchEnd);


        messageElm.current.appendChild(elm);
        //timout
        timeout();
    }

    return (
        <div className="App">
            <div id="messagesGroup" ref={messageElm}>

            </div>
            <Header {...userData} setUserData={setUserData} />
        <Main damage={damage} setDamage={setDamage} minusDamage={minusDamage} setMinusDamage={setMinusDamage} userData={userData} setUserData={setUserData} collectLength={collectLength} setCollectLength={setCollectLength} sendMessage={sendMessage} getCoin={getCoin}/>
    </div>
  );
}

export default App;
