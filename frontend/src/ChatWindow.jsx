 import "./ChatWindow.css";
 import Chat from "./Chat.jsx";
 import { MyContext } from "./MyContext.jsx";
 import { useAuth } from "./AuthContext.jsx";
 import { useContext, useState, useEffect, useRef } from "react";
 import { ScaleLoader } from "react-spinners";

 function ChatWindow() {
   // --- THIS IS THE LINE I ACCIDENTALLY DELETED ---
   // --- IT IS NOW BACK ---
   const {
     prompt,
     setPrompt,
     reply,
     setReply,
     currThreadId,
     setPrevChats,
     setNewChat,
   } = useContext(MyContext);
   // ---------------------------------------------

   const { token, logout, user } = useAuth();
   const [loading, setLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);
   const buttonRef = useRef(null);

   const getReply = async () => {
     // This guard clause is still correct
     if (!prompt || prompt.trim() === "" || loading) {
       return;
     }

     setLoading(true);
     setNewChat(false);

     console.log("message ", prompt, " threadId ", currThreadId);
     const options = {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         message: prompt,
         threadId: currThreadId,
       }),
     };

     
 try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        options
      );
       const res = await response.json();

       if (!response.ok) {
         throw new Error(res.error || "API error");
       }

      console.log(res);
       setReply(res.reply);
     } catch (err) {
       console.log(err);
       alert(`Error: ${err.message}`);
     }
     setLoading(false);
   };

   // This useEffect now works because `reply` and `setPrompt` are defined
   useEffect(() => {
    if (prompt && reply) {
       setPrevChats((prevChats) => [
         ...prevChats,
         {
          role: "user",
          content: prompt,
        },
         {
           role: "assistant",
           content: reply,
         },
       ]);
     }
     setPrompt("");
   }, [reply]);

   const handleProfileClick = () => {
     setIsOpen(!isOpen);
   };

   // This "click outside" hook is correct
   useEffect(() => {
     function handleClickOutside(event) {
       if (
         buttonRef.current &&
         !buttonRef.current.contains(event.target) &&
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target)
       ) {
        setIsOpen(false);
       }
     }
     if (isOpen) {
       document.addEventListener("mousedown", handleClickOutside);
     } else {
       document.removeEventListener("mousedown", handleClickOutside);
     }
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [isOpen]);

   return (
     <div className="chatWindow">
       <div className="navbar">
         <span>
           MyGPT <i className="fa-solid fa-chevron-down"></i>
         </span>
         <div
           className="userIconDiv"
           onClick={handleProfileClick}
           ref={buttonRef}
         >
           <span className="userIcon">
             {user ? (
               user.name[0].toUpperCase()
             ) : (
               <i className="fa-solid fa-user"></i>
             )}
           </span>
         </div>
       </div>
       {isOpen && (
         <div className="dropDown" ref={dropdownRef}>
           <div className="dropDownItem" onClick={logout}>
             <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
           </div>
           <div className="dropDownItem">
             <i className="fa-solid fa-gear"></i> Settings
           </div>
           <div className="dropDownItem">
             <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
           </div>
        </div>
       )}

       <Chat></Chat>
       <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

      <div className="chatInput">
         <div className="inputBox">
           <input
             placeholder="Ask anything"
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
           ></input>
           <div id="submit" onClick={getReply}>
             <i className="fa-solid fa-paper-plane"></i>
           </div>
         </div>
         <p className="info">
           To prevent api abuse by users <b>threadlimit</b> is <b>3</b> and
           <b> messages-limit per thread</b> is <b>4</b>
         </p>
       </div>
     </div>
   );
 }

 export default ChatWindow;
