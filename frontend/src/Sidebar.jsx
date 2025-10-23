// import "./Sidebar.css";
// import { useContext, useEffect } from "react";
// import { MyContext } from "./MyContext.jsx";
// import { useAuth } from "./AuthContext.jsx"; // <-- Import useAuth
// import { v1 as uuidv1 } from "uuid";

// function Sidebar() {
//   const {
//     allThreads,
//     setAllThreads,
//     currThreadId,
//     setNewChat,
//     setPrompt,
//     setReply,
//     setCurrThreadId,
//     setPrevChats,
//   } = useContext(MyContext);

//   const { token } = useAuth(); // <-- Get the token

//   const getAllThreads = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/thread", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // <-- Add token
//         },
//       });
//       const res = await response.json();
//       if (!response.ok) throw new Error(res.error || "Failed to fetch");

//       const filteredData = res.map((thread) => ({
//         threadId: thread.threadId,
//         title: thread.title,
//       }));
//       setAllThreads(filteredData);
//     } catch (err) {
//       console.log(err);
//       // If token is invalid (401), you could force a logout here
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       // Only fetch if we have a token
//       getAllThreads();
//     }
//   }, [currThreadId, token]); // Re-run if token changes (on login)

//   const createNewChat = () => {
//     setNewChat(true);
//     setPrompt("");
//     setReply(null);
//     setCurrThreadId(uuidv1());
//     setPrevChats([]);
//   };

//   const changeThread = async (newThreadId) => {
//     setCurrThreadId(newThreadId);

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/thread/${newThreadId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // <-- Add token
//           },
//         }
//       );
//       const res = await response.json();
//       if (!response.ok) throw new Error(res.error || "Failed to fetch thread");

//       console.log(res);
//       setPrevChats(res);
//       setNewChat(false);
//       setReply(null);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteThread = async (threadId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/thread/${threadId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // <-- Add token
//           },
//         }
//       );
//       const res = await response.json();
//       if (!response.ok) throw new Error(res.error || "Failed to delete");

//       console.log(res);

//       setAllThreads((prev) =>
//         prev.filter((thread) => thread.threadId !== threadId)
//       );

//       if (threadId === currThreadId) {
//         createNewChat();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ... rest of your return() JSX is unchanged ...
//   return (
//     <section className="sidebar">
//       <button onClick={createNewChat}>
//         <img
//           src="/blacklogo.png"
//           alt="gpt logo"
//           className="logo"
//         ></img>
//         <span>
//           <i className="fa-solid fa-pen-to-square"></i>
//         </span>
//       </button>

//       <ul className="history">
//         {allThreads?.map((thread, idx) => (
//           <li
//             key={idx}
//             onClick={(e) => changeThread(thread.threadId)}
//             className={thread.threadId === currThreadId ? "highlighted" : " "}
//           >
//             {thread.title}
//             <i
//               className="fa-solid fa-trash"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 deleteThread(thread.threadId);
//               }}
//             ></i>
//           </li>
//         ))}
//       </ul>

//       <div className="sign">
//         <p>Made by Aditya Gupta </p>
//       </div>
//     </section>
//   );
// }

// export default Sidebar;

import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { useAuth } from "./AuthContext.jsx"; // <-- Import useAuth
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const { token } = useAuth(); // <-- Get the token

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/thread`,
        {
          headers: {
            //...
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- Add token
          },
        }
      );
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to fetch");

      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
      // If token is invalid (401), you could force a logout here
    }
  };

  useEffect(() => {
    if (token) {
      // Only fetch if we have a token
      getAllThreads();
    }
  }, [currThreadId, token]); // Re-run if token changes (on login)

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/thread/${newThreadId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- Add token
          },
        }
      );
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to fetch thread");

      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/thread/${threadId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- Add token
          },
        }
      );
      const res = await response.json();
      if (!response.ok) throw new Error(res.error || "Failed to delete");

      console.log(res);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ... rest of your return() JSX is unchanged ...
  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img
          src="src/assets/blacklogo.png"
          alt="gpt logo"
          className="logo"
        ></img>
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : " "}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>Made by Aditya Gupta </p>
      </div>
    </section>
  );
}

export default Sidebar;
