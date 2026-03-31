export type Language = 
  | 'English' | 'Hindi' | 'Bengali' | 'Telugu' | 'Marathi'
  | 'Tamil' | 'Gujarati' | 'Kannada' | 'Odia' | 'Malayalam'
  | 'Punjabi' | 'Assamese' | 'Maithili' | 'Sanskrit' | 'Urdu'
  | 'Konkani' | 'Sindhi' | 'Dogri' | 'Kashmiri' | 'Manipuri'
  | 'Bodo' | 'Santali';

export type UIStrings = {
  home: string;
  learn: string;
  practice: string;
  village: string;
  profile: string;
  askQuestion: string;
  aiReady: string;
  loadingAI: string;
  todayChallenge: string;
  continueLearn: string;
  chooseSubject: string;
  startLesson: string;
  yourProgress: string;
  settings: string;
  language: string;
  grade: string;
  greeting: string;
  selectLanguage: string;
  selectGrade: string;
  offlineTutor: string;
  checkAnswer: string;
  correct: string;
  wrong: string;
  nextQuestion: string;
  score: string;
  topics: string;
  minutes: string;
  easy: string;
  medium: string;
  hard: string;
};

export const TRANSLATIONS: Record<Language, UIStrings> = {
  English: {
    home: 'Home', learn: 'Learn', practice: 'Practice', village: 'Village', profile: 'Profile',
    askQuestion: 'Ask your question...', aiReady: '🧠 On-device AI ready', loadingAI: '⚡ Loading AI model...',
    todayChallenge: "Today's Challenge", continueLearn: 'Continue Learning', chooseSubject: 'Choose a Subject',
    startLesson: 'Start', yourProgress: 'Your Progress', settings: 'Settings', language: 'Language',
    grade: 'Grade', greeting: 'Namaste! 👋', selectLanguage: 'Select Language', selectGrade: 'Select Your Grade',
    offlineTutor: 'AI Tutor • Offline', checkAnswer: 'Check Answer', correct: '✅ Correct!',
    wrong: '❌ Wrong', nextQuestion: 'Next', score: 'Score', topics: 'Topics',
    minutes: 'min', easy: 'Easy', medium: 'Medium', hard: 'Hard',
  },
  Hindi: {
    home: 'होम', learn: 'सीखो', practice: 'अभ्यास', village: 'गाँव', profile: 'प्रोफाइल',
    askQuestion: 'अपना सवाल पूछें...', aiReady: '🧠 AI तैयार है', loadingAI: '⚡ AI लोड हो रहा है...',
    todayChallenge: 'आज की चुनौती', continueLearn: 'सीखना जारी रखें', chooseSubject: 'विषय चुनें',
    startLesson: 'शुरू करें', yourProgress: 'आपकी प्रगति', settings: 'सेटिंग्स', language: 'भाषा',
    grade: 'कक्षा', greeting: 'नमस्ते! 👋', selectLanguage: 'भाषा चुनें', selectGrade: 'अपनी कक्षा चुनें',
    offlineTutor: 'AI शिक्षक • ऑफलाइन', checkAnswer: 'जवाब देखें', correct: '✅ सही!',
    wrong: '❌ गलत', nextQuestion: 'आगे', score: 'अंक', topics: 'विषय',
    minutes: 'मिनट', easy: 'आसान', medium: 'मध्यम', hard: 'कठिन',
  },
  Bengali: {
    home: 'হোম', learn: 'শিখুন', practice: 'অনুশীলন', village: 'গ্রাম', profile: 'প্রোফাইল',
    askQuestion: 'আপনার প্রশ্ন জিজ্ঞাসা করুন...', aiReady: '🧠 AI প্রস্তুত', loadingAI: '⚡ AI লোড হচ্ছে...',
    todayChallenge: 'আজকের চ্যালেঞ্জ', continueLearn: 'শেখা চালিয়ে যান', chooseSubject: 'বিষয় বেছে নিন',
    startLesson: 'শুরু', yourProgress: 'আপনার অগ্রগতি', settings: 'সেটিংস', language: 'ভাষা',
    grade: 'শ্রেণী', greeting: 'নমস্কার! 👋', selectLanguage: 'ভাষা নির্বাচন করুন', selectGrade: 'আপনার শ্রেণী নির্বাচন করুন',
    offlineTutor: 'AI শিক্ষক • অফলাইন', checkAnswer: 'উত্তর দেখুন', correct: '✅ সঠিক!',
    wrong: '❌ ভুল', nextQuestion: 'পরবর্তী', score: 'স্কোর', topics: 'বিষয়',
    minutes: 'মিনিট', easy: 'সহজ', medium: 'মাঝারি', hard: 'কঠিন',
  },
  Telugu: {
    home: 'హోమ్', learn: 'నేర్చుకోండి', practice: 'సాధన', village: 'గ్రామం', profile: 'ప్రొఫైల్',
    askQuestion: 'మీ ప్రశ్న అడగండి...', aiReady: '🧠 AI సిద్ధంగా ఉంది', loadingAI: '⚡ AI లోడ్ అవుతోంది...',
    todayChallenge: 'నేటి సవాల్', continueLearn: 'నేర్చుకోవడం కొనసాగించండి', chooseSubject: 'విషయం ఎంచుకోండి',
    startLesson: 'ప్రారంభించు', yourProgress: 'మీ పురోగతి', settings: 'సెట్టింగులు', language: 'భాష',
    grade: 'తరగతి', greeting: 'నమస్కారం! 👋', selectLanguage: 'భాష ఎంచుకోండి', selectGrade: 'మీ తరగతి ఎంచుకోండి',
    offlineTutor: 'AI టీచర్ • ఆఫ్‌లైన్', checkAnswer: 'సమాధానం చూడండి', correct: '✅ సరైనది!',
    wrong: '❌ తప్పు', nextQuestion: 'తదుపరి', score: 'స్కోర్', topics: 'అంశాలు',
    minutes: 'నిమిషాలు', easy: 'సులభం', medium: 'మధ్యస్థం', hard: 'కఠినం',
  },
  Marathi: {
    home: 'होम', learn: 'शिका', practice: 'सराव', village: 'गाव', profile: 'प्रोफाइल',
    askQuestion: 'तुमचा प्रश्न विचारा...', aiReady: '🧠 AI तयार आहे', loadingAI: '⚡ AI लोड होत आहे...',
    todayChallenge: 'आजचे आव्हान', continueLearn: 'शिकणे सुरू ठेवा', chooseSubject: 'विषय निवडा',
    startLesson: 'सुरू करा', yourProgress: 'तुमची प्रगती', settings: 'सेटिंग्ज', language: 'भाषा',
    grade: 'इयत्ता', greeting: 'नमस्कार! 👋', selectLanguage: 'भाषा निवडा', selectGrade: 'तुमची इयत्ता निवडा',
    offlineTutor: 'AI शिक्षक • ऑफलाइन', checkAnswer: 'उत्तर पहा', correct: '✅ बरोबर!',
    wrong: '❌ चुकीचे', nextQuestion: 'पुढे', score: 'गुण', topics: 'विषय',
    minutes: 'मिनिटे', easy: 'सोपे', medium: 'मध्यम', hard: 'कठीण',
  },
  Tamil: {
    home: 'முகப்பு', learn: 'கற்றுக்கொள்', practice: 'பயிற்சி', village: 'கிராமம்', profile: 'சுயவிவரம்',
    askQuestion: 'உங்கள் கேள்வியை கேளுங்கள்...', aiReady: '🧠 AI தயார்', loadingAI: '⚡ AI ஏற்றுகிறது...',
    todayChallenge: 'இன்றைய சவால்', continueLearn: 'கற்றுக்கொள்வதை தொடருங்கள்', chooseSubject: 'பாடத்தை தேர்ந்தெடுக்கவும்',
    startLesson: 'தொடங்கு', yourProgress: 'உங்கள் முன்னேற்றம்', settings: 'அமைப்புகள்', language: 'மொழி',
    grade: 'வகுப்பு', greeting: 'வணக்கம்! 👋', selectLanguage: 'மொழியை தேர்ந்தெடுக்கவும்', selectGrade: 'உங்கள் வகுப்பை தேர்ந்தெடுக்கவும்',
    offlineTutor: 'AI ஆசிரியர் • ஆஃப்லைன்', checkAnswer: 'விடையை பாருங்கள்', correct: '✅ சரி!',
    wrong: '❌ தவறு', nextQuestion: 'அடுத்து', score: 'மதிப்பெண்', topics: 'தலைப்புகள்',
    minutes: 'நிமிடங்கள்', easy: 'எளிது', medium: 'நடுத்தரம்', hard: 'கடினம்',
  },
  Gujarati: {
    home: 'હોમ', learn: 'શીખો', practice: 'અભ્યાસ', village: 'ગામ', profile: 'પ્રોફાઇલ',
    askQuestion: 'તમારો પ્રશ્ન પૂછો...', aiReady: '🧠 AI તૈયાર છે', loadingAI: '⚡ AI લોડ થઈ રહ્યું છે...',
    todayChallenge: 'આજનો પડકાર', continueLearn: 'શીખવાનું ચાલુ રાખો', chooseSubject: 'વિષય પસંદ કરો',
    startLesson: 'શરૂ કરો', yourProgress: 'તમારી પ્રગતિ', settings: 'સેટિંગ્સ', language: 'ભાષા',
    grade: 'ધોરણ', greeting: 'નમસ્તે! 👋', selectLanguage: 'ભાષા પસંદ કરો', selectGrade: 'તમારું ધોરણ પસંદ કરો',
    offlineTutor: 'AI શિક્ષક • ઓફલાઇન', checkAnswer: 'જવાબ જુઓ', correct: '✅ સાચો!',
    wrong: '❌ ખોટો', nextQuestion: 'આગળ', score: 'ગુણ', topics: 'વિષયો',
    minutes: 'મિનિટ', easy: 'સહેલો', medium: 'મધ્યમ', hard: 'કઠિન',
  },
  Kannada: {
    home: 'ಮನೆ', learn: 'ಕಲಿಯಿರಿ', practice: 'ಅಭ್ಯಾಸ', village: 'ಹಳ್ಳಿ', profile: 'ಪ್ರೊಫೈಲ್',
    askQuestion: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಕೇಳಿ...', aiReady: '🧠 AI ಸಿದ್ಧ', loadingAI: '⚡ AI ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    todayChallenge: 'ಇಂದಿನ ಸವಾಲು', continueLearn: 'ಕಲಿಯುವುದನ್ನು ಮುಂದುವರಿಸಿ', chooseSubject: 'ವಿಷಯ ಆಯ್ಕೆ ಮಾಡಿ',
    startLesson: 'ಪ್ರಾರಂಭಿಸಿ', yourProgress: 'ನಿಮ್ಮ ಪ್ರಗತಿ', settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', language: 'ಭಾಷೆ',
    grade: 'ತರಗತಿ', greeting: 'ನಮಸ್ಕಾರ! 👋', selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ', selectGrade: 'ನಿಮ್ಮ ತರಗತಿ ಆಯ್ಕೆ ಮಾಡಿ',
    offlineTutor: 'AI ಶಿಕ್ಷಕ • ಆಫ್‌ಲೈನ್', checkAnswer: 'ಉತ್ತರ ನೋಡಿ', correct: '✅ ಸರಿ!',
    wrong: '❌ ತಪ್ಪು', nextQuestion: 'ಮುಂದೆ', score: 'ಅಂಕ', topics: 'ವಿಷಯಗಳು',
    minutes: 'ನಿಮಿಷ', easy: 'ಸುಲಭ', medium: 'ಮಧ್ಯಮ', hard: 'ಕಠಿಣ',
  },
  Odia: {
    home: 'ହୋମ', learn: 'ଶିଖନ୍ତୁ', practice: 'ଅଭ୍ୟାସ', village: 'ଗ୍ରାମ', profile: 'ପ୍ରୋଫାଇଲ',
    askQuestion: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...', aiReady: '🧠 AI ପ୍ରସ୍ତୁତ', loadingAI: '⚡ AI ଲୋଡ ହେଉଛି...',
    todayChallenge: 'ଆଜର ଆହ୍ୱାନ', continueLearn: 'ଶିଖନ୍ତୁ', chooseSubject: 'ବିଷୟ ବାଛନ୍ତୁ',
    startLesson: 'ଆରମ୍ଭ', yourProgress: 'ଆପଣଙ୍କ ଅଗ୍ରଗତି', settings: 'ସେଟିଂ', language: 'ଭାଷା',
    grade: 'ଶ୍ରେଣୀ', greeting: 'ନମସ୍କାର! 👋', selectLanguage: 'ଭାଷା ବାଛନ୍ତୁ', selectGrade: 'ଆପଣଙ୍କ ଶ୍ରେଣୀ ବାଛନ୍ତୁ',
    offlineTutor: 'AI ଶିକ୍ଷକ • ଅଫଲାଇନ', checkAnswer: 'ଉତ୍ତର ଦେଖନ୍ତୁ', correct: '✅ ସଠିକ!',
    wrong: '❌ ଭୁଲ', nextQuestion: 'ପରବର୍ତ୍ତୀ', score: 'ସ୍କୋର', topics: 'ବିଷୟ',
    minutes: 'ମିନିଟ', easy: 'ସହଜ', medium: 'ମଧ୍ୟମ', hard: 'କଠିନ',
  },
  Malayalam: {
    home: 'ഹോം', learn: 'പഠിക്കൂ', practice: 'പ്രാക്ടീസ്', village: 'ഗ്രാമം', profile: 'പ്രൊഫൈൽ',
    askQuestion: 'നിങ്ങളുടെ ചോദ്യം ചോദിക്കൂ...', aiReady: '🧠 AI തയ്യാർ', loadingAI: '⚡ AI ലോഡ് ആകുന്നു...',
    todayChallenge: 'ഇന്നത്തെ വെല്ലുവിളി', continueLearn: 'പഠനം തുടരൂ', chooseSubject: 'വിഷയം തിരഞ്ഞെടുക്കൂ',
    startLesson: 'തുടങ്ങൂ', yourProgress: 'നിങ്ങളുടെ പുരോഗതി', settings: 'ക്രമീകരണങ്ങൾ', language: 'ഭാഷ',
    grade: 'ക്ലാസ്', greeting: 'നമസ്കാരം! 👋', selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കൂ', selectGrade: 'നിങ്ങളുടെ ക്ലാസ് തിരഞ്ഞെടുക്കൂ',
    offlineTutor: 'AI അദ്ധ്യാപകൻ • ഓഫ്‌ലൈൻ', checkAnswer: 'ഉത്തരം കാണൂ', correct: '✅ ശരി!',
    wrong: '❌ തെറ്റ്', nextQuestion: 'അടുത്തത്', score: 'സ്കോർ', topics: 'വിഷയങ്ങൾ',
    minutes: 'മിനിറ്റ്', easy: 'എളുപ്പം', medium: 'ഇടത്തരം', hard: 'കഠിനം',
  },
  Punjabi: {
    home: 'ਹੋਮ', learn: 'ਸਿੱਖੋ', practice: 'ਅਭਿਆਸ', village: 'ਪਿੰਡ', profile: 'ਪ੍ਰੋਫਾਈਲ',
    askQuestion: 'ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ...', aiReady: '🧠 AI ਤਿਆਰ ਹੈ', loadingAI: '⚡ AI ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    todayChallenge: 'ਅੱਜ ਦੀ ਚੁਣੌਤੀ', continueLearn: 'ਸਿੱਖਣਾ ਜਾਰੀ ਰੱਖੋ', chooseSubject: 'ਵਿਸ਼ਾ ਚੁਣੋ',
    startLesson: 'ਸ਼ੁਰੂ ਕਰੋ', yourProgress: 'ਤੁਹਾਡੀ ਤਰੱਕੀ', settings: 'ਸੈਟਿੰਗਾਂ', language: 'ਭਾਸ਼ਾ',
    grade: 'ਕਲਾਸ', greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! 👋', selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ', selectGrade: 'ਆਪਣੀ ਕਲਾਸ ਚੁਣੋ',
    offlineTutor: 'AI ਅਧਿਆਪਕ • ਆਫਲਾਈਨ', checkAnswer: 'ਜਵਾਬ ਦੇਖੋ', correct: '✅ ਸਹੀ!',
    wrong: '❌ ਗਲਤ', nextQuestion: 'ਅਗਲਾ', score: 'ਅੰਕ', topics: 'ਵਿਸ਼ੇ',
    minutes: 'ਮਿੰਟ', easy: 'ਆਸਾਨ', medium: 'ਮੱਧਮ', hard: 'ਔਖਾ',
  },
  Assamese: {
    home: 'হোম', learn: 'শিকক', practice: 'অভ্যাস', village: 'গাঁও', profile: 'প্ৰফাইল',
    askQuestion: 'আপোনাৰ প্ৰশ্ন সুধক...', aiReady: '🧠 AI সাজু', loadingAI: '⚡ AI লোড হৈছে...',
    todayChallenge: 'আজিৰ প্ৰত্যাহ্বান', continueLearn: 'শিকি থাকক', chooseSubject: 'বিষয় বাছক',
    startLesson: 'আৰম্ভ কৰক', yourProgress: 'আপোনাৰ অগ্ৰগতি', settings: 'ছেটিং', language: 'ভাষা',
    grade: 'শ্ৰেণী', greeting: 'নমস্কাৰ! 👋', selectLanguage: 'ভাষা বাছক', selectGrade: 'আপোনাৰ শ্ৰেণী বাছক',
    offlineTutor: 'AI শিক্ষক • অফলাইন', checkAnswer: 'উত্তৰ চাওক', correct: '✅ শুদ্ধ!',
    wrong: '❌ ভুল', nextQuestion: 'পৰৱৰ্তী', score: 'নম্বৰ', topics: 'বিষয়',
    minutes: 'মিনিট', easy: 'সহজ', medium: 'মধ্যম', hard: 'কঠিন',
  },
  Maithili: {
    home: 'होम', learn: 'सीखू', practice: 'अभ्यास', village: 'गाम', profile: 'प्रोफाइल',
    askQuestion: 'अपन प्रश्न पूछू...', aiReady: '🧠 AI तैयार अछि', loadingAI: '⚡ AI लोड भऽ रहल अछि...',
    todayChallenge: 'आइक चुनौती', continueLearn: 'सीखनाई जारी रखू', chooseSubject: 'विषय चुनू',
    startLesson: 'शुरू करू', yourProgress: 'अहाँक प्रगति', settings: 'सेटिंग', language: 'भाषा',
    grade: 'कक्षा', greeting: 'प्रणाम! 👋', selectLanguage: 'भाषा चुनू', selectGrade: 'अपन कक्षा चुनू',
    offlineTutor: 'AI शिक्षक • ऑफलाइन', checkAnswer: 'जवाब देखू', correct: '✅ सही!',
    wrong: '❌ गलत', nextQuestion: 'आगू', score: 'अंक', topics: 'विषय',
    minutes: 'मिनट', easy: 'सहज', medium: 'मध्यम', hard: 'कठिन',
  },
  Sanskrit: {
    home: 'गृहम्', learn: 'शिक्षाम्', practice: 'अभ्यासः', village: 'ग्रामः', profile: 'परिचयः',
    askQuestion: 'स्वप्रश्नं पृच्छतु...', aiReady: '🧠 AI सज्जः', loadingAI: '⚡ AI लोड भवति...',
    todayChallenge: 'अद्यतनी चुनौती', continueLearn: 'अध्ययनं जारी रखतु', chooseSubject: 'विषयं चिनोतु',
    startLesson: 'आरभतु', yourProgress: 'भवतः प्रगतिः', settings: 'व्यवस्था', language: 'भाषा',
    grade: 'श्रेणी', greeting: 'नमस्ते! 👋', selectLanguage: 'भाषां चिनोतु', selectGrade: 'श्रेणीं चिनोतु',
    offlineTutor: 'AI शिक्षकः • ऑफलाइन', checkAnswer: 'उत्तरं पश्यतु', correct: '✅ शुद्धम्!',
    wrong: '❌ अशुद्धम्', nextQuestion: 'अग्रे', score: 'अंकाः', topics: 'विषयाः',
    minutes: 'क्षणाः', easy: 'सरलम्', medium: 'मध्यमम्', hard: 'कठिनम्',
  },
  Urdu: {
    home: 'ہوم', learn: 'سیکھیں', practice: 'مشق', village: 'گاؤں', profile: 'پروفائل',
    askQuestion: 'اپنا سوال پوچھیں...', aiReady: '🧠 AI تیار ہے', loadingAI: '⚡ AI لوڈ ہو رہا ہے...',
    todayChallenge: 'آج کا چیلنج', continueLearn: 'سیکھنا جاری رکھیں', chooseSubject: 'مضمون چنیں',
    startLesson: 'شروع کریں', yourProgress: 'آپ کی ترقی', settings: 'ترتیبات', language: 'زبان',
    grade: 'جماعت', greeting: 'السلام علیکم! 👋', selectLanguage: 'زبان چنیں', selectGrade: 'اپنی جماعت چنیں',
    offlineTutor: 'AI استاد • آف لائن', checkAnswer: 'جواب دیکھیں', correct: '✅ صحیح!',
    wrong: '❌ غلط', nextQuestion: 'اگلا', score: 'نمبر', topics: 'موضوعات',
    minutes: 'منٹ', easy: 'آسان', medium: 'درمیانہ', hard: 'مشکل',
  },
  Konkani: {
    home: 'होम', learn: 'शिका', practice: 'सराव', village: 'गाव', profile: 'प्रोफाइल',
    askQuestion: 'तुमचो प्रस्न विचारा...', aiReady: '🧠 AI तयार', loadingAI: '⚡ AI लोड जाता...',
    todayChallenge: 'आयच आव्हान', continueLearn: 'शिकप सुरू दवरात', chooseSubject: 'विशय सोदात',
    startLesson: 'सुरू करात', yourProgress: 'तुमची प्रगती', settings: 'सेटिंग', language: 'भास',
    grade: 'इयत्ता', greeting: 'नमस्कार! 👋', selectLanguage: 'भास सोदात', selectGrade: 'इयत्ता सोदात',
    offlineTutor: 'AI शिक्षक • ऑफलाइन', checkAnswer: 'जाप पळयात', correct: '✅ बरोबर!',
    wrong: '❌ चुकीचे', nextQuestion: 'फुडलो', score: 'गुण', topics: 'विशय',
    minutes: 'मिनटां', easy: 'सोपे', medium: 'मध्यम', hard: 'कठीण',
  },
  Sindhi: {
    home: 'هوم', learn: 'سکو', practice: 'مشق', village: 'ڳوٺ', profile: 'پروفائيل',
    askQuestion: 'پنهنجو سوال پڇو...', aiReady: '🧠 AI تيار آهي', loadingAI: '⚡ AI لوڊ ٿي رهيو آهي...',
    todayChallenge: 'اڄ جو چيلنج', continueLearn: 'سکڻ جاري رکو', chooseSubject: 'مضمون چونڊيو',
    startLesson: 'شروع ڪريو', yourProgress: 'توهان جي ترقي', settings: 'سيٽنگ', language: 'ٻولي',
    grade: 'درجو', greeting: 'هيليو! 👋', selectLanguage: 'ٻولي چونڊيو', selectGrade: 'پنهنجو درجو چونڊيو',
    offlineTutor: 'AI استاد • آفلائن', checkAnswer: 'جواب ڏسو', correct: '✅ صحيح!',
    wrong: '❌ غلط', nextQuestion: 'اڳيون', score: 'نمبر', topics: 'موضوع',
    minutes: 'منٽ', easy: 'آسان', medium: 'وچولو', hard: 'ڏکيو',
  },
  Dogri: {
    home: 'होम', learn: 'सिखो', practice: 'अभ्यास', village: 'पिंड', profile: 'प्रोफाइल',
    askQuestion: 'अपना सुआल पुछो...', aiReady: '🧠 AI तैयार ऐ', loadingAI: '⚡ AI लोड होई रिया ऐ...',
    todayChallenge: 'अज्ज दी चुनौती', continueLearn: 'सिखना जारी रखो', chooseSubject: 'विशा चुनो',
    startLesson: 'शुरू करो', yourProgress: 'तुंआडी तरक्की', settings: 'सेटिंग', language: 'बोली',
    grade: 'जमात', greeting: 'नमस्कार! 👋', selectLanguage: 'बोली चुनो', selectGrade: 'अपनी जमात चुनो',
    offlineTutor: 'AI अध्यापक • ऑफलाइन', checkAnswer: 'जुआब देखो', correct: '✅ सही!',
    wrong: '❌ गलत', nextQuestion: 'अग्गें', score: 'अंक', topics: 'विशे',
    minutes: 'मिंट', easy: 'सौखा', medium: 'बराबर', hard: 'ओखा',
  },
  Kashmiri: {
    home: 'ہوم', learn: 'سیٚکھ', practice: 'ریٚیاضت', village: 'گام', profile: 'پروفایل',
    askQuestion: 'اپنہٕ سوال پوچھ...', aiReady: '🧠 AI تیار چھُ', loadingAI: '⚡ AI لوڈ گژھان چھُ...',
    todayChallenge: 'آجُکس چیلنج', continueLearn: 'سیٚکھنہٕ جاری رَکھ', chooseSubject: 'مضمون چھانٛڈ',
    startLesson: 'شروع کَر', yourProgress: 'تُہُنز ترقی', settings: 'سیٹنگ', language: 'زبان',
    grade: 'جماعت', greeting: 'آداب! 👋', selectLanguage: 'زبان چھانٛڈ', selectGrade: 'اپنٕ جماعت چھانٛڈ',
    offlineTutor: 'AI اُستاد • آفلاین', checkAnswer: 'جواب وُچھ', correct: '✅ درست!',
    wrong: '❌ غلط', nextQuestion: 'اگلٕ', score: 'نمبر', topics: 'مضمون',
    minutes: 'مِنَٹ', easy: 'آسان', medium: 'دَرمیانہٕ', hard: 'مُشکِل',
  },
  Manipuri: {
    home: 'হোম', learn: 'ঐশিং', practice: 'অভ্যাস', village: 'শংগোম', profile: 'প্রোফাইল',
    askQuestion: 'নংগি চানবা হায়বিরু...', aiReady: '🧠 AI থৌরাং', loadingAI: '⚡ AI লোড ওইরি...',
    todayChallenge: 'অদোম্বা চ্যালেঞ্জ', continueLearn: 'ঐশিং চত্থরু', chooseSubject: 'বিষয় শাবিরু',
    startLesson: 'হৌজিক', yourProgress: 'নংগি থৌরাং', settings: 'সেটিং', language: 'মীৎয়েং',
    grade: 'ক্লাস', greeting: 'নমস্কার! 👋', selectLanguage: 'মীৎয়েং শাবিরু', selectGrade: 'ক্লাস শাবিরু',
    offlineTutor: 'AI শিক্ষক • অফলাইন', checkAnswer: 'জবাব উবিরু', correct: '✅ চাউখৎলে!',
    wrong: '❌ নত্তে', nextQuestion: 'অদুমক', score: 'মার্ক', topics: 'বিষয়',
    minutes: 'মিনিট', easy: 'ফরকপা', medium: 'মরম', hard: 'অতৈ',
  },
  Bodo: {
    home: 'होम', learn: 'बुजिनाय', practice: 'अभ्यास', village: 'गाव', profile: 'प्रोफाइल',
    askQuestion: 'नों सुलुंनाय बिजाब...',  aiReady: '🧠 AI थाखो', loadingAI: '⚡ AI लोड जानो...',
    todayChallenge: 'अजि चुनौती', continueLearn: 'बुजिनाय जारी', chooseSubject: 'बिसाय थिनाय',
    startLesson: 'हाबो', yourProgress: 'नों थाखो', settings: 'सेटिंग', language: 'बेसेन',
    grade: 'क्लास', greeting: 'नमस्कार! 👋', selectLanguage: 'बेसेन थिनाय', selectGrade: 'क्लास थिनाय',
    offlineTutor: 'AI गुरु • ऑफलाइन', checkAnswer: 'जाबाब देखनाय', correct: '✅ थार!',
    wrong: '❌ गोलाव', nextQuestion: 'गोनां', score: 'नम्बर', topics: 'बिसाय',
    minutes: 'मिनिट', easy: 'सोरोंनि', medium: 'मध्यम', hard: 'गोब्राब',
  },
  Santali: {
    home: 'होम', learn: 'पढ़ाव', practice: 'अभ्यास', village: 'गाँव', profile: 'प्रोफाइल',
    askQuestion: 'आपनाक् सुवाल ओकते...', aiReady: '🧠 AI तैयार', loadingAI: '⚡ AI लोड...',
    todayChallenge: 'आयो चुनौती', continueLearn: 'पढ़ाव जारी', chooseSubject: 'बिसाय चेयाव',
    startLesson: 'हुयुक', yourProgress: 'आपनाक् थाखो', settings: 'सेटिंग', language: 'भाषा',
    grade: 'क्लास', greeting: 'जोहार! 👋', selectLanguage: 'भाषा चेयाव', selectGrade: 'क्लास चेयाव',
    offlineTutor: 'AI गुरु • ऑफलाइन', checkAnswer: 'जबाब देखाव', correct: '✅ सांच!',
    wrong: '❌ बेकार', nextQuestion: 'अगला', score: 'नंबर', topics: 'बिसाय',
    minutes: 'मिनिट', easy: 'सहज', medium: 'मध्यम', hard: 'कठिन',
  },
};

export function t(language: Language, key: keyof UIStrings): string {
  return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.English[key];
}

export function getAILanguageInstruction(language: Language): string {
  if (language === 'English') return 'Respond in simple English.';
  return `You MUST respond ONLY in ${language} language. Use simple words a school student understands. Give examples from Indian village life.`;
}