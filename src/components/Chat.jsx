import React, { useState } from "react";
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

  // مشاكل النطق
  {
    id: 'speech-help',
    message: 'هل تواجه صعوبة في نطق بعض الحروف أو الأصوات؟ في بعض الأحيان، يكون من الصعب على بعض الأشخاص نطق الحروف بشكل واضح.',
    trigger: 'speech-response',
  },
  {
    id: 'speech-response',
    options: [
      { value: 'difficulty', label: 'نعم، عندي صعوبة في نطق بعض الحروف', trigger: 'speech-difficulty' },
      { value: 'no-difficulty', label: 'لا، مفيش صعوبة', trigger: 'speech-thanks' },
    ],
  },
  {
    id: 'speech-difficulty',
    message: 'إذا كنت تجد صعوبة في نطق بعض الحروف، قد تكون هذه مشكلة تحتاج إلى تمرين مستمر. إليك بعض النصائح: \n1. حاول التحدث ببطء ووضوح. \n2. تمرن على نطق الحروف تدريجيًا باستخدام مقاطع صوتية. \n3. استشر أخصائي نطق لتحسين النطق بشكل أكبر.',
    trigger: 'speech-thanks',
  },
  {
    id: 'speech-thanks',
    message: 'شكراً لمشاركتك، هحاول أساعدك قدر الإمكان 😊',
    end: true,
  },

  // مشاكل السمع
  {
    id: 'sound-help',
    message: 'هل تواجه صعوبة في سماع الأصوات؟ بعض الأشخاص يواجهون صعوبة في سماع الأصوات في بيئات هادئة أو صاخبة.',
    trigger: 'sound-response',
  },
  {
    id: 'sound-response',
    options: [
      { value: 'quiet-places', label: 'أسمع في الأماكن الهادئة فقط', trigger: 'sound-quiet' },
      { value: 'noisy-places', label: 'أسمع في الأماكن الصاخبة فقط', trigger: 'sound-noisy' },
      { value: 'both', label: 'أسمع في كل الأماكن', trigger: 'sound-thanks' },
    ],
  },
  {
    id: 'sound-quiet',
    message: 'إذا كانت لديك صعوبة في السمع في الأماكن الهادئة، فقد يكون السبب هو ضعف السمع العام. يُفضل زيارة طبيب الأذن لإجراء فحص سمعي. بعض الحلول التي قد تساعد: \n1. تجنب البيئات الصاخبة. \n2. استخدام أجهزة سمعية لتحسين السمع.',
    trigger: 'sound-thanks',
  },
  {
    id: 'sound-noisy',
    message: 'إذا كانت المشكلة في الأماكن الصاخبة، قد تكون لديك صعوبة في التمييز بين الأصوات في بيئات مزدحمة. يمكنك محاولة:\n1. التواجد في أماكن أقل صخبًا.\n2. استخدام سماعات لتقليل الضوضاء.\n3. زيارة طبيب الأذن للتأكد من سبب المشكلة.',
    trigger: 'sound-thanks',
  },
  {
    id: 'sound-thanks',
    message: 'تمام، شكراً للتوضيح، هنساعدك إن شاء الله 👂',
    end: true,
  },

  // مشاكل أخرى
  {
    id: 'other',
    message: 'هل تواجه أي مشكلة أخرى؟ مثل حساسية الطعام أو ألم مستمر؟ هذه المشاكل أيضًا تحتاج إلى فحص دقيق.',
    trigger: 'other-input',
  },
  {
    id: 'other-input',
    message: 'هل تعاني من حساسية من بعض الأطعمة أو مواد معينة؟ أو هل تشعر بألم مستمر؟ هذه المشاكل تحتاج إلى رعاية طبية خاصة.',
    trigger: 'other-response',
  },
  {
    id: 'other-response',
    options: [
      { value: 'sensitivity', label: 'نعم، لدي حساسية', trigger: 'sensitivity' },
      { value: 'pain', label: 'نعم، أشعر بألم مستمر', trigger: 'pain' },
      { value: 'no', label: 'لا، ليس لدي مشكلة حالياً', trigger: 'end-chat' },
    ],
  },
  {
    id: 'sensitivity',
    message: 'إذا كنت تعاني من حساسية، يُفضل تجنب المواد التي تسبب لك الحساسية. يمكنك زيارة طبيب مختص لتحديد السبب ومعرفة كيفية التعامل مع الحساسية.',
    trigger: 'end-chat',
  },
  {
    id: 'pain',
    message: 'إذا كنت تشعر بألم مستمر، يجب أن تستشير طبيبًا في أقرب وقت لإجراء فحوصات طبية. الألم المستمر قد يكون إشارة إلى مشكلة صحية تحتاج إلى تشخيص دقيق.',
    trigger: 'end-chat',
  },
  {
    id: 'end-chat',
    message: 'تمام، هنكلم الدكتور وهيتواصل معاك قريبًا 👨‍⚕️',
    end: true,
  },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState("doctor");

  return (
    <div className="container d-flex flex-column align-items-center my-5 py-5">
      <div className="d-flex justify-content-between gap-4 mb-4" style={{ width: '100%', maxWidth: '400px' }}>
        {/* زر الدكتور */}
        <button
          className={`btn w-50 ${activeTab === "doctor" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("doctor")}
        >
          تحدث مع الدكتور
        </button>

        {/* زر AI */}
        <button
          className={`btn w-50 ${activeTab === "ai" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("ai")}
        >
          المساعد الذكي
        </button>
      </div>

      {/* محتوى حسب الزر النشط */}
      {activeTab === "doctor" && (
        <div className="text-center mt-4">
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#555" }}>
            سيتم الرد عند توفر الطبيب المختص
          </p>
        </div>
      )}

      {activeTab === "ai" && (
        <>
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
                maxWidth: "400px",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
