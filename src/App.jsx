import './App.css';
import { FaHome } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { sendMsgToGemini } from './openai';
import { useEffect, useRef, useState } from 'react';
import { SiOpenai } from "react-icons/si";
// import './GPT.css';
function App() {
  const msgEnd = useRef(null);
  const [input,setInput]= useState("");
  const [messages,setMessages]= useState([
    {
      text:"Hi, I am ChatGPT, How can i help you!",
      isBot: true,
    }
]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView()
  },[messages])

  const handleSend =async ()=>{
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res= await sendMsgToGemini(text);
    setMessages([
      ...messages,
      { text , isBot: false },
      { text : res, isBot: true }
    ]);
    
  }

  const handleEnter = async (e)=>{
    if(e.ke=='Enter') await handleSend();
  }

  return (
    <div className='App'>
      <div className="sideBar">
          <div className="upperSide">
              <div className="upperSideTop"><img src="https://tse1.mm.bing.net/th/id/OIP.chcP8l7Po-viju22a8LxxgHaC5?pid=Api&P=0&h=180" alt="Chatgpt Logo" className="logo" /></div>
              <button className="midBtn"><FaPlus className='addBtn'/>New Chat</button>
              <div className="upperSideBottom">
                <button className="query"><CiChat1 />What is Programming ?</button><br/>
                <button className="query"><CiChat1 />How to use API</button>
              </div>
          </div>
          <div className="lowerSide">
              <div className="listItems"><FaHome /> Home</div>
              <div className="listItems"><MdOutlineSaveAlt /> Save</div>
              <div className="listItems"><GiUpgrade /> Upgrade to Pro</div>
          </div>
      </div>
      <div className="main">
          <div className="chats">
              {/* <div className="chat">
                <FaRegUser className='userLogo' /><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. A officiis consequatur libero. Rem, dolorem voluptates! Modi voluptates culpa voluptatem voluptas.</p>
              </div>
              <div className="chat bot">
                <img src="https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg" alt="" className='chat1'/><p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolorum minima repudiandae blanditiis quasi velit placeat, fuga inventore non illo. Sit similique minus consectetur dolore voluptatem saepe optio itaque dolor! Necessitatibus, totam ut, nihil enim voluptas quas mollitia perspiciatis sint iusto provident, odit veritatis? Nisi unde praesentium, molestias sed ea totam cumque recusandae excepturi omnis aliquam reiciendis facilis provident officia minima amet eligendi deserunt voluptatem tempora. Repudiandae a pariatur ullam dolore vel at cumque quisquam. Commodi at ratione corporis, asperiores quis dolores facilis libero laborum, accusantium earum vel nam rem minus! Eos iure voluptas in consequuntur quo quam ratione quod!</p>
              </div>  */}
              {messages.map((message,i)=>
                <div key={i} className={message.isBot?"chat bot":"chat"}>
              {message.isBot? <SiOpenai className='icon1' /> : <FaRegUser className='icon'/>} <p className="txt">{message.text}</p>
              </div> 
              )} 
              <div ref={msgEnd}/>
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input type="text" placeholder='Send a message' value={input}  onChange={(e)=>{setInput(e.target.value)}}/> <button className="send" ><IoSend onClick={handleSend} /></button>
            </div>
            <p>ChatGpt may produce inaccurate information about people,places,or facts.ChatGpt January 26 Version.</p>
          </div>
      </div>
    </div>
  )
}

export default App