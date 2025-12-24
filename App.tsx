
import React, { useState, useRef, useEffect } from 'react';
import { DIALECTS, VOICE_TYPES, VOICE_FIELDS, STUDIO_CONTROLS, CATEGORY_STYLES, getBaseVoiceForType, DialectInfo, VoiceProfile, VoiceField } from './constants';
import { GenerationHistory, VoiceControls } from './types';
import { TahaService } from './services/geminiService';

// --- Cinematic Intro Component ---
const CinematicIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState<'titles' | 'reveal' | 'fadeout'>('titles');
  const [particles] = useState(() => 
    [...Array(40)].map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5
    }))
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('reveal'), 2500);
    const timer2 = setTimeout(() => setStage('fadeout'), 5000);
    const timer3 = setTimeout(onComplete, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] overflow-hidden flex items-center justify-center transition-opacity duration-1000 ${stage === 'fadeout' ? 'opacity-0 blur-2xl' : 'opacity-100'}`}>
      
      {/* 3D Space Background */}
      <div className="absolute inset-0 perspective-[1000px]">
        {particles.map(p => (
          <div 
            key={p.id}
            className="particle animate-float-slow"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Atmospheric Fog */}
      <div className="fog-layer"></div>

      {/* Volumetric Light Beams */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
        <div className="w-1/4 h-full bg-gradient-to-r from-amber-500/10 via-transparent to-transparent -skew-x-12"></div>
        <div className="w-1/4 h-full bg-gradient-to-l from-amber-500/10 via-transparent to-transparent skew-x-12"></div>
      </div>

      {/* Main Intro Content */}
      <div className="relative z-10 text-center scale-up">
        <div className={`${stage === 'titles' ? 'animate-cinematic' : 'opacity-0 transition-opacity duration-1000'}`}>
          <h2 className="android-tech-logo text-6xl md:text-8xl">Arabic Sound</h2>
          <div className="android-subtitle text-sm md:text-base">VOICE OVER</div>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${stage === 'reveal' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative flex flex-col items-center">
            <h2 className="android-tech-logo text-5xl md:text-7xl">Arabic Sound</h2>
            <div className="android-subtitle text-xs md:text-sm">VOICE OVER</div>
            
            {/* Intro Waveform Reacting */}
            <div className="mt-12 flex gap-1 h-12 justify-center">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-cyan-500/40 rounded-full animate-pulse" 
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`,
                    animationDuration: '1s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heartbeat Sound Trigger Symbol */}
      <div className="absolute bottom-10 text-white/5 text-[10px] uppercase tracking-[1em]">Establishing Frequency...</div>
    </div>
  );
};

// --- Decorative 3D Floating Icons ---
const FloatingMic = () => (
  <div className="absolute -top-10 -left-10 w-32 h-32 opacity-10 pointer-events-none animate-float">
    <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  </div>
);

const FloatingHeadphones = () => (
  <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 pointer-events-none animate-float-slow">
    <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
      <path d="M12 2C6.48 2 2 6.48 2 12v7c0 1.1.9 2 2 2h3v-8H4v-1c0-4.41 3.59-8 8-8s8 3.59 8 8v1h-3v8h3c1.1 0 2-.9 2-2v-7c0-5.52-4.48-10-10-10z"/>
    </svg>
  </div>
);

const GenderIcon = ({ gender, className }: { gender: string, className?: string }) => {
  if (gender === 'male' || gender === 'ذكر') {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      <path d="M10 12l-2 2h4l-2-2z" />
    </svg>
  );
};

const CategoryIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'mic-documentary': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    );
    case 'mic-ads': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    );
    case 'mic-kids': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    case 'mic-podcast': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    case 'mic-book': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.247 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
    case 'mic-youtube': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
    default: return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    );
  }
};

const SelectionBlock: React.FC<{
  title: string;
  options: string[];
  current: string;
  set: (s: string) => void;
}> = ({ title, options, current, set }) => (
  <div className="w-full space-y-6">
    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] text-center mb-8">{title}</h3>
    <div className="flex flex-wrap justify-center gap-3">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => set(opt)}
          className={`px-8 py-3.5 rounded-[22px] border transition-all duration-500 text-sm font-bold shadow-sm ${
            current === opt 
              ? 'gold-bg text-black scale-105 shadow-amber-500/30' 
              : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const ControlGroup: React.FC<{
  id: string;
  title: string;
  options: { label: string; desc: string }[];
  current: string;
  onChange: (val: string) => void;
}> = ({ id, title, options, current, onChange }) => (
  <div className="space-y-4 text-right group">
    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-amber-500/50 transition-colors">{title}</label>
    <div className="grid grid-cols-1 gap-2.5">
      {options.map(opt => (
        <button
          key={opt.label}
          onClick={() => onChange(opt.label)}
          className={`relative p-4 rounded-2xl border text-right transition-all duration-500 overflow-hidden ${
            current === opt.label 
              ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-lg' 
              : 'border-white/5 bg-white/5 text-white/30 hover:bg-white/10 hover:border-white/10'
          }`}
        >
          {current === opt.label && <div className="absolute top-0 right-0 w-1 h-full bg-amber-500"></div>}
          <div className="flex justify-between items-center mb-1 flex-row-reverse">
            <span className={`text-sm font-bold ${current === opt.label ? 'text-amber-500' : 'text-white/60'}`}>{opt.label}</span>
          </div>
          <p className="text-[10px] text-white/30 leading-relaxed line-clamp-2">{opt.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Session-based intro playing logic
    const played = sessionStorage.getItem('Taha_intro_played');
    return played !== 'true';
  });

  const [selectedDialectId, setSelectedDialectId] = useState<string>(DIALECTS[0].id);
  const [selectedType, setSelectedType] = useState<string>(VOICE_TYPES[0]);
  const [selectedGender, setSelectedGender] = useState<string>('ذكر');
  const [selectedFieldId, setSelectedFieldId] = useState<string>(VOICE_FIELDS[0].id);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  
  const [voiceControls, setVoiceControls] = useState<VoiceControls>({
    temp: 'دافئ', emotion: 'متوسط', speed: 'متوسطة', depth: 'متوسطة', pitch: 'متوسطة', drama: 'متوسط'
  });

  const [inputText, setInputText] = useState<string>('');
  const [processedText, setProcessedText] = useState<string>('');
  const [isPreprocessing, setIsPreprocessing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<GenerationHistory | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedDialect = DIALECTS.find(d => d.id === selectedDialectId) || DIALECTS[0];
  const selectedField = VOICE_FIELDS.find(f => f.id === selectedFieldId) || VOICE_FIELDS[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const filteredProfiles = (selectedType === 'كبار السن' 
    ? DIALECTS.flatMap(d => d.profiles) 
    : selectedDialect.profiles
  ).filter((p, index, self) => {
    if (self.findIndex(t => t.name === p.name) !== index) return false;
    const matchesType = p.voiceType === selectedType;
    const matchesGender = p.gender === (selectedGender === 'ذكر' ? 'male' : 'female');
    return matchesType && matchesGender;
  });

  const handlePreprocess = async () => {
    if (!inputText.trim()) {
      setError("يرجى كتابة النص أولاً.");
      return;
    }
    setError(null);
    setIsPreprocessing(true);
    try {
      const refined = await tahaService.preprocessText(inputText, {
        dialect: selectedDialect.title,
        field: selectedField.title,
        personality: selectedVoiceName,
        controls: voiceControls
      });
      setProcessedText(refined);
    } catch (err) {
      setError("فشل تحسين النص ذكياً.");
    } finally {
      setIsPreprocessing(false);
    }
  };

  const handleGenerate = async () => {
    const textToUse = processedText || inputText;
    if (!textToUse.trim()) {
      setError("يرجى التأكد من وجود نص للمخطوطة.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    setCurrentResult(null);
    setIsPlaying(false);
    
    try {
      const activeVoice = filteredProfiles.find(p => p.name === selectedVoiceName) || filteredProfiles[0];
      const performanceNote = `
اللهجة المختارة: ${selectedDialect.title}
نوع الصوت: ${selectedType} (${activeVoice?.gender === 'male' ? 'ذكر' : 'أنثى'})
المجال الصوتي: ${selectedField.title}
وصف الشخصية: ${selectedVoiceName || 'تلقائي'}
المعايير التقنية:
- درجة حرارة الصوت: ${voiceControls.temp}
- مستوى الانفعال: ${voiceControls.emotion}
- سرعة الإلقاء: ${voiceControls.speed}
- عمق النبرة: ${voiceControls.depth}
- طبقة الصوت: ${voiceControls.pitch}
- شدة التأثير الدرامي: ${voiceControls.drama}
      `;
      
      const baseVoice = getBaseVoiceForType(selectedType, activeVoice?.gender || (selectedGender === 'ذكر' ? 'male' : 'female'));
      const audioUrl = await tahaService.generateVoiceOver(textToUse, baseVoice, performanceNote);
      
      const result: GenerationHistory = {
        id: Math.random().toString(36).substr(2, 9),
        text: textToUse,
        selection: { 
          dialect: selectedDialect.title, type: `${selectedType} (${activeVoice?.gender === 'male' ? 'ذكر' : 'أنثى'})`, field: selectedField.title,
          controls: { ...voiceControls }
        },
        timestamp: Date.now(),
        audioBlobUrl: audioUrl
      };
      
      setCurrentResult(result);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      setError("حدث خطأ أثناء معالجة الصوت. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restartAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const targetMute = !isMuted;
    audioRef.current.muted = targetMute;
    setIsMuted(targetMute);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadAudio = (url: string, id: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `taha_VO_${id}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const finishIntro = () => {
    sessionStorage.setItem('taha_intro_played', 'true');
    setShowIntro(false);
  };

  if (showIntro) {
    return <CinematicIntro onComplete={finishIntro} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center py-24 px-6 font-arabic overflow-hidden relative animate-in fade-in duration-1000" dir="rtl">
      
      {/* Profile Image Container */}
      <div className="absolute top-8 left-8 z-[60] group pointer-events-auto">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border border-amber-500/30 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-500 hover:scale-110 animate-float-slow backdrop-blur-sm overflow-hidden flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden border border-white/5 flex items-center justify-center bg-transparent">
            <img 
              src="https://i.ibb.co/WNzzztQw/Copy.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover object-center block rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="absolute top-8 right-8 z-[60] flex items-center gap-5">
        <a 
          href="https://www.facebook.com/share/1AcufZTArY/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-sm hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          title="Facebook"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
        <a 
          href="https://www.instagram.com/ahmed_samir_ai?igsh=MWNzdmR2czliNTl0Ng==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-sm hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          title="Instagram"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.315 2c2.43 0 2.784.012 3.855.06 1.061.048 1.791.222 2.427.471.67.27.14.734.995 1.181.258.446.42.996.471 2.056.06 1.071.072 1.425.072 3.855 0 2.43-.012 2.784-.06 3.855-.048 1.061-.222 1.791-.471 2.427-.27.67-.734 1.14-1.181 1.586-.446.258-.996.42-2.056.471-1.071.06-1.425.072-3.855.072-2.43 0-2.784-.012-3.855-.06-1.061-.048-1.791-.222-2.427-.471-.67-.27-1.14-.734-1.586-1.181-.258-.446-.42-.996-.471-2.056-.06-1.071-.072-1.425-.072-3.855 0-2.43.012-2.784.06-3.855.048-1.061.222-1.791.471-2.427.27-.67.734-1.14 1.181-1.586.446-.258.996-.42 2.056-.471 1.071-.06 1.425-.072 3.855-.072zm.685 1.815c-2.394 0-2.748.01-3.693.053-.873.04-1.348.182-1.663.303-.418.163-.715.358-1.03.674-.315.315-.51.612-.674 1.03-.121.315-.262.79-.303 1.663-.043.945-.053 1.299-.053 3.693s.01 2.748.053 3.693c.04.873.182 1.348.303 1.663.163.418.358.715.674 1.03.315.315.612.51 1.03.674.315.121.79.262 1.663.303.945.043 1.299.053 3.693.053s2.748-.01 3.693-.053c.873-.04 1.348-.182 1.663-.303.418-.163.715-.358 1.03-.674.315-.315.51-.612.674-1.03.121-.315.262-.79.303-1.663.043-.945.053-1.299.053-3.693s-.01-2.748-.053-3.693c-.04-.873-.182-1.348-.303-1.663-.163-.418-.358-.715-.674-1.03-.315-.315-.612-.51-1.03-.674-.315-.121-.79-.262-1.663-.303-.945-.043-1.299-.053-3.693-.053zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.35a4.35 4.35 0 110-8.7 4.35 4.35 0 010 8.7zM17.913 5.484a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
          </svg>
        </a>
        <a 
          href="http://tiktok.com/@ahmed_samir_ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-sm hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          title="TikTok"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
          </svg>
        </a>
      </div>

      {/* Background Motion Effects */}
      <div className="bg-light-blob top-[10%] left-[5%]"></div>
      <div className="bg-light-blob bottom-[10%] right-[5%]" style={{ animationDelay: '-5s', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)' }}></div>
      
      {/* 3D Decorative Assets */}
      <FloatingMic />
      <FloatingHeadphones />

      {/* Cinematic Header */}
      <header className="mb-24 text-center relative z-10 group">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="h-20 w-20 gold-bg rounded-[24px] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-black" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-6xl font-bold gold-text tracking-tight leading-tight">الصوت العربي </h1>
            <p className="text-white/30 text-xs uppercase tracking-[0.6em] font-medium mt-2">Professional Arabic Voice Engine</p>
          </div>
        </div>
      </header>

      <div className="w-full max-w-5xl space-y-24 relative z-10">
        
        {/* Step 1: Dialect */}
        <section className="glass-3d p-16 rounded-[45px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] text-center mb-14">١. منصة اختيار اللهجات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIALECTS.map((dialect) => (
              <button
                key={dialect.id}
                onClick={() => setSelectedDialectId(dialect.id)}
                className={`relative text-right p-8 rounded-[35px] transition-all duration-500 border-2 group ${
                  selectedDialectId === dialect.id 
                    ? 'border-amber-500/50 bg-amber-500/5 shadow-2xl scale-[1.02]' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between flex-row-reverse mb-5">
                  <h4 className={`text-2xl font-bold ${selectedDialectId === dialect.id ? 'text-amber-500' : 'text-white/80'}`}>
                    {dialect.title}
                  </h4>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${selectedDialectId === dialect.id ? 'gold-bg text-black rotate-0' : 'bg-white/5 text-white/10 rotate-12'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed ${selectedDialectId === dialect.id ? 'text-white/70' : 'text-white/30'}`}>
                  {dialect.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Personality & Age */}
        <section className="glass-3d p-16 rounded-[45px] space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <SelectionBlock title="٢. الفئة العمرية والنمط الأدائي" options={VOICE_TYPES} current={selectedType} set={setSelectedType} />
          
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em]">بصمة الصوت</h3>
            <div className="flex gap-4">
              {['ذكر', 'أنثى'].map(gender => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`px-14 py-4 rounded-full border-2 transition-all duration-500 text-sm font-bold shadow-xl ${
                    selectedGender === gender 
                      ? 'border-amber-500 bg-amber-500/10 text-white scale-105' 
                      : 'border-white/5 bg-white/5 text-white/30 hover:bg-white/10'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-16 border-t border-white/5">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] text-center mb-10">معرض النخب الصوتية</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProfiles.length > 0 ? filteredProfiles.map((profile, idx) => {
                const style = CATEGORY_STYLES[profile.categoryKey as keyof typeof CATEGORY_STYLES];
                const isActive = selectedVoiceName === profile.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedVoiceName(profile.name)}
                    className={`relative overflow-hidden text-right p-6 rounded-[35px] border-2 transition-all duration-700 transform hover:scale-105 group h-full flex flex-col items-center justify-center gap-5 text-center shadow-lg ${
                      isActive 
                        ? `border-white/20 bg-gradient-to-br ${style.color} ring-8 ring-amber-500/10 shadow-2xl` 
                        : 'border-white/5 bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="absolute top-4 left-4">
                      <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/5 text-white/10'}`}>
                        <GenderIcon gender={profile.gender} className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${isActive ? 'bg-white/20 rotate-3 scale-110' : 'bg-white/5 group-hover:bg-white/10'}`}>
                      <CategoryIcon type={style.icon} className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white/20'}`} />
                    </div>

                    <div className="space-y-1 relative z-10">
                      <h5 className={`text-lg font-bold transition-all ${isActive ? 'text-white' : 'text-white/70'}`}>{profile.name}</h5>
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${isActive ? 'bg-black/40 text-white' : 'bg-white/5 text-white/20'}`}>
                        {profile.category}
                      </span>
                    </div>

                    <p className={`text-[10px] leading-relaxed transition-all mt-1 line-clamp-2 px-2 ${isActive ? 'text-white/80' : 'text-white/30 group-hover:text-white/50'}`}>
                      {profile.description}
                    </p>
                  </button>
                );
              }) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-white/10 text-sm italic">محرك البحث الصوتي لا يجد نتائج لهذا الاختيار</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Step 3: Studio Controls */}
        <section className="glass-3d p-16 rounded-[45px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] text-center mb-16">٣. غرفة التحكم والمعالجة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Object.entries(STUDIO_CONTROLS).map(([key, control]) => (
              <ControlGroup 
                key={key} 
                id={key} 
                title={control.title} 
                options={control.options} 
                current={(voiceControls as any)[key]} 
                onChange={(val) => setVoiceControls(v => ({ ...v, [key]: val }))} 
              />
            ))}
          </div>
        </section>

        {/* Step 4: Text Content */}
        <section className="glass-3d p-16 rounded-[45px] space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] text-center">٤. هندسة النص والمخطوطة</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-5">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest text-right block pr-4">مسودة النص (Input Draft)</label>
              <textarea
                className="w-full h-80 bg-black/40 border border-white/5 rounded-[40px] p-10 text-xl text-white placeholder-white/5 focus:outline-none focus:border-amber-500/20 transition-all font-arabic leading-relaxed resize-none text-right shadow-2xl"
                placeholder="ابدأ بكتابة فكرتك هنا..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                onClick={handlePreprocess}
                disabled={isPreprocessing || !inputText.trim()}
                className="w-full py-5 rounded-[24px] border border-amber-500/20 bg-amber-500/5 text-amber-500 text-sm font-bold hover:bg-amber-500 hover:text-black transition-all disabled:opacity-20 flex items-center justify-center gap-4 group shadow-lg"
              >
                {isPreprocessing ? <div className="w-4 h-4 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div> : null}
                <span className="tracking-widest">تحسين النص ذكياً (AI Refinement)</span>
              </button>
            </div>

            <div className="space-y-5">
              <label className="text-[10px] font-bold text-amber-500/50 uppercase tracking-widest text-right block pr-4">المخطوطة النهائية (Production Ready)</label>
              <textarea
                className="w-full h-80 bg-amber-500/5 border border-amber-500/10 rounded-[40px] p-10 text-xl text-amber-50 placeholder-white/5 focus:outline-none focus:border-amber-500/30 transition-all font-arabic leading-relaxed resize-none text-right shadow-2xl"
                placeholder="سيظهر النص المعالج هنا للإخراج النهائي..."
                value={processedText}
                onChange={(e) => setProcessedText(e.target.value)}
              />
              <p className="text-[9px] text-white/10 text-center font-bold tracking-widest uppercase">Expert Polish Mode Active</p>
            </div>
          </div>
        </section>

        {/* Final Trigger */}
        <section className="flex justify-center pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!processedText.trim() && !inputText.trim())}
            className={`w-full max-w-2xl py-10 rounded-full font-bold text-2xl flex items-center justify-center gap-6 transition-all relative overflow-hidden shadow-2xl group ${
              isGenerating || (!processedText.trim() && !inputText.trim()) ? 'bg-white/5 text-white/10 cursor-not-allowed grayscale' : 'gold-bg text-black hover:scale-105 active:scale-95 shadow-amber-500/40'
            }`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            {isGenerating ? (
              <><div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div><span className="animate-pulse">جاري الإنتاج الصوتي...</span></>
            ) : (
              <><svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>بدء جلسة التسجيل</>
            )}
          </button>
        </section>

        {/* Output Console */}
        {(currentResult || isGenerating || error) && (
          <section className="glass-3d p-16 rounded-[60px] border-amber-500/20 space-y-12 animate-in zoom-in duration-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.4em] text-center">الإخراج النهائي (Mastering Suite)</h3>
            
            {error && <div className="p-8 rounded-[30px] bg-red-500/5 border border-red-500/10 text-red-500 text-sm text-center font-bold tracking-wide">{error}</div>}
            
            {isGenerating && (
              <div className="flex flex-col items-center gap-10 py-16">
                <div className="flex gap-4 items-end h-24">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`w-3 h-${Math.floor(Math.random() * 16 + 4)} bg-amber-500/40 rounded-full animate-pulse`} style={{ animationDelay: `${i * 150}ms` }}></div>
                  ))}
                </div>
                <p className="text-sm text-white/30 animate-pulse tracking-[0.3em] uppercase">Digital Audio Workstation Processing...</p>
              </div>
            )}

            {currentResult && (
              <div className="w-full flex flex-col items-center gap-14">
                
                {/* Visualizer */}
                <div className="flex items-center justify-center gap-1.5 h-24 w-full overflow-hidden opacity-60">
                  {[...Array(80)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-amber-500/60' : 'bg-white/10'}`} 
                      style={{ 
                        height: isPlaying ? `${Math.max(15, Math.random() * 90)}%` : '6px',
                        transitionDelay: `${i * 8}ms`
                      }}
                    ></div>
                  ))}
                </div>

                {/* The Control Center */}
                <div className="w-full max-w-4xl p-12 rounded-[50px] bg-white/5 border border-white/10 space-y-10 shadow-3xl relative backdrop-blur-3xl">
                  <div className="absolute -top-6 right-12 px-8 py-2 gold-bg text-black rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl z-20">Production: Ready</div>
                  
                  <div className="flex items-center justify-between flex-row-reverse border-b border-white/5 pb-10">
                    <div className="text-right">
                      <h4 className="font-bold text-3xl text-white mb-2">{currentResult.selection.dialect}</h4>
                      <p className="text-[10px] text-amber-500 font-bold tracking-[0.2em] uppercase">{currentResult.selection.type} — {currentResult.selection.field}</p>
                    </div>
                    <button 
                      onClick={() => downloadAudio(currentResult.audioBlobUrl, currentResult.id)}
                      className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 text-white/40 hover:text-amber-500 transition-all group shadow-inner"
                    >
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12 flex-row-reverse">
                    <div className="flex items-center gap-6 flex-row-reverse">
                      <button 
                        onClick={togglePlay}
                        className="h-24 w-24 rounded-full gold-bg text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_20px_40px_rgba(212,175,55,0.3)] relative group"
                      >
                        <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-10 group-hover:opacity-30"></div>
                        {isPlaying ? (
                          <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                          <svg className="h-10 w-10 translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                      <button 
                        onClick={restartAudio}
                        className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all shadow-inner"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                      </button>
                    </div>

                    <div className="flex-1 w-full space-y-4">
                      <div className="flex justify-between items-center flex-row-reverse text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">
                        <span>Duration: {formatTime(duration)}</span>
                        <span>Current: {formatTime(currentTime)}</span>
                      </div>
                      <div className="relative group h-8 flex items-center">
                        <input 
                          type="range"
                          min="0"
                          max={duration || 0}
                          step="0.01"
                          value={currentTime}
                          onChange={handleSeek}
                          className="absolute inset-0 w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer outline-none transition-all group-hover:h-1.5"
                          style={{
                            background: `linear-gradient(to left, #d4af37 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.05) ${(currentTime / duration) * 100}%)`,
                            direction: 'rtl'
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-5 flex-row-reverse">
                      <button 
                        onClick={toggleMute}
                        className="text-white/20 hover:text-amber-500 transition-colors"
                      >
                        {isMuted || volume === 0 ? (
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        ) : (
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM16 10a4 4 0 00-6.71-2.83l1.42 1.42A2 2 0 0114 10a2 2 0 01-2.71 1.83l1.42 1.42A4 4 0 0016 10z" clipRule="evenodd" /></svg>
                        )}
                      </button>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-white/5 rounded-full appearance-none cursor-pointer outline-none hover:bg-white/10"
                        style={{
                          background: `linear-gradient(to left, #d4af37 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.05) ${(isMuted ? 0 : volume) * 100}%)`,
                          direction: 'rtl'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white/10">
                  <div className="h-px w-16 bg-white/10"></div>
                  <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Studio Grade Sample: 24kHz / PCM</p>
                  <div className="h-px w-16 bg-white/10"></div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="mt-40 text-center relative z-10">
        <div className="h-px w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-10"></div>
        <p className="text-xs text-white/20 uppercase tracking-[0.8em] font-light">&copy; الصوت العربي</p>
        <p className="text-[9px] text-white/10 mt-2 tracking-widest uppercase">Powered by Gemini AI Engine</p>
      </footer>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default App;
