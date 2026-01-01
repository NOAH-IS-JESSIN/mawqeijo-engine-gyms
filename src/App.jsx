import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, X, ArrowUpRight, Crosshair, Menu, Globe } from 'lucide-react';

// --- 1. LOGO ASSETS ---

const MeedanLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M20,35 L30,25 L40,30 L50,20 L60,30 L70,25 L80,35 L85,60 L70,85 L50,95 L30,85 L15,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M35,45 L45,50 L35,55 Z" fill="currentColor" />
    <path d="M65,45 L55,50 L65,55 Z" fill="currentColor" />
    <path d="M45,65 L55,65 L50,75 Z" fill="#fff" />
  </svg>
);

const KayiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M25,40 h15 v20 h-15 z M60,40 h15 v20 h-15 z M40,50 h20 v4 h-20 z" fill="currentColor" />
    <text x="50" y="80" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">KAYI</text>
    <path d="M35,30 L42,15 L50,30 L58,15 L65,30" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// --- 2. DATA ENGINE (LOCALIZED) ---
const GYM_DATA = {
  meedan: {
    theme: { primary: '#050505', accent: '#DC2626' }, // Red/Black
    content: {
      en: {
        name: "MEEDAN",
        tagline: "POWER IS CONTROL.",
        sub: "THE HOUNDS EAT FIRST.",
        location: "Amman, Moussa An-Nehar St.",
        cta: "Start Training",
        disciplines: [
          { title: "STRIKING", desc: "Muay Thai / Boxing", img: "https://images.unsplash.com/photo-1680022546558-550eaf22351e?w=500&auto=format&fit=crop" },
          { title: "GRAPPLING", desc: "BJJ / Wrestling", img: "https://images.unsplash.com/photo-1728498852323-6b91113f9111?w=500&auto=format&fit=crop" },
          { title: "ENGINE", desc: "S&C / Hyrox", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=500&auto=format&fit=crop" }
        ],
        marquee: "STRENGTH // CONDITIONING // COMBAT // DISCIPLINE //"
      },
      ar: {
        name: "مــيــدان",
        tagline: "القوة هي السيطرة",
        sub: "الأولوية للوحوش.",
        location: "عمان، شارع موسى النهار",
        cta: "ابدأ التمرين",
        disciplines: [
          { title: "فنون قتالية", desc: "مواي تاي / ملاكمة", img: "https://images.unsplash.com/photo-1680022546558-550eaf22351e?w=500&auto=format&fit=crop" },
          { title: "مصارعة", desc: "جيوجيتسو / مصارعة", img: "https://images.unsplash.com/photo-1728498852323-6b91113f9111?w=500&auto=format&fit=crop" },
          { title: "لياقة بدنية", desc: "قوة وتحمل / هايروكس", img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=500&auto=format&fit=crop" }
        ],
        marquee: "قوة // تحمل // قتال // انضباط //"
      },
      LogoComponent: MeedanLogo,
      heroImg: "https://instagram.famm2-3.fna.fbcdn.net/v/t51.82787-15/541926358_18372673855176346_6827766176875123591_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=110&ig_cache_key=MzcxMTMyNzM3NjI5MTY4MTM5MjE4MzcyNjczODQ5MTc2MzQ2.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjU0MHg5NjAuc2RyLkMzIn0%3D&_nc_ohc=xmIYJx0U5T0Q7kNvwFkXcMN&_nc_oc=AdkvJCcDVNhNrnQIynFCNmw3bCOiQePmNPxNR2lBxMj-rAL7LuZ0HNPO2mExDCU-2Cg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.famm2-3.fna&_nc_gid=FjqginBmjNRMMvRDA5BBog&oh=00_AfrqH_UhkaxenVxAnUzTS2jih2b1uMJwiqWMLDE2nYIgWw&oe=695BF80E"
    }
  },

  kayi: {
    theme: { primary: '#000000', accent: '#39FF14' }, // Neon Green
    content: {
      en: {
        name: "KAYI GYM",
        tagline: "MUSCLES EVERYWHERE.",
        sub: "The Biggest Gym in Sweifieh. Open 24/7.",
        location: "Sweifieh, Paris St.",
        cta: "Join The Elite",
        disciplines: [
          { title: "THE ARENA", desc: "Largest Weight Room in Amman", img: "https://lh3.googleusercontent.com/p/AF1QipNK-fXRLV4XdEd3hPuAkHHZcSj8uxCNyqRBdkkV=s1360-w1360-h1020-rw" },
          { title: "24/7 ACCESS", desc: "Train on Your Terms", img: "https://lh3.googleusercontent.com/p/AF1QipOcNjs7FXKPRbCmiTAEMVLkvt6XCCFRKNpq3TKO=s1360-w1360-h1020-rw" },
          { title: "PRO MACHINERY", desc: "Hammer Strength / Panatta", img: "https://lh3.googleusercontent.com/p/AF1QipMxgxIU30rsDMfHkAFDAvkik9wGLar6SXlDfD5v=s1360-w1360-h1020-rw" }
        ],
        marquee: "OPEN 24/7 // BIG RAMY APPROVED // LARGEST FACILITY // PRO EQUIPMENT //"
      },
      ar: {
        name: "نادي كايي",
        tagline: "عضلاتك بكل مكان",
        sub: "أكبر نادي في الصويفية. مفتوح ٢٤ ساعة.",
        location: "الصويفية، شارع باريس",
        cta: "انضم للنخبة",
        disciplines: [
          { title: "الساحة", desc: "أكبر صالة حديد في عمان", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920" },
          { title: "مفتوح ٢٤/٧", desc: "تمرن بأي وقت", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800" },
          { title: "معدات محترفين", desc: "هامر سترينث / باناتا", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800" }
        ],
        marquee: "مفتوح ٢٤ ساعة // أجهزة عالمية // أكبر مساحة // معتمد من بيج رامي //"
      },
      LogoComponent: KayiLogo,
      heroImg: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxESzMoOYax2zaMQptH0hTO7KPBY1ANa2HhGFjcDrbmlfKGGJptY_SqdSCjquMHttvNMuWJmgWlyW4Zv3VQ-KIYM1SpFWopP-3VCdIoR9bAONa30C10tnlGWbFCXJ_TPx45LDZgiGZ3iTk=s1360-w1360-h1020-rw" 
    }
  },

 // Fallback (The Fix)
  default: { 
    theme: { primary: '#111', accent: '#ffffff' }, 
    content: {
      en: {
        name: "MAWQEIJO ENGINE",
        tagline: "SYSTEM READY.",
        sub: "Select a client to view the template.",
        location: "System Status: Online",
        cta: "Initiate",
        disciplines: [], // Empty array prevents the crash
        marquee: "WAITING FOR INPUT // SELECT GYM KEY //"
      },
      ar: {
        name: "محرك موقعجو",
        tagline: "النظام جاهز",
        sub: "اختر عميلاً لعرض النموذج.",
        location: "حالة النظام: متصل",
        cta: "ابدأ",
        disciplines: [],
        marquee: "بانتظار الإدخال // اختر النادي //"
      },
      LogoComponent: () => <div className="text-4xl font-black">M</div>,
      heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80"
    } 
  }
};

const Marquee = ({ text, color }) => (
  <div className="flex overflow-hidden whitespace-nowrap py-4 text-black border-y border-white/10" style={{ backgroundColor: color }}>
    <motion.div 
      initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="flex gap-12 font-black italic uppercase text-xl md:text-3xl tracking-tighter"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-4">
           {text} <Crosshair size={24} className="opacity-50" />
        </span>
      ))}
    </motion.div>
  </div>
);

// --- LAYOUT: CLEAN PERFORMANCE ---
const LayoutPerformance = ({ data, openModal, lang, setLang }) => {
  const { theme } = data;
  const content = data.content[lang]; // Select Language
  const { scrollY } = useScroll();
  
  const yText = useTransform(scrollY, [0, 500], [0, 150]); 
  const yImg = useTransform(scrollY, [0, 800], [0, -50]);
  const Logo = data.content.LogoComponent || (() => null);
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      
      {/* 1. HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-black border p-2 flex items-center justify-center rounded-full shadow-2xl"
                 style={{ borderColor: theme.accent, color: theme.accent }}>
                <Logo />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter leading-none uppercase">{content.name}</h1>
            </div>
         </div>

         <div className="flex items-center gap-4">
             {/* Language Switcher */}
             <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-300">
                <Globe size={16} /> {lang === 'en' ? 'عربي' : 'ENG'}
             </button>
             
             <button onClick={openModal} className="hidden md:block text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all bg-black/50 backdrop-blur-md">
                {content.cta}
             </button>
         </div>
      </nav>

      {/* 2. CLEAN HERO SECTION */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 border-b border-white/10 overflow-hidden pt-24">
         <div className="container mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Typography */}
            <motion.div style={{ y: yText }} className="md:col-span-7 relative z-20">
               <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 font-mono text-xs md:text-sm tracking-widest mb-4" style={{ color: theme.accent }}>
                  <Crosshair className="w-4 h-4" /> {content.location}
               </motion.div>
               
               <h2 className="text-[15vw] md:text-[8vw] font-black uppercase italic leading-[0.9] mb-6 tracking-tighter text-white">
                  {content.tagline}
               </h2>
               
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl text-gray-300 max-w-lg font-bold uppercase tracking-wide border-s-4 ps-6 mb-10" style={{ borderColor: theme.accent }}>
                  {content.sub}
               </motion.p>

               <button onClick={openModal} className="w-full md:w-auto text-black px-10 py-5 font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: theme.accent }}>
                  {content.cta} <ArrowUpRight />
               </button>
            </motion.div>
            
            {/* Visual - Clean, No Glitch */}
            <div className="md:col-span-5 relative h-[60vh] w-full">
                <motion.div style={{ y: yImg }} className="relative w-full h-full border border-white/10 p-1 bg-zinc-900">
                    <div className="w-full h-full overflow-hidden">
                        <img src={data.content.heroImg} className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-out" alt="Hero" 
                             onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80"}} />
                    </div>
                </motion.div>
            </div>
         </div>
      </header>

      {/* 3. MARQUEE */}
      <Marquee text={content.marquee} color={theme.accent} />

      {/* 4. ZONES */}
      <section className="py-24 bg-[#080808]">
         <div className="container mx-auto px-6">
             <div className="grid md:grid-cols-3 gap-1">
                {content.disciplines.map((d, i) => (
                   <div key={i} className="group relative h-[500px] border border-white/5 bg-zinc-900 overflow-hidden cursor-pointer">
                      <img src={d.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" alt={d.title} />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-0 w-full p-8 z-20">
                         <div className="font-mono text-xs mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0" style={{ color: theme.accent }}>
                            0{i+1}
                         </div>
                         <h2 className="text-4xl font-black uppercase italic leading-none mb-2 text-white">{d.title}</h2>
                         <p className="text-gray-400 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">{d.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-white text-black py-24 px-6 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: theme.accent }}></div>
         <div className="container mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
            <div>
               <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                  {lang === 'en' ? 'BECOME LEGEND.' : 'كن أسطورة.'}
               </h2>
               <div className="mt-8">
                  <button onClick={openModal} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                     {content.cta}
                  </button>
               </div>
            </div>
            <div className="text-end space-y-2 font-mono text-xs font-bold uppercase tracking-wider">
               <p className="flex items-center justify-end gap-2"><MapPin size={14}/> {content.location}</p>
               <p className="flex items-center justify-end gap-2"><Phone size={14}/> +962 79 000 0000</p>
               <div className="pt-8 opacity-50">Powered by Mawqeijo</div>
            </div>
         </div>
      </footer>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [lang, setLang] = useState('en'); // Default Language
  
  const params = new URLSearchParams(window.location.search);
  const gymKey = params.get('gym') || 'default';
  const data = GYM_DATA[gymKey] || GYM_DATA.default;

  return (
    <>
      <LayoutPerformance data={data} lang={lang} setLang={setLang} openModal={() => setActiveModal(true)} />
      
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#111] border border-white/10 p-8 md:p-12 max-w-lg w-full relative">
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: data.theme.accent }}></div>
                <button onClick={() => setActiveModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X /></button>
                <h2 className="text-3xl font-black uppercase text-white mb-2 italic">{lang === 'en' ? 'INITIATE SEQUENCE' : 'ابدأ التسجيل'}</h2>
                <p className="text-gray-500 text-sm mb-8 font-mono">{lang === 'en' ? 'ENTER YOUR CREDENTIALS.' : 'أدخل بياناتك للتواصل.'}</p>
                <div className="space-y-4">
                    <input type="text" placeholder={lang === 'en' ? "NAME" : "الاسم"} className="w-full bg-black border-b border-white/20 p-4 text-white outline-none transition-colors focus:border-current placeholder:text-gray-700 font-bold" style={{ color: data.theme.accent }} />
                    <input type="tel" placeholder={lang === 'en' ? "PHONE" : "رقم الهاتف"} className="w-full bg-black border-b border-white/20 p-4 text-white outline-none transition-colors focus:border-current placeholder:text-gray-700 font-bold" style={{ color: data.theme.accent }} />
                </div>
                <button className="w-full mt-8 py-4 font-black uppercase text-black hover:bg-white transition-colors tracking-widest text-lg" style={{ backgroundColor: data.theme.accent }}>
                    {lang === 'en' ? 'EXECUTE' : 'إرسال'}
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;