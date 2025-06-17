"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  AboutImg2,
  ArrowLeft,
  ClockIcon,
  DummyProfile,
  FemalePlaceholder,
  MalePlaceholder,
  PaperPlane,
  SearchIcon,
  SmileIcon,
  ThreeDotIcon,
} from "@/app/components/common/allImages/AllImages";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import InputField from "@/app/components/common/inputFields/InputField";
import Link from "next/link";
import ProfileImage from "@/app/components/common/profileImage/ProfileImage";
import {
  createChat,
  getAllChats,
  getMessages,
} from "@/app/lib/api/messagingRoutes";
import useChat from "@/hooks/useChat";
import { useRouter, useSearchParams } from "next/navigation";
import { generateRoomId, getformattedTime } from "@/util/util";
import CustomLoader from "@/app/components/common/loader/CustomLoader";

interface ChatMessage {
  _id: string;
  authorId: string;
  authorName: string;
  receiverId: string;
  text: string;
}

interface Chat {
  _id: string;
  name: string;
  message: string;
  time: string;
  image: string;
  roomId: string;
  gender: string;
}

const MessagePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let receiver_id = searchParams.get("receiverId");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const chatUser = localStorage.getItem("chat_user");
  const chatObj = chatUser ? JSON.parse(chatUser) : null;
  const [selectedChat, setSelectedChat] = useState<Chat | null>(
    chatObj || null
  );
  const { messages, setMessages, sendMessage } = useChat(
    selectedChat?.roomId ? selectedChat?.roomId : `${receiver_id}_${user?._id}`,
    user?._id
  );
  const senderImage =
    Array.isArray(user?.userImages) && user?.userImages.length > 0
      ? user?.userImages[0]
      : user?.gender === "male"
      ? MalePlaceholder.src
      : FemalePlaceholder.src;
  // const [messagesList, setMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const response = await getAllChats();
      setChats(
        response?.data?.chats?.map((chat: any, i: number) => ({
          _id: chat?.chattedUser?._id,
          name: chat?.chattedUser?.name,
          message: "",
          time: getformattedTime(chat?.updatedAt),
          image:
            Array.isArray(chat?.chattedUser?.userImages) &&
            chat?.chattedUser?.userImages.length > 0
              ? chat?.chattedUser?.userImages[0]
              : chat?.chattedUser?.gender === "male"
              ? MalePlaceholder.src
              : FemalePlaceholder.src,
          roomId: chat?.roomId,
          gender: chat?.chattedUser?.gender,
          // roomId: chat?._doc?.roomId ? chat?._doc?.roomId : chat?._doc?._id,
        }))
      );
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chats && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats]);

  useEffect(() => {
    if (!receiver_id && selectedChat) {
      receiver_id = selectedChat?._id;
      console.log(receiver_id);
      router.replace(`/home/messages?receiverId=${receiver_id}`);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          setMessagesLoading(true);
          const response = await getMessages(selectedChat?.roomId);
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setMessagesLoading(false);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" || !selectedChat || !receiver_id) return;

    try {
      await sendMessage(inputMessage, receiver_id);
      fetchChats();
      // await axios.post("/api/sendMessage", {
      //   roomId: selectedChat.roomId,
      //   text: inputMessage,
      // });

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     _id: Date.now().toString(),
      //     sender: "You",
      //     senderImg:
      //       Array.isArray(user?.userImages) && user?.userImages.length > 0
      //         ? user?.userImages[0]
      //         : user?.gender === "male"
      //         ? MalePlaceholder.src
      //         : FemalePlaceholder.src,
      //     text: inputMessage,
      //     time: "Just now",
      //   },
      // ]);
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };

  // const handleCreateConvo = async (id: string) => {
  //   try {
  //     const response = await createChat({
  //       senderId: user?._id,
  //       receiverId: receiver_id,
  //       roomId: generateRoomId(id, user?._id),
  //     });
  //     console.log(response);
  //     if (response?.status === 200 && response?.data?.conversation) {
  //       const convo = response?.data?.conversation;
  //       setSelectedChat({
  //         _id: convo?._doc?._id,
  //         name: convo?.chattedUser?.name,
  //         message: "",
  //         time: getformattedTime(convo?._doc?.updatedAt),
  //         image: convo?.chattedUser?.userImages[0],
  //         roomId: convo?.roomId,
  //         gender: convo?.chattedUser?.gender,
  //       });
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   if (receiver_id) handleCreateConvo(receiver_id);
  // }, [receiver_id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto h-auto bg-gray-50 mb-20 md:px-4">
      <ul className="hidden md:flex items-center gap-2 text-sm my-8">
        <li>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li className="text-gray-400">
          <span>›</span>
        </li>
        <li>
          <span className="text-primary">Messages</span>
        </li>
      </ul>
      {/* Header with back button for mobile */}
      {selectedChat && (
        <div className="md:hidden bg-white p-4 flex items-center gap-4 md:border-b border-gray">
          <button onClick={() => setSelectedChat(null)}>
            <ArrowLeft width={24} height={24} />
          </button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
      )}

      <div className="bg-white md:border border-gray rounded-2xl h-[calc(100vh-190px)]">
        <div className="flex h-full">
          <div
            className={`w-full md:w-1/3 md:border-r border-gray flex flex-col ${
              selectedChat ? "hidden md:flex" : "flex"
            }`}
          >
            <div>
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray">
                <h2 className="text-xl font-bold">All Messages</h2>
                <ThreeDotIcon />
              </div>
              <div className="relative border-b px-6 py-4 border-gray">
                <InputField
                  name="search"
                  type="text"
                  placeholder="Search"
                  icon={SearchIcon}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div>
                {chats &&
                  chats.length > 0 &&
                  chats.map((chat, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedChat(chat);
                        if (selectedChat) {
                          receiver_id = selectedChat?._id;
                          router.replace(
                            `/home/messages?receiverId=${receiver_id}`
                          );
                        }
                      }}
                      className="flex gap-3 items-center p-3 h-32 hover:bg-gray50 border-b border-gray cursor-pointer px-6"
                    >
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <img
                          src={chat.image}
                          alt={chat.name}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{chat.name}</h3>
                        </div>
                        <div className="text-sm text-gray-600 truncate mt-2">
                          {chat.message}
                        </div>

                        <div className="text-sm text-normal mt-2 flex gap-1 items-center">
                          <ClockIcon />
                          {chat.time}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div
            className={`w-full md:w-2/3 flex flex-col ${
              !selectedChat ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="p-4 border-b border-gray flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ProfileImage
                  src={
                    selectedChat?.image
                      ? selectedChat?.image
                      : selectedChat?.gender === "female"
                      ? FemalePlaceholder.src
                      : MalePlaceholder.src
                  }
                  alt="My Image"
                  size="md"
                  active
                />
                <h2 className="text-lg font-bold">{selectedChat?.name}</h2>
              </div>
              <button className="text-sm text-primary">Block</button>
            </div>

            <div
              className="flex-1 p-6 overflow-y-auto space-y-4"
              ref={messagesEndRef}
            >
              {messagesLoading ? (
                <div className="w-full h-full flex justify-center items-end">
                  <CustomLoader />
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex items-center justify-start`}>
                    {msg.authorId !== user?._id && selectedChat?.image ? (
                      <ProfileImage
                        src={selectedChat?.image}
                        alt="sender Image"
                        size="md"
                        active
                      />
                    ) : (
                      // <div className="w-10 h-10 relative flex-shrink-0">
                      //   </div>
                      <ProfileImage
                        src={senderImage}
                        alt="sender Image"
                        size="md"
                        active
                      />
                    )}
                    <div className={`p-4 rounded-2xl max-w-full`}>
                      <div className="flex gap-5 items-center">
                        <p className="text-base font-bold">
                          {msg.authorId !== user?._id
                            ? selectedChat?.name
                            : user?.name}
                        </p>
                        <p className="text-xs mt-2 opacity-70">
                          {getformattedTime(msg.createdAt.toString())}
                        </p>
                      </div>
                      <p className="text-sm text-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}

              <div />
            </div>

            <div className="p-4 border-t border-gray">
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute top-28 right-4"
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <div className="flex items-center bg-gray50 rounded-lg p-1">
                <input
                  type="text"
                  placeholder="Type something..."
                  className="flex-1 px-4 py-2 bg-transparent border-0 outline-none"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <div className="flex items-center gap-2 px-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 hover:bg-gray-200 border-r border-gray"
                  >
                    <SmileIcon width={20} height={20} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-darkBlue p-2 rounded-full"
                  >
                    <PaperPlane width={14} height={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import {
//   AboutImg2,
//   ArrowLeft,
//   ClockIcon,
//   DummyProfile,
//   PaperPlane,
//   SearchIcon,
//   SmileIcon,
//   ThreeDotIcon,
// } from "@/app/components/common/allImages/AllImages";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import InputField from "@/app/components/common/inputFields/InputField";
// import Link from "next/link";
// import ProfileImage from "@/app/components/common/profileImage/ProfileImage";
// import {
//   createChat,
//   getAllChats,
//   getMessages,
// } from "@/app/lib/api/messagingRoutes";
// import useChat from "@/hooks/useChat";
// import { useSearchParams } from "next/navigation";

// interface ChatMessage {
//   _id: string;
//   sender: string;
//   senderImg: string;
//   text: string;
//   time: string;
// }

// interface Chat {
//   _id: string;
//   name: string;
//   message: string;
//   time: string;
//   image: string;
//   roomId: string;
// }

// const MessagePage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const receiver_id = searchParams.get("receiverId");
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;
//   const emojiPickerRef = useRef<HTMLDivElement>(null);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const { messages, sendMessage } = useChat(selectedChat?.roomId ? selectedChat?.roomId : user?._id, user?._id);
//   const [messagesList, setMessages] = useState<ChatMessage[]>([]);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await getAllChats();
//         setChats(response.data.chats);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };
//     fetchChats();
//   }, []);

//   useEffect(() => {
//     if (selectedChat) {
//       const fetchMessages = async () => {
//         try {
//           const response = await getMessages(selectedChat.roomId);
//           setMessages(response.data.messages);
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       };
//       fetchMessages();
//     }
//   }, [selectedChat]);

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === "" || !selectedChat || !receiver_id) return;

//     try {
//       sendMessage(inputMessage, receiver_id);
//       // await axios.post("/api/sendMessage", {
//       //   roomId: selectedChat.roomId,
//       //   text: inputMessage,
//       // });

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           _id: Date.now().toString(),
//           sender: "You",
//           senderImg: DummyProfile.src,
//           text: inputMessage,
//           time: "Just now",
//         },
//       ]);
//       setInputMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleEmojiClick = (emojiObject: EmojiClickData) => {
//     setInputMessage((prev) => prev + emojiObject.emoji);
//   };

//   const handleCreateConvo = async () => {
//     try {
//       const response = await createChat({
//         senderId: user?._id,
//         receiverId: receiver_id,
//       });
//       console.log(response);
//       if (response?.status === 200) {
//         setSelectedChat(response?.data?.conversation);
//       }
//     } catch (error) {}
//   };

//   useEffect(() => {
//     if (receiver_id) handleCreateConvo();
//   }, [receiver_id]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target as Node)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto h-auto bg-gray-50 mb-20 md:px-4">
//       <ul className="hidden md:flex items-center gap-2 text-sm my-8">
//         <li>
//           <Link href="/home" className="hover:text-primary">
//             Home
//           </Link>
//         </li>
//         <li className="text-gray-400">›</li>
//         <li>
//           <span className="text-primary">Messages</span>
//         </li>
//       </ul>

//       <div className="bg-white md:border border-gray rounded-2xl h-[calc(100vh-190px)]">
//         <div className="flex h-full">
//           <div
//             className={`w-full md:w-1/3 md:border-r border-gray ${
//               selectedChat ? "hidden md:flex" : "flex"
//             }`}
//           >
//             <div className="px-6 py-4 border-b border-gray">
//               <h2 className="text-xl font-bold">All Messages</h2>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//               {chats.map((chat) => (
//                 <div
//                   key={chat._id}
//                   onClick={() => setSelectedChat(chat)}
//                   className="flex gap-3 items-center p-3 border-b cursor-pointer px-6 hover:bg-gray-50"
//                 >
//                   <Image
//                     src={chat.image}
//                     alt={chat.name}
//                     width={48}
//                     height={48}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold">{chat.name}</h3>
//                     <p className="text-sm text-gray-600 truncate">
//                       {chat.message}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div
//             className={`w-full md:w-2/3 ${
//               !selectedChat ? "hidden md:flex" : "flex"
//             }`}
//           >
//             <div className="p-4 border-b flex justify-between items-center">
//               <h2 className="text-lg font-bold">{selectedChat?.name}</h2>
//             </div>
//             <div className="flex-1 p-6 overflow-y-auto">
//               {messagesList.map((msg) => (
//                 <div key={msg._id} className="flex items-center gap-2 mb-4">
//                   <Image
//                     src={msg.senderImg}
//                     alt={msg.sender}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="p-3 bg-gray-100 rounded-lg max-w-sm">
//                     <p>{msg.text}</p>
//                     <small className="text-xs opacity-70">{msg.time}</small>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t flex gap-2">
//               {showEmojiPicker && (
//                 <EmojiPicker
//                   // ref={emojiPickerRef}
//                   onEmojiClick={handleEmojiClick}
//                 />
//               )}
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-1 p-2 border rounded-lg"
//                 placeholder="Type a message..."
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 text-white p-2 rounded-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Image, { StaticImageData } from "next/image";
// import {
//   AboutImg2,
//   ArrowLeft,
//   BannerImg,
//   ClockIcon,
//   DummyProfile,
//   PaperPlane,
//   SearchIcon,
//   SmileIcon,
//   ThreeDotIcon,
// } from "@/app/components/common/allImages/AllImages";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import InputField from "@/app/components/common/inputFields/InputField";
// import Link from "next/link";
// import ProfileImage from "@/app/components/common/profileImage/ProfileImage";

// interface ChatMessage {
//   id: number;
//   sender: string;
//   senderImg: StaticImageData;
//   text: string;
//   time: string;
// }

// interface Chat {
//   id: number;
//   name: string;
//   message: string;
//   time: string;
//   image: StaticImageData;
// }

// const MessagePage = () => {
//   const emojiPickerRef = useRef<HTMLDivElement>(null);
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 1,
//       sender: "Jennifer Markus",
//       senderImg: AboutImg2,
//       text: "Hey! Did you finish the Hi-fi wireframes for flora app design?",
//       time: "Today | 05:30 PM",
//     },
//     {
//       id: 2,
//       sender: "Jennifer Markus",
//       senderImg: AboutImg2,
//       text: "Gee, its been good news all day. I met someone special today, she's really pretty. I'd like to talk more about it but it has to be tomorrow, she should grab a drink later.",
//       time: "Today | 05:30 PM",
//     },
//   ]);

//   const chatList: Chat[] = [
//     {
//       id: 1,
//       name: "Jennifer Markus",
//       message: "Hey! Did you finish the Hi-fi wireframes for flora app design?",
//       time: "Today | 05:30 PM",
//       image: BannerImg,
//     },
//     {
//       id: 2,
//       name: "Jessica Brown",
//       message: "Just completed a challenging task. Proud of the outcome.",
//       time: "1 min",
//       image: DummyProfile,
//     },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       message:
//         "I had a great meeting today. The new project looks promising. Looking forward to working on it.",
//       time: "3 min",
//       image: DummyProfile,
//     },
//     ...Array.from({ length: 10 }, (_, i) => ({
//       id: i + 4,
//       name: `User ${i + 1}`,
//       message:
//         "This is a sample message to demonstrate scrolling functionality",
//       time: "5 min",
//       image: DummyProfile,
//     })),
//   ];

//   const [inputMessage, setInputMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleSendMessage = () => {
//     if (inputMessage.trim() !== "") {
//       setMessages([
//         ...messages,
//         {
//           id: messages.length + 1,
//           sender: "You",
//           senderImg: DummyProfile,
//           text: inputMessage,
//           time: "Just now",
//         },
//       ]);
//       setInputMessage("");
//     }
//   };

//   const handleEmojiClick = (emojiObject: EmojiClickData) => {
//     setInputMessage((prev) => prev + emojiObject.emoji);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target as Node)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto h-auto bg-gray-50 mb-20 md:px-4">
//       <ul className="hidden md:flex items-center gap-2 text-sm my-8">
//         <li>
//           <Link href="/home" className="hover:text-primary">
//             Home
//           </Link>
//         </li>
//         <li className="text-gray-400">
//           <span>›</span>
//         </li>
//         <li>
//           <span className="text-primary">Messages</span>
//         </li>
//       </ul>
//       {/* Header with back button for mobile */}
//       {selectedChat && (
//         <div className="md:hidden bg-white p-4 flex items-center gap-4 md:border-b border-gray">
//           <button onClick={() => setSelectedChat(null)}>
//             <ArrowLeft width={24} height={24} />
//           </button>
//           <h1 className="text-lg font-semibold">Messages</h1>
//         </div>
//       )}

//       <div className="bg-white md:border border-gray rounded-2xl h-[calc(100vh-190px)]">
//         <div className="flex h-full">
//           <div
//             className={`w-full md:w-1/3 md:border-r border-gray flex flex-col ${
//               selectedChat ? "hidden md:flex" : "flex"
//             }`}
//           >
//             <div>
//               <div className="flex justify-between items-center px-6 py-4 border-b border-gray">
//                 <h2 className="text-xl font-bold">All Messages</h2>
//                 <ThreeDotIcon />
//               </div>
//               <div className="relative border-b px-6 py-4 border-gray">
//                 <InputField
//                   name="search"
//                   type="text"
//                   placeholder="Search"
//                   icon={SearchIcon}
//                 />
//               </div>
//             </div>
//             <div className="flex-1 overflow-y-auto">
//               <div>
//                 {chatList.map((chat) => (
//                   <div
//                     key={chat.id}
//                     onClick={() => setSelectedChat(chat)}
//                     className="flex gap-3 items-center p-3 h-32 hover:bg-gray50 border-b border-gray cursor-pointer px-6"
//                   >
//                     <div className="w-12 h-12 relative flex-shrink-0">
//                       <Image
//                         src={chat.image}
//                         alt={chat.name}
//                         className="rounded-full object-cover"
//                         fill
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-semibold">{chat.name}</h3>
//                       </div>
//                       <div className="text-sm text-gray-600 truncate mt-2">
//                         {chat.message}
//                       </div>

//                       <div className="text-sm text-normal mt-2 flex gap-1 items-center">
//                         <ClockIcon />
//                         {chat.time}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div
//             className={`w-full md:w-2/3 flex flex-col ${
//               !selectedChat ? "hidden md:flex" : "flex"
//             }`}
//           >
//             <div className="p-4 border-b border-gray flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <ProfileImage
//                   src={DummyProfile}
//                   alt="My Image"
//                   size="md"
//                   active
//                 />
//                 <h2 className="text-lg font-bold">Jennifer Markus</h2>
//               </div>
//               <button className="text-sm text-primary">Block</button>
//             </div>

//             <div className="flex-1 p-6 overflow-y-auto space-y-4">
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`flex items-center justify-start`}>
//                   {msg.sender !== "You" ? (
//                     <ProfileImage
//                       src={msg.senderImg}
//                       alt="sender Image"
//                       size="md"
//                       active
//                     />
//                   ) : (
//                     <div className="w-10 h-10 relative flex-shrink-0">
//                       <Image
//                         src={msg.senderImg}
//                         alt="Jennifer Markus"
//                         className="rounded-full object-cover"
//                         fill
//                       />
//                     </div>
//                   )}
//                   <div className={`p-4 rounded-2xl max-w-full`}>
//                     <p className="text-sm">{msg.text}</p>
//                     <p className="text-xs mt-2 opacity-70">{msg.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 border-t border-gray">
//               {showEmojiPicker && (
//                 <div
//                   ref={emojiPickerRef}
//                   className="absolute bottom-20 right-4"
//                 >
//                   <EmojiPicker onEmojiClick={handleEmojiClick} />
//                 </div>
//               )}
//               <div className="flex items-center bg-gray50 rounded-lg p-1">
//                 <input
//                   type="text"
//                   placeholder="Type something..."
//                   className="flex-1 px-4 py-2 bg-transparent border-0 outline-none"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <div className="flex items-center gap-2 px-2">
//                   <button
//                     onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                     className="p-2 hover:bg-gray-200 border-r border-gray"
//                   >
//                     <SmileIcon width={20} height={20} />
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     className="bg-darkBlue p-2 rounded-full"
//                   >
//                     <PaperPlane width={14} height={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;
