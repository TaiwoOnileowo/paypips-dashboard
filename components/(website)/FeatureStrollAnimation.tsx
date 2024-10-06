
"use client";
import React, { useState, useEffect, useRef } from "react";
const FeatureStrollAnimation = () => {
  const [chatAnimation, setChatAnimation] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
    step10: false,
    step11: false,
  });
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const startAnimation = () => {
    clearTimeouts();
    setChatAnimation({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false,
      step9: false,
      step10: false,
      step11: false,
    });
    for (let i = 1; i <= 11; i++) {
      timeouts.current.push(
        setTimeout(
          () => setChatAnimation((prev) => ({ ...prev, [`step${i}`]: true })),
          i * 1000
        )
      );
    }
  };

  const chatBoxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(startAnimation, 1000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (chatBoxRef.current) {
      observer.observe(chatBoxRef.current);
    }

    return () => {
      clearTimeouts();
      if (chatBoxRef.current) {
        observer.unobserve(chatBoxRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    startAnimation();
  };

  return (
    <div
      ref={chatBoxRef}
      className="h-[550px] text-xs xs:text-sm z-[10] xsm:w-[400px] w-full md:w-[500px] flex flex-col justify-end bg-accent-bg chat-box p-2 xsm:p-6 rounded-lg shadow-lg xsm:mt-12"
      onMouseEnter={handleMouseEnter}
    >
      <div className="start-message message-sender ">
        <span>Hey</span>
      </div>
      <div
        className={`message message-sender ${
          chatAnimation.step1 ? "show" : ""
        }`}
      >
        <span>What extra stuff can Paypips bot do?</span>
      </div>

      <div
        className={`message message-bot ${chatAnimation.step2 ? "show" : ""}`}
      >
        <span>It can send broadcasts</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step3 ? "show" : ""}`}
      >
        <span>Send invite links.</span>
      </div>

      <div
        className={`message message-bot ${chatAnimation.step5 ? "show" : ""}`}
      >
        <span>Chat with your subscribers</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step6 ? "show" : ""}`}
      >
        <span>Run an affiliate program</span>
      </div>
      <div
        className={`message message-sender ${
          chatAnimation.step7 ? "show" : ""
        }`}
      >
        <span>This is nice!</span>
      </div>

      <div
        className={`message message-bot ${chatAnimation.step8 ? "show" : ""}`}
      >
        <span>That's not all</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step9 ? "show" : ""}`}
      >
        <span>Still with Paypips bot, you have:</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step10 ? "show" : ""}`}
      >
        <span> Complete financial control</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step11 ? "show" : ""}`}
      >
        <span> More payment options</span>
      </div>
      <div
        className={`message message-bot ${chatAnimation.step11 ? "show" : ""}`}
      >
        <span>And you can auto add and remove users</span>
      </div>
    </div>
  );
};

export default FeatureStrollAnimation;
