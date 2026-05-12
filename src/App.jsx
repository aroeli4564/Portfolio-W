import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { 
  User, History as HistoryIcon, Lightbulb, Cpu, Gamepad2, Layers, 
  Swords, Mail, ArrowUpRight, ChevronDown, Image as ImageIcon, Clock, X, Send
} from 'lucide-react';

const SECTIONS = ['profile', 'history', 'design', 'works'];

const MENU_ITEMS = [
  { id: 0, label: 'Profile', icon: <User size={14} /> },
  { id: 1, label: 'History', icon: <HistoryIcon size={14} /> },
  { id: 2, label: 'Design', icon: <Lightbulb size={14} /> },
  { id: 3, label: 'Works', icon: <Cpu size={14} /> },
];

const HISTORY_ITEMS = [
  { 
    id: 1, 
    project: "The First Khazan", 
    period: "2022.7 ~ 2026.4", 
    company: "Neople", 
    spec: "  PC(Steam) / Action RPG / UE4", 
    service: "Development / Live Service / China Launch Preparation",
    desc: "  하드코어 액션 RPG로 다크소울3와 비슷한 레벨 디자인. 그 외 컨텐츠 디자인.",
    role: "Level Design / Content Design",
    image: "https://raw.githubusercontent.com/aroeli4564/aroeli/main/tmp_4d80c94c-5905-4005-adb5-d72df8d06493.jpeg" 
  },
  { 
    id: 2, 
    project: "The Vanshee", 
    period: "2020.4 ~ 2022.5", 
    company: "Pixel Cruise", 
    spec: "PC / Action RPG / UE4", 
    desc: "",
    role: "Level Design / Combat Design / Content Design",
    image: "https://github.com/aroeli4564/aroeli/blob/main/tmp_426ca492-1d5c-44b0-bd4e-1149845b5d9d.jpeg?raw=true" 
  },
  { 
    id: 3, 
    project: "Arisia Chronicle", 
    period: "2019.1 ~ 2019.7", 
    company: "Supreme Games", 
    spec: "Open World RPG / Unity", 
    service: "Prototype Development",
    desc: "",
    role: "Game Design",
    image: "https://raw.githubusercontent.com/aroeli4564/aroeli/main/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-04-25%20022409.png" 
  },
  { 
    id: 4, 
    project: "Triumph Over Pain", 
    period: "2013.1 ~ 2015.8", 
    company: "Supreme Games", 
    spec: "Mobile / Action RPG / Unity", 
    service: "Development / Live Service",
    desc: "",
    role: "Level Design / Combat Design / Content Design",
    image: "https://raw.githubusercontent.com/aroeli4564/aroeli/main/TOPcb.jpg" 
  },
  { 
    id: 5, 
    project: "KRITIKA", 
    period: "2013.1 ~ 2015.8", 
    company: "Allm", 
    spec: "PC / Action RPG / Custom Engine", 
    service: "Development / Live Service",
    desc: "",
    role: "Level Design / Combat Design",
    image: "https://raw.githubusercontent.com/aroeli4564/aroeli/main/3d59c25a0e31813deb76549f20f47c37.jpg" 
  },
  { 
    id: 6, 
    project: "Howling Sword", 
    period: "2012.05 — 2012.11", 
    company: "Estsoft", 
    spec: "PC / Action RPG / Custom Engine", 
    desc: "북미 시장 최적화 리메이크 과정에서 조작 인터페이스와 전투 연출 로직 재기획.", 
    role: "Level Design / Combat Design",
    image: "https://raw.githubusercontent.com/aroeli4564/aroeli/main/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202026-04-25%20020319.png" 
  }
];

const DESIGN_DATA = {
  level: {
    title: "Level Design", 
    subtitle: "공간은 질문을 던지고, 플레이어는 답을 선택한다",
    thinking: "레벨 디자인은 길을 가르쳐주는 것이 아니라,\n공간이 전하는 이야기와 감정의 흐름을 따라가며, 규칙과 가능성 안에서 자신만의 길을 완성하게 설계하는 것이다.",
    principles: [
      { num: "01", title: "공간의 이야기", text: "공간의 서사와 지형의 흐름으로 나아갈 방향과 머물 이유를 시각적으로 이야기한다." }, 
      { num: "02", title: "규칙과 전투", text: "선명한 규칙과 전투 구조 속에서 다양한 선택과 결과가 플레이 경험으로 이어진다." }, 
      { num: "03", title: "탐험과 의외성", text: "숨겨진 길과 예상 밖의 사건, 강적과 보상의 발견으로 탐험의 긴장과 재미를 만든다." }
    ],    caseStudy: { project: "카잔 레벨 디자인 예시", desc: "자연광 유도 구조로 탐험의 재미를 극대화했습니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown", metrics: [{ val: "87%", lab: "Comp. Rate" }, { val: "4.8", lab: "Rating" }] },
        appliedCases: [
      { project: "Kritika Level Design", desc: "컨셉 기반 플레이 시나리오 기획 및 레벨 제작.", detailTitle: "Kritika Level Design", detailDesc: "A. 플레이 시나리오 컨셉 기획\n\n플레이 시나리오 제작 이유 = 일반 스테이지의 단순하고 반복적인 플레이 패턴을 탈피시키고 새로움을 전한다.\n\n- 해당 스테이지의 중심 컨셉에 어울리는 요소들을 뽑는다.\n- 뽑아진 아이디어는 정리하여 어떤 것들을 스테이지에 적용할 지 정한다.\n- 컨셉에서 나온 키워드를 대략적인 레벨 디자인을 진행한다.", detailLayout: "levelScenario", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" },
      { project: "적용 사례 2", desc: "레벨 디자인 적용 사례 2에 대한 상세 설명이 들어갑니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" },
      { project: "적용 사례 3", desc: "레벨 디자인 적용 사례 3에 대한 상세 설명이 들어갑니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" }
    ]
  },
  combat: {
    title: "Combat Design", 
    subtitle: "적은 플레이어를 막는 벽이 아니라, 살아 있는 위협이다",
    thinking: "전투 디자인은 단순히 강한 적을 만드는 것이 아니라,\n목적과 본능을 가진 살아 있는 위협을 설계하고, 플레이어가 자신만의 방법으로 돌파하게 만드는 것이다.",
    principles: [
      { num: "01", title: "존재의 언어", text: "현실의 생명감을 이어가는 자세, 움직임, 패턴으로 몬스터를 살아 있는 존재로 만들어낸다." }, 
      { num: "02", title: "대응의 규칙", text: "세밀하고 선명한 전조와 공격의 리듬, 분명한 빈틈을 통해 읽고 대응할 수 있는 전투를 만든다." }, 
      { num: "03", title: "숙련과 돌파", text: "패턴을 이해하고 빈틈을 파고들수록 위협은 공략 대상으로 바뀌고, 승리는 플레이어의 실력으로 남는다." }
    ],    caseStudy: { project: "전투 디자인에 대한 이해", desc: "언리얼4 프레임 데이터를 활용한 액션 동기화를 구현했습니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown", metrics: [{ val: "92%", lab: "Satisfaction" }, { val: "0.01s", lab: "Accuracy" }] },
        appliedCases: [
      { project: "전투 적용 사례 1", desc: "전투 시스템 적용 사례 1에 대한 상세 설명이 들어갑니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" },
      { project: "전투 적용 사례 2", desc: "전투 시스템 적용 사례 2에 대한 상세 설명이 들어갑니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" }
    ]
  },
  content: {
    title: "Content Design", 
    subtitle: "콘텐츠는 플레이어의 시간을 경험으로 바꾸는 설계다",
    thinking: "콘텐츠 디자인은 플레이어에게 단순한 과제를 주는 것이 아니라,\n도전과 보상, 성장과 발견을 연결해 플레이한 시간이 의미 있는 경험으로 남게 만드는 것이다.",
    principles: [
      { num: "01", title: "플레이의 목적", text: "퀘스트, 미션, 수집, 도전마다 플레이어가 움직여야 할 이유와 도달해야 할 목적을 만든다." }, 
      { num: "02", title: "경험의 밀도", text: "짧은 행동에도 발견, 선택, 보상이 이어지도록 콘텐츠의 밀도를 설계한다." }, 
      { num: "03", title: "성장의 연결", text: "콘텐츠를 완료한 결과가 캐릭터, 실력, 이해도, 다음 목표로 자연스럽게 이어지게 한다." }
    ],    caseStudy: { project: "Arisia", desc: "오픈월드 수집형 RPG 코어 루프 설계. 유저 유형별 시뮬레이션으로 경제 안정을 달성했습니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown", metrics: [{ val: "1.2M", lab: "Active User" }, { val: "Stable", lab: "Economy" }] },
    appliedCases: [
      { project: "콘텐츠 적용 사례 1", desc: "콘텐츠 구조 적용 사례 1에 대한 상세 설명이 들어갑니다.", image: "https://res-console.cloudinary.com/dfgvfwodg/thumbnails/v1/image/upload/v1777440653/TGV2ZWxfRVhfMV9udmZ5emo=/drilldown" }
    ]
  }
};

const VIEW_MODES = [
  { id: 'project', label: '프로젝트별 보기' },
  { id: 'discipline', label: '직무/분야별 보기' }
];

const WORKS_PROJECTS = [
  { id: 'all', label: 'All Projects' },
  { id: 'vanshee', label: 'The Vanshee' },
  { id: 'kritika', label: 'KRITIKA' },
  { id: 'arisia', label: 'Arisia Chronicle' }
];

const WORKS_DISCIPLINES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'level', label: '레벨 디자인' },
  { id: 'combat', label: '전투 기획' },
  { id: 'content', label: '콘텐츠/시스템' }
];

const WORKS_DATA = [
  { id: 1, projectId: 'vanshee', projectName: 'The Vanshee', disciplineId: 'level', disciplineLabel: '레벨 디자인', title: '심리스 월드 레벨 설계', desc: '언리얼 엔진4 기반의 오픈월드 탐험 동선 및 랜드마크 배치 기획. 플레이어의 시야를 유도하는 환경 지표를 설계했습니다.', image: null },
  { id: 2, projectId: 'vanshee', projectName: 'The Vanshee', disciplineId: 'combat', disciplineLabel: '전투 기획', title: '액션 동기화 및 피드백', desc: '프레임 단위 데이터 기반 히트스톱, 카메라 쉐이크 연출 기획. 액션의 타격감을 극대화하는 수치 밸런싱을 진행했습니다.', image: null },
  { id: 3, projectId: 'kritika', projectName: 'KRITIKA', disciplineId: 'combat', disciplineLabel: '전투 기획', title: '보스 몬스터 패턴 설계', desc: '초고속 액션 쾌감을 극대화한 보스 몬스터 AI 및 전투 패턴 설계. 리스크 앤 리턴이 명확한 전투 구도를 기획했습니다.', image: null },
  { id: 4, projectId: 'kritika', projectName: 'KRITIKA', disciplineId: 'level', disciplineLabel: '레벨 디자인', title: '지형 활용 전투 구역', desc: '입체적인 지형지물을 활용한 전투 구역 및 기믹 설계. 단순한 평면 전투를 탈피한 동적인 전투 환경을 제공했습니다.', image: null },
  { id: 5, projectId: 'arisia', projectName: 'Arisia Chronicle', disciplineId: 'content', disciplineLabel: '콘텐츠/시스템', title: '유저 성장 코어 루프', desc: '오픈월드 환경의 핵심 시스템 구조와 유저 성장 동선 정의. 플레이 목적성을 뚜렷하게 하는 보상 체계를 구축했습니다.', image: null },
  { id: 6, projectId: 'arisia', projectName: 'Arisia Chronicle', disciplineId: 'content', disciplineLabel: '콘텐츠/시스템', title: '경제 시스템 밸런싱', desc: '재화 인플레이션 방지를 위한 경제 Sink 모델 및 시뮬레이션. 장기 서비스를 위한 경제 안정성을 확보했습니다.', image: null },
];

const SectionFooter = memo(({ index, total }) => (
  <div className="w-full pt-5 pb-8 border-t border-slate-100 mt-auto opacity-70">
    <div className="max-w-[1300px] mx-auto px-8 md:px-12 lg:px-16 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 italic">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 border border-slate-200">
          <Gamepad2 size={12} />
        </div>
        <span>{index === total - 1 ? 'End of Portfolio' : 'End of Section'} — Archive.01</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-slate-300 font-bold">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        {index < total - 1 && (
          <div className="flex items-center gap-1 text-blue-600/50">
            <span className="hidden sm:inline">Scroll Down</span>
            <ChevronDown size={12} className="animate-bounce" />
          </div>
        )}
      </div>
    </div>
  </div>
));

const HistoryTextBlock = memo(({ item, align = 'left' }) => {
  const isRight = align === 'right';
  const justify = isRight ? 'justify-end' : 'justify-start';
  const textAlign = isRight ? 'text-right' : 'text-left';
  const contentIndent = isRight ? 'mr-[15px]' : 'ml-[15px]';
  const borderSide = isRight ? 'border-r pr-[13px]' : 'border-l pl-[13px]';
  const scaleOrigin = isRight ? 'origin-top-right' : 'origin-top-left';
  const displayPeriod = item.id === 6 ? '2012.05 ~ 2012.11' : item.period;
  const displaySpec = item.id === 1 ? 'PC(Steam) / Action RPG / UE4' : item.spec?.trim();
  const displayScope = item.service || 'Development';

  return (
    <div
      className={`w-[468px] max-w-none text-black ${textAlign}`}
      style={{ fontFamily: '"Century Schoolbook", "Century Schoolbook L", Georgia, serif' }}
    >
      <div className={`relative z-20 flex h-[16px] items-center gap-3 mb-[34px] whitespace-nowrap ${justify}`}>
        {displayPeriod && (
          <span className="font-sans text-slate-500 font-bold text-[12px] tracking-[0.2em] uppercase leading-[16px]">
            {displayPeriod}
          </span>
        )}
        {item.company && <span className="h-[16px] border-l border-[#9a9a9a]"></span>}
        {item.company && <span className="text-[15px] leading-[16px] italic font-light text-[#777777]">{item.company}</span>}
      </div>

      <div className={`${scaleOrigin} scale-75`}>
        {item.project && (
          <h4 className="font-serif italic font-normal text-black text-[40px] leading-tight tracking-tight whitespace-nowrap mb-[15px]">
            {item.project}
          </h4>
        )}
        {displaySpec && (
          <p className={`${contentIndent} text-[17px] leading-none italic font-light text-[#6f6f6f] whitespace-nowrap mb-[31px]`}>
            {displaySpec}
          </p>
        )}

        <div className={`${contentIndent} font-sans`}>
          {displayScope && (
            <div className="mb-[27px]">
              <h5 className="mb-[9px] text-[21px] leading-none font-normal text-[#6f6f6f]">Project Scope</h5>
              <p className={`${borderSide} border-[#777777] text-[18px] leading-none font-light text-[#435f86] whitespace-nowrap`}>
                {displayScope}
              </p>
            </div>
          )}

          {item.role && (
            <div>
              <h5 className="mb-[9px] text-[21px] leading-none font-normal text-[#6f6f6f]">Responsibilities</h5>
              <p className={`${borderSide} border-[#777777] text-[18px] leading-none font-light text-[#435f86] whitespace-nowrap`}>
                {item.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState('level');
  const [worksViewMode, setWorksViewMode] = useState('project');
  const [worksActiveTab, setWorksActiveTab] = useState('all');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [navIntroActive, setNavIntroActive] = useState(true);
  const [designIntroActive, setDesignIntroActive] = useState(false);
  
  const profileScrollRef = useRef(null);
  const historyScrollRef = useRef(null);
  const methodScrollRef = useRef(null);
  const worksScrollRef = useRef(null);
  const scrollBufferRef = useRef({ direction: 0, count: 0 });

  const moveSection = useCallback((index) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(index);
    setTimeout(() => {
      setIsScrolling(false);
      scrollBufferRef.current = { direction: 0, count: 0 };
    }, 950);
  }, [isScrolling]);

  useEffect(() => {
    const navTimer = setTimeout(() => setNavIntroActive(false), 3000);
    return () => clearTimeout(navTimer);
  }, []);

  useEffect(() => {
    if (currentSection === 2) {
      const startTimer = setTimeout(() => setDesignIntroActive(true), 500);
      const stopTimer = setTimeout(() => setDesignIntroActive(false), 2500);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
      };
    } else {
      setDesignIntroActive(false);
    }
  }, [currentSection]);

  const handleWheel = useCallback((e) => {
    if (isScrolling || isContactOpen || selectedProject) return;
    const delta = e.deltaY;
    const direction = delta > 0 ? 1 : -1;
    if (Math.abs(delta) < 15) return;

    let isAtTop = true;
    let isAtBottom = true;

    if (currentSection === 0 && profileScrollRef.current) {
      const el = profileScrollRef.current;
      isAtTop = el.scrollTop <= 5;
      isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    } else if (currentSection === 1 && historyScrollRef.current) {
      const el = historyScrollRef.current;
      isAtTop = el.scrollTop <= 5;
      isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    } else if (currentSection === 2 && methodScrollRef.current) {
      const el = methodScrollRef.current;
      isAtTop = el.scrollTop <= 5;
      isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    } else if (currentSection === 3 && worksScrollRef.current) {
      const el = worksScrollRef.current;
      isAtTop = el.scrollTop <= 5;
      isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    }

    const canMoveDown = direction === 1 && currentSection < SECTIONS.length - 1 && isAtBottom;
    const canMoveUp = direction === -1 && currentSection > 0 && isAtTop;

    if (canMoveDown || canMoveUp) {
      e.preventDefault();
      if (scrollBufferRef.current.direction !== direction) {
        scrollBufferRef.current = { direction: direction, count: 1 };
        return;
      } else {
        scrollBufferRef.current.count += 1;
        if (scrollBufferRef.current.count < 2) return;
      }
      moveSection(currentSection + direction);
      scrollBufferRef.current = { direction: 0, count: 0 };
    } else {
      scrollBufferRef.current = { direction: 0, count: 0 };
    }
  }, [currentSection, isScrolling, isContactOpen, selectedProject, moveSection]);

  const handleKeyDown = useCallback((e) => {
    if (isContactOpen || selectedProject || isScrolling) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      if (currentSection < SECTIONS.length - 1) moveSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (currentSection > 0) moveSection(currentSection - 1);
    }
  }, [currentSection, isScrolling, isContactOpen, selectedProject, moveSection]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  const scrollToHistoryItem = (id) => {
    const el = document.getElementById(`history-item-${id}`);
    if (el && historyScrollRef.current) {
      historyScrollRef.current.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  const currentDesign = DESIGN_DATA[activeDesignTab];

  return (
    <div className="fixed inset-0 bg-slate-200/50 overflow-auto selection:bg-blue-600 selection:text-white">
      <div className="w-[1200px] mx-auto h-full relative overflow-hidden bg-[#fcfdfe] shadow-[0_0_50px_rgba(0,0,0,0.05)] text-[#334155] font-sans">
        <style>
          {`
            .page-layer {
              position: absolute;
              top: 0; left: 0; width: 100%; height: 100%;
              transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1);
              will-change: transform;
            }
            @keyframes slide-up-reveal {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-reveal {
              animation: slide-up-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }
            @keyframes jelly-double {
              0%, 50%, 100% { transform: scale(1, 1); }
              10%, 60% { transform: scale(1.04, 0.96); }
              20%, 70% { transform: scale(0.96, 1.05); }
              30%, 80% { transform: scale(1.03, 0.98); }
            }
            @keyframes jelly-single {
              0% { transform: scale(1, 1); }
              25% { transform: scale(1.05, 0.95); }
              50% { transform: scale(0.97, 1.03); }
              75% { transform: scale(1.02, 0.98); }
              100% { transform: scale(1, 1); }
            }
            .pudding-target {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              width: 100%;
              height: 100%;
              will-change: transform;
              transform-origin: center bottom;
            }
            .animate-nav-intro-jelly { animation: jelly-double 1.8s cubic-bezier(0.4, 0, 0.2, 1); }
            .animate-design-intro-jelly { animation: jelly-single 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
            .hover-trigger:hover .pudding-target {
              animation: jelly-single 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .bg-grid-pattern {
              background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
              background-size: 32px 32px;
            }

            :root {
              --tab-height: 80px;
              --tab-width: 250px;
              --tabs-gap: 90px;
            }

            .design-layout-root {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
            }

            .design-tabs-container {
              display: flex;
              align-items: flex-end;
              justify-content: center;
              gap: 16px;
              width: 100%;
              max-width: 950px;
              margin: 0 auto;
              position: relative;
              z-index: 50;
              margin-bottom: -1px;
            }

            .custom-tab-btn {
              width: var(--tab-width);
              height: var(--tab-height);
              flex: 0 0 var(--tab-width);
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            }

            .tab-active-mask {
              position: absolute;
              left: 0;
              right: 0;
              bottom: -1px;
              height: 3px;
              background: white;
              z-index: 52;
            }
          `}
        </style>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full z-[100] transition-all duration-500 bg-white/80 backdrop-blur-md shadow-sm py-5 md:py-6">
          <div className="max-w-[1300px] mx-auto px-8 md:px-12 flex items-center justify-between relative">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Gamepad2 size={20} />
              </div>
              <span className="hidden sm:block font-light uppercase tracking-widest text-base md:text-lg text-slate-900">Archive.01</span>
            </div>
            <div className="flex absolute left-1/2 transform -translate-x-1/2 items-center bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-slate-200/50 shadow-sm">
              {MENU_ITEMS.map((item, index) => (
                <button key={item.id} onClick={() => moveSection(item.id)} className={`hover-trigger relative flex items-center justify-center px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${currentSection === item.id ? 'bg-slate-900 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-slate-900'}`}>
                  <span style={{ animationDelay: `${index * 0.1}s` }} className={`pudding-target ${navIntroActive ? 'animate-nav-intro-jelly' : ''}`}>
                    {currentSection === item.id && <span className="flex-shrink-0">{item.icon}</span>}
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="hidden lg:flex text-[10px] font-bold text-blue-600 uppercase items-center gap-2 shrink-0 tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div> 
              <span>Active Status</span>
            </div>
          </div>
        </nav>

        {/* Content Layers */}
        <div className="relative w-full h-full">
          {/* Profile Section */}
          <div className="page-layer bg-[#fcfdfe] bg-grid-pattern" style={{ zIndex: 10 }}>
            <section className="h-full w-full flex flex-col pt-24 md:pt-28 overflow-hidden">
              <div ref={profileScrollRef} className="flex-grow overflow-y-auto scrollbar-hide flex flex-col">
                <div className="flex-grow px-8 md:px-12 lg:px-16">
                  <div className="max-w-[1300px] w-full mx-auto pt-8 md:pt-12 pb-16">
                    <main className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start w-full">
                      <div className={`col-span-1 md:col-span-4 ${currentSection === 0 ? 'animate-reveal' : ''}`}>
                        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                          <div className="flex flex-col items-start w-full">
                            <div className="w-full aspect-[4/5] bg-[#ebf0f5]/50 rounded-[2rem] flex flex-col items-center justify-center mb-8 relative group overflow-hidden">
                              <img
                                src="https://cdn.newsworks.co.kr/news/photo/202002/433057_327801_345.jpg"
                                alt="Designer Profile"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "https://via.placeholder.com/400x500/ebf0f5/94a3b8?text=NO+IMAGE";
                                }}
                              />
                            </div>
                            <div className="w-full space-y-6 text-left">
                              <div className="space-y-1">
                                <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-slate-900 leading-none">KIM PLANNER</h2>
                                <p className="text-[12px] md:text-[13px] font-serif italic text-slate-400 mt-2 block">SR. SYSTEMS DESIGNER</p>
                              </div>
                              <div className="pt-6 border-t border-slate-50 space-y-4">
                                <div className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                                  <Mail size={18}/><span className="text-[13px] font-medium">planner@studio.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                  <span className="text-[13px] font-medium">linkedin.com/in/planner</span>
                                </div>
                              </div>
                              <button onClick={() => setIsContactOpen(true)} className="w-full py-5 bg-[#0f172a] text-white rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg active:scale-95 mt-2">CONTACT ME</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`col-span-1 md:col-span-8 space-y-12 ${currentSection === 0 ? 'animate-reveal' : ''}`} style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md border border-slate-100/50">
                            <Gamepad2 size={14} /> PLANNING ARCHITECTURE
                          </div>
                          <div className="space-y-6">
                            <h1 className="text-3xl md:text-5xl font-light text-slate-900 leading-tight tracking-wide">기획의 논리가 <span className="font-serif italic text-blue-600">경험의 재미를</span><br /> 결정합니다.</h1>
                            <p className="text-[15px] md:text-[16px] text-slate-500 leading-relaxed font-medium w-full max-w-2xl">레벨, 전투, 시스템 기획의 균형을 통해 완성도 높은 코어 루프를 구축합니다. 데이터 시뮬레이션을 통해 모든 시스템의 안정성을 검증하고, 엔진 프로토타이핑으로 기획의 가치를 실시간으로 증명하는 기획자입니다.</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                          <div className="space-y-8">
                            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.4em]">TECHNICAL EXPERTISE</h4>
                            <div className="space-y-6">
                              {["Level Design", "Combat Logic", "Economy Model"].map(t => (
                                <div key={t} className="text-lg font-light tracking-widest uppercase text-slate-900 leading-none hover:text-blue-600 transition-colors cursor-default">{t}</div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-8">
                            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.4em]">TOOL STACK</h4>
                            <div className="flex flex-wrap gap-2.5">
                              {['UE5', 'BLUEPRINT', 'EXCEL SIM.', 'JIRA', 'PERFORCE'].map(tool => (
                                <span key={tool} className="px-4 py-2 bg-slate-50 border border-slate-100/50 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 rounded-md shadow-sm hover:border-blue-200 transition-colors cursor-default">{tool}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
                <SectionFooter index={0} total={SECTIONS.length} />
              </div>
            </section>
          </div>

          {/* History Section */}
          <div className="page-layer bg-white" style={{ zIndex: 20, transform: currentSection >= 1 ? 'translateY(0)' : 'translateY(100%)' }}>
            <section className="h-full w-full flex flex-col pt-24 md:pt-28 overflow-hidden">
              <div ref={historyScrollRef} className="flex-grow overflow-y-auto scrollbar-hide scroll-smooth flex flex-col">
                <div className="flex-grow px-8 md:px-12 lg:px-16">
                  <div className={`max-w-[1300px] mx-auto pb-24 pt-12 ${currentSection === 1 ? 'animate-reveal' : ''}`}>
                    <div className="text-center space-y-4 mb-16">
                       <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">Experience Timeline</span>
                       <h3 className="text-5xl font-light text-slate-900 uppercase tracking-widest leading-none whitespace-nowrap">History</h3>
                       <p className="text-[16px] font-light text-slate-400 tracking-[0.12em]">기획의 깊이를 더해온 지난 시간들의 기록입니다.</p>
                    </div>
                    <div className="max-w-[1000px] mx-auto mb-32 hidden md:block px-4 mt-8">
                      <div className="relative flex justify-between items-start w-full">
                        <div className="absolute top-[107px] left-10 right-10 h-px bg-slate-200 z-0"></div>
                        {[...HISTORY_ITEMS].reverse().map((item) => (
                          <div key={`mini-${item.id}`} onClick={() => scrollToHistoryItem(item.id)} className="flex flex-col items-center group cursor-pointer w-32 relative z-10 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-white border-4 border-slate-50 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-4 flex items-center justify-center overflow-hidden z-10 group-hover:border-blue-50 group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.15)] transition-all duration-300 bg-slate-50">
                              {item.image ? (
                                <img src={item.image} alt={item.project} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <ImageIcon size={20} className="text-slate-300 opacity-50 group-hover:text-blue-500 group-hover:opacity-100 transition-colors" />
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors h-4 leading-none bg-white px-2">{item.period.slice(0, 4)}</span>
                            <div className="w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:scale-[1.5] transition-all duration-300 shadow-sm mb-5"></div>
                            <div className="text-center h-12 flex flex-col items-center justify-start">
                              <h5 className="text-[12px] font-light uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1 line-clamp-1 px-1">{item.project}</h5>
                              <span className="text-[10px] font-serif italic text-slate-400 block scale-90">{item.company}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative max-w-[1000px] mx-auto px-4 mt-16">
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200"></div>
                      {HISTORY_ITEMS.map((item, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                          <div id={`history-item-${item.id}`} key={item.id} className="relative flex flex-row items-start w-full mb-24 group">
                            <div className={`absolute top-[24px] h-px w-12 bg-slate-300 group-hover:bg-blue-200 transition-colors duration-500 z-10 ${isEven ? 'left-1/2' : 'right-1/2'}`}></div>
                            <div className="absolute left-1/2 top-[19px] -translate-x-1/2 w-2.5 h-2.5 border-2 border-slate-300 bg-white rounded-full group-hover:border-blue-500 transition-colors duration-500 z-20"></div>
                            <div className={`w-1/2 pl-0 pr-12 relative ${!isEven ? 'order-1 mt-0' : ''}`}>
                              {isEven ? (
                                <div className="w-full aspect-[16/9] bg-white border border-slate-200 shadow-[0_12px_34px_rgba(15,23,42,0.08)] overflow-hidden relative group-hover:border-blue-200 group-hover:shadow-[0_22px_48px_rgba(15,23,42,0.14)] group-hover:-translate-y-2 transition-all duration-700 z-10 flex items-center justify-center p-2">
                                  {item.image ? <img src={item.image} alt={item.project} className={`w-full h-full transition-transform duration-700 ${item.id === 6 ? 'object-cover object-top' : 'object-contain'}`} /> : <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg"><ImageIcon size={40} className="text-slate-300 opacity-30 group-hover:text-blue-500 group-hover:opacity-100 transition-colors duration-500" /></div>}
                                </div>
                              ) : (
                                <div className="flex flex-col items-end text-right pt-4 w-full min-w-0">
                                  <HistoryTextBlock item={item} align="right" />
                                </div>
                              )}
                            </div>
                            <div className={`w-1/2 pl-12 relative ${isEven ? 'mt-0' : ''} ${!isEven ? 'order-2' : ''}`}>
                              {!isEven ? (
                                <div className="w-full aspect-[16/9] bg-white border border-slate-200 shadow-[0_12px_34px_rgba(15,23,42,0.08)] overflow-hidden relative group-hover:border-blue-200 group-hover:shadow-[0_22px_48px_rgba(15,23,42,0.14)] group-hover:-translate-y-2 transition-all duration-700 z-10 flex items-center justify-center p-2">
                                  {item.image ? <img src={item.image} alt={item.project} className={`w-full h-full transition-transform duration-700 ${item.id === 6 ? 'object-cover object-top' : 'object-contain'}`} /> : <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg"><ImageIcon size={40} className="text-slate-300 opacity-30 group-hover:text-blue-500 group-hover:opacity-100 transition-colors duration-500" /></div>}
                                </div>
                              ) : (
                                <div className="flex flex-col items-start text-left pt-4 w-full min-w-0">
                                  <HistoryTextBlock item={item} align="left" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="max-w-[1000px] mx-auto mt-24 md:mt-32 mb-12 hidden md:block px-4">
                      <div className="relative flex justify-between items-start w-full">
                        <div className="absolute top-[35px] left-10 right-10 h-px bg-slate-200 z-0"></div>
                        {[...HISTORY_ITEMS].reverse().map((item) => (
                          <div key={`mini-bottom-${item.id}`} onClick={() => scrollToHistoryItem(item.id)} className="flex flex-col items-center group cursor-pointer w-32 relative z-10 hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-600 transition-colors h-4 leading-none bg-white px-2">{item.period.slice(0, 4)}</span>
                            <div className="w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:scale-[1.5] transition-all duration-300 shadow-sm mb-5"></div>
                            <div className="text-center h-12 flex flex-col items-center justify-start">
                              <h5 className="text-[12px] font-light uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1 line-clamp-1 px-1">{item.project}</h5>
                              <span className="text-[10px] font-serif italic text-slate-400 block scale-90">{item.company}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <SectionFooter index={1} total={SECTIONS.length} />
              </div>
            </section>
          </div>

          {/* Design Section */}
          <div className="page-layer bg-[#fcfdfe]" style={{ zIndex: 30, transform: currentSection >= 2 ? 'translateY(0)' : 'translateY(100%)' }}>
            <section className="h-full w-full flex flex-col pt-24 md:pt-28 overflow-hidden">
              <div ref={methodScrollRef} className="flex-grow overflow-y-auto scrollbar-hide flex flex-col">
                <div className="flex-grow px-8 md:px-12 lg:px-16">
                  <div className={`max-w-[1300px] mx-auto pb-20 pt-12 design-layout-root`}>
                    <div className="space-y-4 text-center w-full">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">Core Principles</span>
                      <h3 className="text-4xl md:text-5xl font-light text-slate-900 uppercase tracking-widest leading-none">Design Philosophy</h3>
                      <p className="mb-6 text-[16px] font-light text-slate-400 tracking-[0.12em]">게임 디자인에 대한 관점입니다.</p>
                    </div>

                    {/* 상단 여백 (Spacer) */}
                    <div className="hidden md:block" style={{ height: 'var(--tabs-gap)' }}></div>
                    <div className="md:hidden h-12"></div>

                    <div className="relative w-full flex flex-col items-center">
                      <div className="design-tabs-container">
                        {['level', 'combat', 'content'].map((tabId, idx) => {
                          const isActive = activeDesignTab === tabId;
                          return (
                            <button 
                              key={tabId} 
                              onClick={() => setActiveDesignTab(tabId)} 
                              className={`custom-tab-btn ${isActive ? 'is-active' : ''} hover-trigger flex flex-col items-center justify-center transition-all duration-300 relative px-2 ${
                                isActive 
                                ? 'bg-white text-slate-900 rounded-t-[3rem] border-t border-l border-r border-slate-100 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]' 
                                : 'bg-transparent text-slate-400 hover:text-slate-600 rounded-t-[2.5rem] border border-transparent hover:bg-white/50'
                              }`}
                              style={{ zIndex: isActive ? 51 : 40 }}
                            >
                              {isActive && (
                                <>
                                  <div className="absolute -top-11 left-1/2 z-[-1] h-24 w-24 -translate-x-1/2 rounded-full bg-white shadow-[0_-14px_28px_rgba(0,0,0,0.025)]"></div>
                                  <div className="absolute -top-3 left-1/2 z-[-1] h-10 w-28 -translate-x-1/2 bg-white"></div>
                                </>
                              )}
                              {isActive && <div className="tab-active-mask"></div>}
                              <span style={{ animationDelay: `${idx * 0.1}s` }} className={`pudding-target flex-col gap-1.5 w-full ${designIntroActive ? 'animate-design-intro-jelly' : ''}`}>
                                <div className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-3 text-blue-600' : 'scale-100 opacity-60'}`}>
                                  {tabId === 'level' ? <Layers size={18} strokeWidth={isActive ? 2.5 : 1.5} /> : tabId === 'combat' ? <Swords size={18} strokeWidth={isActive ? 2.5 : 1.5} /> : <Clock size={18} strokeWidth={isActive ? 2.5 : 1.5} />}
                                </div>
                                <span className={`text-[13px] sm:text-[16px] md:text-[21px] uppercase tracking-[0.05em] font-light whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                  {tabId} Design
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      
                      <div key={activeDesignTab} className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100 animate-reveal w-full relative" style={{ zIndex: 10 }}>
                        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start">
                          <div className="md:col-span-7 space-y-10">
                            <div className="space-y-4">
                              <h4 className="text-2xl md:text-3xl font-serif italic text-slate-500/80 tracking-tight leading-tight font-normal">{currentDesign.title}</h4>
                              <p className="text-[16px] md:text-[17px] font-serif italic text-blue-600/70 block mt-1 mb-6">{currentDesign.subtitle}</p>
                              <p className="text-[15px] text-slate-500 leading-relaxed font-medium max-w-2xl whitespace-pre-wrap">{currentDesign.thinking}</p>
                            </div>
                            <div className="pt-8 border-t border-slate-100">
                              <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-6">Core Principles</h5>
                              <div className="flex flex-col gap-3">
                                {currentDesign.principles.map((p, i) => (
                                  <div key={i} className="flex flex-col sm:flex-row sm:items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0 relative pl-4">
                                    <div className="absolute left-0 top-1 bottom-4 w-[3px] bg-blue-600 rounded-full opacity-80"></div>
                                    <div className="flex items-center gap-2 sm:w-[150px] shrink-0 pt-[2px]">
                                      <span className="text-[13px] font-bold text-blue-600 opacity-60 leading-none">{p.num}</span>
                                      <div className="text-[13px] font-bold tracking-widest uppercase text-slate-900 leading-tight">{p.title}</div>
                                    </div>
                                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium whitespace-pre-wrap sm:flex-grow">{p.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-5 space-y-6">
                            <div className="bg-slate-50/50 rounded-[3rem] p-10 border border-slate-100 relative overflow-hidden group cursor-pointer hover:bg-white hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" onClick={() => setSelectedProject({ title: currentDesign.caseStudy.project, desc: currentDesign.caseStudy.desc, image: currentDesign.caseStudy.image, isDesignCase: true })}>
                              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full"></div>
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white shadow-sm text-slate-400 text-[10px] font-bold rounded-md mb-6 uppercase tracking-[0.2em] border border-slate-100/50">대표 사례</span>
                              <h4 className="text-2xl font-light uppercase tracking-widest mb-6 leading-tight text-slate-900">{currentDesign.caseStudy.project}</h4>
                              <p className="text-slate-500 text-[14px] leading-relaxed mb-10 font-medium">{currentDesign.caseStudy.desc}</p>
                              <div className="grid grid-cols-2 gap-4">
                                {currentDesign.caseStudy.metrics.map((m, i) => (
                                  <div key={i} className="bg-white shadow-sm p-4 rounded-2xl text-center border border-slate-100/50 transition-transform hover:scale-105">
                                    <div className="text-xl font-light text-slate-900">{m.val}</div>
                                    <div className="text-[9px] text-slate-400 uppercase font-bold mt-1 tracking-widest">{m.lab}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 복구된 '적용 사례' 섹션 */}
                        <div className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-slate-100">
                          <h5 className="text-[12px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-6 px-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>적용 사례
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentDesign.appliedCases.map((caseItem, idx) => (
                              <div key={idx} className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden group hover:bg-white hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer" onClick={() => setSelectedProject({ title: caseItem.detailTitle || caseItem.project, desc: caseItem.detailDesc || caseItem.desc, image: caseItem.image, detailLayout: caseItem.detailLayout, isDesignCase: true })}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] rounded-full group-hover:bg-blue-600/10 transition-colors duration-500"></div>
                                <h4 className="text-xl font-light uppercase tracking-widest mb-3 leading-tight text-slate-900">{caseItem.project}</h4>
                                <p className="text-slate-500 text-[13.5px] leading-relaxed font-medium relative z-10">{caseItem.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <SectionFooter index={2} total={SECTIONS.length} />
              </div>
            </section>
          </div>

          {/* Works Section */}
          <div className="page-layer bg-white" style={{ zIndex: 40, transform: currentSection >= 3 ? 'translateY(0)' : 'translateY(100%)' }}>
            <section className="h-full w-full flex flex-col pt-24 md:pt-28 overflow-hidden">
              <div ref={worksScrollRef} className="flex-grow overflow-y-auto scrollbar-hide flex flex-col">
                <div className="flex-grow px-8 md:px-12 lg:px-16">
                  <div className={`max-w-[1300px] w-full mx-auto space-y-12 pb-20 pt-8 md:pt-12 ${currentSection === 3 ? 'animate-reveal' : ''}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-6">
                      <div className="space-y-2 text-left">
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">Portfolio</span>
                        <h3 className="text-4xl md:text-5xl font-light text-slate-900 uppercase tracking-widest leading-none">Selected Works</h3>
                      </div>
                      <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
                        {VIEW_MODES.map(mode => (
                          <button key={mode.id} onClick={() => { setWorksViewMode(mode.id); setWorksActiveTab('all'); }} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${worksViewMode === mode.id ? 'bg-white text-slate-900 shadow-md scale-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}`}>
                            {mode.id === 'project' ? <Gamepad2 size={16} /> : <Layers size={16} />}
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(worksViewMode === 'project' ? WORKS_PROJECTS : WORKS_DISCIPLINES).map((tab) => (
                        <button key={tab.id} onClick={() => setWorksActiveTab(tab.id)} className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ${worksActiveTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'}`}>{tab.label}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                      {WORKS_DATA.filter(work => { if (worksViewMode === 'project') return worksActiveTab === 'all' || work.projectId === worksActiveTab; return worksActiveTab === 'all' || work.disciplineId === worksActiveTab; }).map((work) => (
                        <div key={work.id} onClick={() => setSelectedProject(work)} className="bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer overflow-hidden flex flex-col">
                          <div className={`w-full aspect-[4/3] bg-slate-50 relative overflow-hidden flex items-center justify-center`}>
                            {work.image ? <img src={work.image} alt={work.title} className="w-full h-full object-cover" /> : <ImageIcon size={48} className="text-slate-300" />}
                            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"><ArrowUpRight size={18} className="text-slate-900" /></div>
                            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{work.projectName}</div>
                          </div>
                          <div className="p-8 flex-grow flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100/50 px-3 py-1.5 rounded-md uppercase tracking-[0.2em] w-fit mb-4">{work.disciplineLabel}</span>
                            <span className="text-[12px] font-medium text-slate-400 italic mb-2 block font-serif">{work.projectName}</span>
                            <h4 className="text-xl md:text-2xl font-light uppercase tracking-widest text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{work.title}</h4>
                            <p className="text-[14px] text-slate-500 leading-relaxed line-clamp-2 font-medium mb-4 flex-grow">{work.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <SectionFooter index={3} total={SECTIONS.length} />
              </div>
            </section>
          </div>
        </div>

        {/* Modals */}
        {isContactOpen && (
          <div className="absolute inset-0 z-[200] flex items-center justify-center p-6 animate-reveal">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}></div>
            <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 p-12 space-y-8">
              <div className="flex justify-between items-center">
                <h4 className="text-3xl font-light uppercase tracking-widest text-slate-900">GET IN TOUCH</h4>
                <button onClick={() => setIsContactOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <div className="space-y-4">
                <input type="email" placeholder="your@email.com" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors" />
                <textarea rows="4" placeholder="How can I help you?" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors resize-none" />
              </div>
              <button onClick={() => setIsContactOpen(false)} className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3"><Send size={16} /> SEND MESSAGE</button>
            </div>
          </div>
        )}

        {selectedProject && (
          <div className="absolute inset-0 z-[200] flex items-center justify-center p-4 md:p-6 animate-reveal">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
            <div className={`bg-white w-full ${selectedProject.detailLayout === 'levelScenario' ? 'max-w-[920px] rounded-[1.5rem]' : 'max-w-4xl rounded-[3rem]'} shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[95vh] md:max-h-[90vh]`}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors shadow-sm z-50"><X size={20} className="text-slate-900"/></button>
              {!selectedProject.isDesignCase && <div className="relative w-full h-48 md:h-64 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">{selectedProject.image ? <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" /> : <ImageIcon size={64} className="text-slate-300" />}</div>}
              <div className={`${selectedProject.detailLayout === 'levelScenario' ? 'px-6 pb-6 pt-12 md:px-9 md:pb-9 md:pt-16' : 'p-8 md:p-14'} overflow-y-auto scrollbar-hide flex-grow`}>
                {selectedProject.detailLayout === 'levelScenario' ? (
                  <div className="bg-white text-slate-700">
                    <div className="relative h-[5.75rem] md:h-[6.75rem] mb-8 border-b border-slate-100">
                      <div className="absolute left-1/2 bottom-[-1px] -translate-x-1/2 w-[320px] md:w-[420px] h-[76px] md:h-[88px] bg-white rounded-t-[4rem] shadow-[0_-10px_35px_rgba(15,23,42,0.05)] flex flex-col items-center justify-end pb-5">
                        <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center -mt-12 mb-2 relative z-20">
                          <Layers size={18} className="text-blue-600" strokeWidth={2.5} />
                        </div>
                        <div className="text-[18px] md:text-[22px] font-light uppercase tracking-[0.08em] text-slate-900 leading-none whitespace-nowrap">Level Design</div>
                      </div>
                    </div>

                    <header className="mb-7 md:mb-8 pr-12">
                      <div className="flex items-start gap-4 md:gap-5">
                        <span className="text-4xl md:text-5xl leading-none font-light text-blue-600/80 mt-1">1</span>
                        <div>
                          <span className="block text-[10px] font-bold tracking-[0.28em] text-slate-300 mb-2">크리티카 레벨 디자인</span>
                          <p className="mt-3 text-[15px] md:text-[18px] font-serif italic text-blue-600/70 leading-tight">
                            {'기획의도를 통한 레벨 디자인'}
                          </p>
                        </div>
                      </div>
                    </header>

                    <section className="mb-6 md:mb-7 pl-0 md:pl-8">
                      <h5 className="text-lg md:text-xl font-bold text-slate-700 mb-2">{'A. 플레이 시나리오 컨셉 기획'}</h5>
                      <p className="text-[13px] md:text-[15px] leading-relaxed text-slate-600 font-medium max-w-5xl mb-4">
                        {'플레이 시나리오 제작 이유 = 일반 스테이지의 단순하고 반복적인 플레이 패턴을 탈피시키고 새로움을 전한다.'}
                      </p>
                      <ul className="space-y-1 text-[13px] md:text-[14px] leading-relaxed text-slate-500 font-medium">
                        <li>{'- 해당 스테이지의 중심 컨셉에 어울리는 요소들을 뽑는다.'}</li>
                        <li>{'- 뽑아진 아이디어는 정리하여 어떤 것들을 스테이지에 적용할 지 정한다.'}</li>
                        <li>{'- 컨셉에서 나온 키워드를 대략적인 레벨 디자인을 진행한다.'}</li>
                      </ul>
                    </section>

                    <section className="grid md:grid-cols-[1fr_40px_2.15fr] gap-3 md:gap-4 items-center mb-5 md:mb-6">
                      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 py-1.5 text-center text-[12px] md:text-[14px] font-bold text-slate-700">{'스테이지 컨셉'}</div>
                        <div className="p-4 md:p-4 text-[12px] md:text-[14px] text-slate-700 font-semibold leading-relaxed whitespace-nowrap">
                          <span className="inline-flex px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-bold mr-1">{'해적들의 소굴'}</span>
                          <span>{'보물이 숨겨진 섬.'}</span>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-center">
                        <div className="h-px w-full bg-slate-200 relative">
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t border-r border-slate-300 rotate-45"></span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 py-1.5 text-center text-[12px] md:text-[14px] font-bold text-slate-700">{'컨셉 상황 설정'}</div>
                        <div className="divide-y divide-slate-100 text-[12px] md:text-[13px] leading-snug text-slate-600 font-medium">
                          <p className="p-2.5 md:p-3 bg-blue-50/70 text-slate-800"><b>{'1. 어드벤처'}</b>{' : 다양한 퍼즐적 요소, 혹은 다양한 장치가 필요. (ex: 점프 벽올라가기)'}</p>
                          <p className="p-2.5 md:p-3"><b>{'2. 성장형 재미'}</b>{' : 순서에 상관없이 재미를 통한 우회로.'}</p>
                          <p className="p-2.5 md:p-3"><b>{'3. 시야'}</b>{' : 몬스터의 시야를 조절한 플레이 패턴 유도.'}</p>
                          <p className="p-2.5 md:p-3 bg-blue-50/70 text-slate-800"><b>{'4. 탈출'}</b>{' : 준비된 함정을 탈출하는 형태의 플레이 유도.'}</p>
                          <p className="p-2.5 md:p-3"><b>{'5. 보물'}</b>{' : 플레이어의 수집 감성을 자극. RPG팀 협의 우선.'}</p>
                        </div>
                      </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-3 md:gap-4 rounded-2xl border border-slate-200 bg-white p-3 md:p-4 shadow-sm">
                      <div className="aspect-[16/9] rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-300">
                        <ImageIcon size={40} />
                        <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em]">Sketch Image</span>
                      </div>
                      <div className="aspect-[16/9] rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-300">
                        <ImageIcon size={40} />
                        <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em]">Level Screenshot</span>
                      </div>
                    </section>
                  </div>                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-3 mb-6 pr-12"><span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100/50 px-3 py-1.5 rounded-md uppercase tracking-[0.2em]">{selectedProject.disciplineLabel || selectedProject.categoryLabel || 'Case Study'}</span>{selectedProject.projectName && <span className="text-[13px] font-serif italic text-slate-400 border-l border-slate-200 pl-3">{selectedProject.projectName}</span>}</div>
                    <h4 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-slate-900 mb-10">{selectedProject.title}</h4>
                    <div className="space-y-6">
                      <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.4em] border-b border-slate-100 pb-2">Task Details</h5>
                      <p className="text-[15px] md:text-[16px] text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{selectedProject.desc}</p>
                    </div>
                    {selectedProject.isDesignCase && selectedProject.image && <div className="mt-10 mb-4 w-full flex justify-center items-center bg-slate-50 rounded-2xl border border-slate-100 p-4"><img src={selectedProject.image} alt={selectedProject.title} className="max-w-full h-auto rounded-xl shadow-sm object-contain" style={{ maxHeight: '500px' }} /></div>}
                  </>
                )}
                <div className="mt-12 pt-8 border-t border-slate-100"><button onClick={() => setSelectedProject(null)} className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">Close Detail</button></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
