import React from "react";
import ChatBot from "react-simple-chatbot";

const steps = [
  {
    id: 'welcome',
    message: 'أهلاً، أنا الدكتور. إزاي أقدر أساعدك يا بطل؟',
    trigger: 'user-choice',
  },
  {
    id: 'user-choice',
    options: [
      { value: 'speech', label: 'عندي مشكلة في النطق', trigger: 'speech-help' },
      { value: 'sound', label: 'مش بسمع كويس', trigger: 'sound-help' },
      { value: 'more', label: 'عايز أتكلم مع الدكتور', trigger: 'end-chat' },
      { value: 'other', label: 'لدي مشكلة أخرى', trigger: 'free-input' },
    ],
  },
  {
    id: 'free-input',
    message: 'اكتب مشكلتك هنا وسأساعدك قدر المستطاع:',
    trigger: 'user-input',
  },
  {
    id: 'user-input',
    user: true,
    trigger: 'process-input',
  },
  {
    id: 'process-input',
    message: 'شكراً لتوضيح مشكلتك. سنحاول مساعدتك في أقرب وقت ممكن!',
    end: true,
  },
  {
    id: 'speech-help',
    message: 'ممكن تحكيلي إيه الأصوات اللي صعب تقولها؟',
    trigger: 'speech-response',
  },
  {
    id: 'speech-response',
    user: true,
    trigger: 'speech-thanks',
  },
  {
    id: 'speech-thanks',
    message: 'شكراً لمشاركتك، هحاول أساعدك قدر الإمكان 😊',
    end: true,
  },
  {
    id: 'sound-help',
    message: 'هل بتسمع الأصوات القريبة ولا البعيدة؟',
    trigger: 'sound-response',
  },
  {
    id: 'sound-response',
    user: true,
    trigger: 'sound-thanks',
  },
  {
    id: 'sound-thanks',
    message: 'تمام، شكراً للتوضيح، هنساعدك إن شاء الله 👂',
    end: true,
  },
  {
    id: 'end-chat',
    message: 'تمام، هنكلم الدكتور وهيتواصل معاك قريبًا 👨‍⚕️',
    end: true,
  },
];

const Chat = () => (
  <div className="container d-flex align-items-center flex-column">
    <h3 className="mb-3 text-primary">المساعد الذكي👨‍⚕️🧒</h3>
    <div className="chatbot-container">
      <ChatBot
        steps={steps}
        botAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        userAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712034.png"
        placeholder="اكتب هنا..."
        headerTitle="المساعد الذكي"
        floating={false}
        style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  </div>
);

export default Chat;