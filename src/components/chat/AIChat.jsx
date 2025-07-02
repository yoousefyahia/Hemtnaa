import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import '../../styles/AIChat.css';

// Chatbot theme configuration
const theme = {
  background: '#fff',
  fontFamily: 'Cairo, sans-serif',
  headerBgColor: '#0d6efd',
  headerFontColor: '#fff',
  headerFontSize: '1rem',
  botBubbleColor: '#f1f3f5',
  botFontColor: '#333',
  userBubbleColor: '#0d6efd',
  userFontColor: '#fff',
};

const steps = [
  // --- Welcome & Main Menu ---
  {
    id: 'welcome',
    message: 'أهلاً بك في المساعد الذكي! كيف يمكنني مساعدتك اليوم؟',
    trigger: 'main-options',
  },
  {
    id: 'main-options',
    options: [
      { value: 'disorders', label: 'معلومات عن اضطرابات التخاطب', trigger: 'disorders-menu' },
      { value: 'autism', label: 'معلومات عن طيف التوحد', trigger: 'autism-intro' },
      { value: 'speech', label: 'لدي مشكلة حالية في النطق', trigger: 'speech-help' },
      { value: 'sound', label: 'لدي مشكلة حالية في السمع', trigger: 'sound-help' },
      { value: 'other', label: 'لدي استفسار آخر', trigger: 'free-input' },
    ],
  },
  // --- Free Input Branch ---
  {
    id: 'free-input',
    message: 'اكتب استفسارك هنا وسأحاول المساعدة.',
    trigger: 'user-input',
  },
  {
    id: 'user-input',
    user: true,
    trigger: 'end-message-other-query',
  },
  {
    id: 'end-message-other-query',
    message: 'شكراً لك، تم تسجيل استفسارك وسيقوم الدكتور بالرد عليك في أقرب وقت ممكن.',
    trigger: 'end-or-menu',
  },
  
  // --- Speech Disorders Info Branch ---
  {
    id: 'disorders-menu',
    message: 'عن أي من اضطرابات التخاطب التالية تود أن تعرف المزيد؟',
    trigger: 'disorders-options',
  },
  {
    id: 'disorders-options',
    options: [
      { value: 'language-delay', label: 'تأخر نمو اللغة', trigger: 'language-delay-info' },
      { value: 'articulation', label: 'اضطرابات النطق (إبدال الحروف)', trigger: 'articulation-info' },
      { value: 'stuttering', label: 'التأتأة (التهتهة)', trigger: 'stuttering-info' },
      { value: 'main-menu', label: 'العودة للقائمة الرئيسية', trigger: 'main-options' },
    ]
  },
  {
    id: 'language-delay-info',
    message: 'تأخر نمو اللغة يعني أن مهارات الطفل اللغوية تتطور أبطأ من أقرانه. من علاماته:\n- عمر سنة ونصف: لا يقول كلمات بسيطة مثل "ماما" أو "بابا".\n- عمر سنتين: لا يكون حصيلته 20-50 كلمة.\n- عمر 3 سنوات: لا يكون جملة من كلمتين أو ثلاث.\n- صعوبة في فهم التعليمات البسيطة.',
    trigger: 'disorders-after-info',
  },
  {
    id: 'articulation-info',
    message: 'اضطرابات النطق (اللدغات) هي صعوبة في نطق أصوات الحروف بشكل صحيح. من علاماتها:\n- حذف بعض الحروف (يقول "ساعة" بدلاً من "سباحة").\n- إبدال حرف بحرف آخر (يقول "تتاب" بدلاً من "كتاب").\n- تشويه صوت الحرف بحيث يكون غير واضح (نطق السين ثاءً مثلاً).',
    trigger: 'disorders-after-info',
  },
  {
    id: 'stuttering-info',
    message: 'التأتأة هي اضطراب في fluidez (طلاقة) الكلام. من علاماتها:\n- تكرار الأصوات أو الكلمات (مثال: "أ-أ-أنا أريد").\n- إطالة بعض الأصوات (مثال: "مممممممممكن").\n- توقف كامل ومفاجئ أثناء الكلام.',
    trigger: 'disorders-after-info',
  },
  {
    id: 'disorders-after-info',
    message: 'ملاحظة هامة: هذه المعلومات هي إرشادية فقط ولا تغني عن التقييم الدقيق من قبل أخصائي التخاطب.\n\nهل تود معرفة المزيد عن اضطراب آخر؟',
    trigger: 'disorders-after-info-options',
  },
  {
    id: 'disorders-after-info-options',
    options: [
      { value: 'more-disorders', label: 'نعم، اختر اضطراباً آخر', trigger: 'disorders-menu' },
      { value: 'main-menu', label: 'العودة للقائمة الرئيسية', trigger: 'main-options' },
      { value: 'end', label: 'لا، شكراً لك', trigger: 'end-message-friendly' },
    ]
  },

  // --- Autism Branch ---
  {
    id: 'autism-intro',
    message: 'اضطراب طيف التوحد هو حالة ترتبط بنمو الدماغ وتؤثر على كيفية تواصل الشخص وتفاعله مع الآخرين. هل تود معرفة المزيد عن الأعراض؟',
    trigger: 'autism-options-1',
  },
  {
    id: 'autism-options-1',
    options: [
      { value: 'yes-symptoms', label: 'نعم، أخبرني عن الأعراض', trigger: 'autism-symptoms' },
      { value: 'no-thanks', label: 'لا، شكراً', trigger: 'end-message-friendly' },
    ],
  },
  {
    id: 'autism-symptoms',
    message: 'تختلف الأعراض من شخص لآخر، ولكنها تشمل بشكل عام صعوبات في التواصل الاجتماعي، وسلوكيات متكررة، واهتمامات محدودة. مثلاً، قد يجد الطفل صعوبة في بدء محادثة أو فهم الإشارات الاجتماعية.',
    trigger: 'autism-options-2',
  },
  {
    id: 'autism-options-2',
    options: [
        { value: 'more-info', label: 'ماذا يمكنني أن أفعل؟', trigger: 'autism-advice' },
        { value: 'main-menu', label: 'العودة للقائمة الرئيسية', trigger: 'main-options' },
    ]
  },
  {
      id: 'autism-advice',
      message: 'التشخيص والتدخل المبكر مهمان جداً. يُنصح بالتحدث مع طبيب أطفال أو أخصائي نفسي. العلاج السلوكي وتدريب المهارات الاجتماعية يمكن أن يساعدا بشكل كبير. تذكر، الدعم والتفهم من الأسرة هو أهم شيء.',
      trigger: 'autism-end'
  },
  {
      id: 'autism-end',
      options: [
        { value: 'main-menu', label: 'العودة للقائمة الرئيسية', trigger: 'main-options' },
        { value: 'end', label: 'إنهاء المحادثة', trigger: 'end-message-friendly' },
      ]
  },

  // --- Speech Problems Branch (Existing) ---
  {
    id: 'speech-help',
    message: 'هل تواجه صعوبة في نطق بعض الحروف أو الأصوات؟',
    trigger: 'speech-response',
  },
  {
    id: 'speech-response',
    options: [
      { value: 'difficulty', label: 'نعم، عندي صعوبة', trigger: 'speech-difficulty' },
      { value: 'no-difficulty', label: 'لا، لا أواجه صعوبة', trigger: 'main-options' },
    ],
  },
  {
    id: 'speech-difficulty',
    message: 'إذا كنت تجد صعوبة في نطق بعض الحروف، فقد تكون هذه مشكلة تحتاج إلى تمرين. إليك بعض النصائح: \n1. حاول التحدث ببطء ووضوح. \n2. تمرن على نطق الحروف تدريجيًا. \n3. استشر أخصائي نطق للحصول على مساعدة متخصصة.',
    trigger: 'end-or-menu',
  },

  // --- Hearing Problems Branch (Existing) ---
  {
    id: 'sound-help',
    message: 'هل تواجه صعوبة في سماع الأصوات؟',
    trigger: 'sound-response',
  },
  {
    id: 'sound-response',
    options: [
      { value: 'yes-sound', label: 'نعم، أواجه صعوبة', trigger: 'sound-details' },
      { value: 'no-sound', label: 'لا، لا أواجه صعوبة', trigger: 'main-options' },
    ],
  },
  {
      id: 'sound-details',
      message: 'ضعف السمع له أسباب عديدة. من المهم زيارة طبيب أنف وأذن وحنجرة لعمل فحص دقيق وتحديد السبب والعلاج المناسب.',
      trigger: 'end-or-menu'
  },
  
  // --- Endings and Loops ---
  {
    id: 'end-or-menu',
    message: 'هل يمكنني مساعدتك بشيء آخر؟',
    trigger: 'end-or-menu-options'
  },
  {
    id: 'end-or-menu-options',
    options: [
        { value: 'main-menu', label: 'نعم، عد للقائمة الرئيسية', trigger: 'main-options' },
        { value: 'end', label: 'لا، شكراً لك', trigger: 'end-message-friendly' },
    ]
  },
  {
    id: 'end-message',
    message: 'شكراً لاستخدامك المساعد الذكي. إذا احتجت أي مساعدة في المستقبل، فلا تتردد في التواصل معنا!',
    end: true,
  },
  {
    id: 'end-message-friendly',
    message: 'على الرحب والسعة! أتمنى لك يوماً سعيداً 😊',
    end: true,
  }
];

const AIChat = () => (
  <ThemeProvider theme={theme}>
    <div className="ai-chat-container">
      <h3 className="ai-chat-header">المساعد الذكي 🤖</h3>
      <ChatBot
        steps={steps}
        botAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        userAvatar="https://cdn-icons-png.flaticon.com/512/4712/4712034.png"
        placeholder="اكتب رسالتك..."
        headerTitle="المساعد الذكي"
        floating={false}
        width="100%"
        // Overwriting styles directly for better control
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        contentStyle={{ padding: '0px' }}
        bubbleOptionStyle={{
            backgroundColor: '#fff',
            color: '#0d6efd',
            border: '1px solid #0d6efd',
        }}
      />
    </div>
  </ThemeProvider>
);

export default AIChat;
