"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import {
  AboutImg2,
  ArrowLeft,
  BannerImg,
  ClockIcon,
  DummyProfile,
  PaperPlane,
  SearchIcon,
  SmileIcon,
  ThreeDotIcon,
} from "@/app/components/common/allImages/AllImages";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import InputField from "@/app/components/common/inputFields/InputField";
import Link from "next/link";
import ProfileImage from "@/app/components/common/profileImage/ProfileImage";

interface ChatMessage {
  id: number;
  sender: string;
  senderImg: StaticImageData;
  text: string;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  image: StaticImageData;
}

const MessagePage = () => {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Jennifer Markus",
      senderImg: AboutImg2,
      text: "Hey! Did you finish the Hi-fi wireframes for flora app design?",
      time: "Today | 05:30 PM",
    },
    {
      id: 2,
      sender: "Jennifer Markus",
      senderImg: AboutImg2,
      text: "Gee, its been good news all day. I met someone special today, she's really pretty. I'd like to talk more about it but it has to be tomorrow, she should grab a drink later.",
      time: "Today | 05:30 PM",
    },
  ]);

  const chatList: Chat[] = [
    {
      id: 1,
      name: "Jennifer Markus",
      message: "Hey! Did you finish the Hi-fi wireframes for flora app design?",
      time: "Today | 05:30 PM",
      image: BannerImg,
    },
    {
      id: 2,
      name: "Jessica Brown",
      message: "Just completed a challenging task. Proud of the outcome.",
      time: "1 min",
      image: DummyProfile,
    },
    {
      id: 3,
      name: "Michael Johnson",
      message:
        "I had a great meeting today. The new project looks promising. Looking forward to working on it.",
      time: "3 min",
      image: DummyProfile,
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 4,
      name: `User ${i + 1}`,
      message:
        "This is a sample message to demonstrate scrolling functionality",
      time: "5 min",
      image: DummyProfile,
    })),
  ];

  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          senderImg: DummyProfile,
          text: inputMessage,
          time: "Just now",
        },
      ]);
      setInputMessage("");
    }
  };

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };
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
    <div className="max-w-7xl mx-auto h-screen bg-gray-50 mb-20 px-4">
      <ul className="flex items-center gap-2 text-sm my-8">
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
      <div className="md:hidden bg-white p-4 flex items-center gap-4 border-b border-gray">
        <button onClick={() => setSelectedChat(null)}>
          <ArrowLeft width={24} height={24} />
        </button>
        <h1 className="text-lg font-semibold">Messages</h1>
      </div>

      <div className="bg-white border border-gray rounded-2xl h-[calc(100vh-10px)]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`w-full md:w-1/3 border-r border-gray flex flex-col ${
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
                  altText="Search Icon"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div>
                {chatList.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className="flex gap-3 items-center p-3 h-32 hover:bg-gray50 border-b border-gray cursor-pointer px-6"
                  >
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={chat.image}
                        alt={chat.name}
                        className="rounded-full object-cover"
                        fill
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{chat.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-2">
                        {chat.message}
                      </p>

                      <p className="text-sm text-normal mt-2 flex gap-1 items-center">
                        <ClockIcon />
                        {chat.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div
            className={`w-full md:w-2/3 flex flex-col ${
              !selectedChat ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="p-4 border-b border-gray flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ProfileImage
                  src={DummyProfile}
                  alt="My Image"
                  size="md"
                  active
                />
                <h2 className="text-lg font-bold">Jennifer Markus</h2>
              </div>
              <button className="text-sm text-primary">Block</button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-center justify-start`}>
                  {msg.sender !== "You" ? (
                    <ProfileImage
                      src={msg.senderImg}
                      alt="sender Image"
                      size="md"
                      active
                    />
                  ) : (
                    <div className="w-10 h-10 relative flex-shrink-0">
                      <Image
                        src={msg.senderImg}
                        alt="Jennifer Markus"
                        className="rounded-full object-cover"
                        fill
                      />
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl max-w-full`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-2 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray">
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-20 right-4"
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
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
