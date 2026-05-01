import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ko' | 'en' | 'my';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.programs': '교육 프로그램',
    'nav.football': '축구팀',
    'nav.news': '소식',
    'nav.newsletter': '소식지',
    'nav.support': '지원하기',
    'nav.about': '소개',
    'nav.contact': '연락처',
    'nav.donate': '후원하기',

    // Common
    'common.features': '특징',
    'common.weekdays': '월-금: 오전 9시 - 오후 6시',
    'common.saturday': '토: 오전 9시 - 오후 2시',
    'common.sunday': '일: 휴무',

    // Home page
    'home.hero.title': '등대 말레이시아',
    'home.hero.subtitle': '난민 청소년을 위한 희망의 등대',
    'home.hero.description': '말레이시아의 난민 청소년들에게 교육과 직업훈련을 통해 새로운 희망과 미래를 제공합니다.',
    'home.hero.programs': '교육 프로그램 보기',
    'home.hero.support': '지원하기',

    'home.stats.students': '교육생',
    'home.stats.programs': '교육 프로그램',
    'home.stats.volunteers': '자원봉사자',
    'home.stats.years': '운영 년수',

    'home.mission.title': '우리의 사명',
    'home.mission.description': '등대 말레이시아는 말레이시아에 거주하는 난민 청소년들에게 실질적인 교육과 직업훈련을 제공하여 자립할 수 있는 능력을 기르고, 희망찬 미래를 만들어가도록 돕습니다.',
    'home.mission.point1': '무료 교육 프로그램 제공',
    'home.mission.point2': '실용적인 직업 기술 훈련',
    'home.mission.point3': '지속적인 멘토링과 지원',

    'home.programs.title': '교육 프로그램',
    'home.programs.subtitle': '난민 청소년들의 미래를 위한 다양한 교육 기회를 제공합니다',
    'home.programs.basic': '기초 교육',
    'home.programs.basic.desc': '한국어, 영어, 수학 등 기본 학습 능력 향상',
    'home.programs.practical': '실용 기술(준비중)',
    'home.programs.practical.desc': '바리스타, 제빵, 미용 등 취업 연계 기술 교육',
    'home.programs.it': 'IT 교육',
    'home.programs.it.desc': '컴퓨터 활용, 프로그래밍, 디지털 마케팅',
    'home.programs.arts': '예술 활동',
    'home.programs.arts.desc': '음악, 미술, 스포츠를 통한 정서적 안정',
    'home.programs.viewall': '모든 프로그램 보기',

    'home.values.title': '우리의 가치',
    'home.values.inclusion': '포용성',
    'home.values.inclusion.desc': '모든 배경의 청소년들을 환영하고 포용합니다',
    'home.values.practical': '실용성',
    'home.values.practical.desc': '실제 생활과 취업에 도움이 되는 교육을 제공합니다',
    'home.values.love': '사랑',
    'home.values.love.desc': '진정한 관심과 사랑으로 청소년들을 돌봅니다',

    'home.cta.title': '함께 만들어가는 희망',
    'home.cta.subtitle': '여러분의 관심과 참여로 더 많은 청소년들에게 희망을 전할 수 있습니다.',

    // Programs page
    'programs.hero.title': '교육 프로그램',
    'programs.hero.subtitle': '난민 청소년들의 미래를 위한 체계적이고 실용적인 교육 프로그램을 제공합니다.',

    'programs.academic.title': '기초 학습 프로그램',
    'programs.academic.subtitle': '언어와 기초 학습 능력 향상을 위한 프로그램',

    'programs.korean.title': '한국어 교육',
    'programs.korean.desc': '기초부터 고급까지 체계적인 한국어 학습',
    'programs.korean.feature1': '한글 읽기/쓰기 기초',
    'programs.korean.feature2': '일상 회화 연습',
    'programs.korean.feature3': '한국 문화 이해',
    'programs.korean.feature4': '취업용 한국어',

    'programs.english.title': '영어 교육',
    'programs.english.desc': '실용적인 영어 의사소통 능력 향상',
    'programs.english.feature1': '기초 문법과 어휘',
    'programs.english.feature2': '회화 중심 학습',
    'programs.english.feature3': '비즈니스 영어',
    'programs.english.feature4': '영어 자격증 준비',

    'programs.math.title': '수학 교육',
    'programs.math.desc': '기초 수학부터 실생활 응용까지',
    'programs.math.feature1': '기초 연산 능력',
    'programs.math.feature2': '실생활 수학',
    'programs.math.feature3': '논리적 사고력',
    'programs.math.feature4': '문제 해결 능력',

    'programs.computer.title': '컴퓨터 기초',
    'programs.computer.desc': '디지털 시대에 필요한 컴퓨터 활용 능력',
    'programs.computer.feature1': '기본 프로그램 사용법',
    'programs.computer.feature2': '인터넷 활용',
    'programs.computer.feature3': '문서 작성',
    'programs.computer.feature4': '온라인 소통',

    'programs.duration.2months': '2개월',
    'programs.duration.3months': '3개월',
    'programs.duration.4months': '4개월',
    'programs.duration.6months': '6개월',
    'programs.duration.ongoing': '상시',

    'programs.level.beginner': '초급',
    'programs.level.beginner-intermediate': '초급-중급',
    'programs.level.beginner-advanced': '초급-고급',
    'programs.level.beginner-professional': '초급-전문',
    'programs.level.basic-advanced': '기초-고급',
    'programs.level.all': '전 수준',

    'programs.vocational.title': '직업 기술 프로그램',
    'programs.vocational.subtitle': '취업과 창업을 위한 실용적인 기술 교육',

    'programs.video.title': '등대 말레이시아 직업학교 홍보영상',
    'programs.video.subtitle': '우리의 교육 프로그램과 학생들의 이야기를 영상으로 만나보세요',
    'programs.video.click': '영상을 보려면 클릭하세요',
    'programs.video.date': '2024년 10월 제작',
    'programs.video.youtube': 'YouTube에서 보기',

    'programs.barista.title': '바리스타 과정(교사모집중)',
    'programs.barista.desc': '전문 바리스타 기술과 카페 운영 노하우',
    'programs.barista.feature1': '커피 추출 기술',
    'programs.barista.feature2': '라떼아트 기초',
    'programs.barista.feature3': '카페 운영 실무',
    'programs.barista.feature4': '고객 서비스',

    'programs.baking.title': '제빵 과정(교사모집중)',
    'programs.baking.desc': '기초 제빵부터 전문 베이킹까지',
    'programs.baking.feature1': '기본 빵 만들기',
    'programs.baking.feature2': '케이크 데코레이션',
    'programs.baking.feature3': '재료 관리',
    'programs.baking.feature4': '위생 관리',

    'programs.hair.title': '미용 과정(교사모집중)',
    'programs.hair.desc': '헤어 디자인과 미용 기술 교육',
    'programs.hair.feature1': '기본 커트 기술',
    'programs.hair.feature2': '펌과 염색',
    'programs.hair.feature3': '고객 상담',
    'programs.hair.feature4': '살롱 운영',

    'programs.nursing.title': '간병 과정',
    'programs.nursing.desc': '노인 돌봄과 간병 서비스 교육',
    'programs.nursing.feature1': '기본 간병 기술',
    'programs.nursing.feature2': '응급처치',
    'programs.nursing.feature3': '환자 소통',
    'programs.nursing.feature4': '의료진 협력',

    'programs.cuisine.title': '요리 과정(교사모집중)',
    'programs.cuisine.desc': '다양한 요리 기술과 음식 서비스',
    'programs.cuisine.feature1': '기본 요리 기술',
    'programs.cuisine.feature2': '위생 관리',
    'programs.cuisine.feature3': '메뉴 개발',
    'programs.cuisine.feature4': '식당 운영',

    'programs.marketing.title': '마케팅 과정',
    'programs.marketing.desc': '디지털 마케팅과 온라인 비즈니스',
    'programs.marketing.feature1': 'SNS 마케팅',
    'programs.marketing.feature2': '온라인 쇼핑몰',
    'programs.marketing.feature3': '고객 관리',
    'programs.marketing.feature4': '브랜딩 기초',

    'programs.enrichment.title': '문화 활동 프로그램',
    'programs.enrichment.subtitle': '정서적 안정과 사회적 통합을 위한 활동',

    'programs.music.title': '음악 활동',
    'programs.music.desc': '악기 연주와 음악을 통한 정서 치료',
    'programs.music.feature1': '기타/피아노 레슨',
    'programs.music.feature2': '합창단 활동',
    'programs.music.feature3': '음악 치료',
    'programs.music.feature4': '공연 기회',

    'programs.sports.title': '스포츠 활동',
    'programs.sports.desc': '축구를 중심으로 한 체육 활동',
    'programs.sports.feature1': '축구팀 운영',
    'programs.sports.feature2': '체력 단련',
    'programs.sports.feature3': '팀워크 향상',
    'programs.sports.feature4': '대회 참가',

    'programs.benefits.title': '프로그램 혜택',
    'programs.benefits.free': '무료 교육',
    'programs.benefits.free.desc': '모든 교육비와 교재비 무료',
    'programs.benefits.certificate': '수료증 발급',
    'programs.benefits.certificate.desc': '정식 수료증과 추천서 제공',
    'programs.benefits.job': '취업 연계',
    'programs.benefits.job.desc': '파트너 업체 취업 기회 제공',
    'programs.benefits.mentoring': '지속적 멘토링',
    'programs.benefits.mentoring.desc': '졸업 후에도 계속되는 지원',

    'programs.cta.title': '지금 신청하세요',
    'programs.cta.subtitle': '여러분의 미래를 위한 첫 걸음을 내딛어보세요.',
    'programs.cta.apply': '신청하기',

    // Football page
    'football.hero.subtitle': '축구를 통한 치유와 희망',
    'football.hero.description': '말레이시아 난민 청소년들에게 축구를 통해 신체적, 정신적 치유와 사회적 통합의 기회를 제공하는 특별한 프로젝트입니다.',
    'football.hero.join': '팀 참가하기',
    'football.hero.support': '후원하기',

    'football.stats.players': '현재 선수',
    'football.stats.refugees': '말레이시아 난민',
    'football.stats.youth': '청소년 난민',
    'football.stats.founded': '설립 예정',

    'football.impact.title': '우리의 영향력',
    'football.impact.subtitle': '축구를 통해 만들어가는 긍정적인 변화',

    'football.vision.title': '프로젝트 비전',
    'football.vision.description': '축구는 단순한 스포츠가 아닙니다. 우리에게는 치유와 희망, 그리고 새로운 시작을 의미합니다.',
    'football.vision.healing': '트라우마 치유',
    'football.vision.healing.desc': '스포츠를 통한 정신적 회복과 치유',
    'football.vision.integration': '사회적 통합',
    'football.vision.integration.desc': '지역사회와의 연결과 소속감 형성',
    'football.vision.hope': '희망 제공',
    'football.vision.hope.desc': '꿈과 목표를 통한 미래 설계',
    'football.vision.unity': '문화적 화합',
    'football.vision.unity.desc': '다양한 배경의 청소년들 간 우정',

    'football.goals.title': '프로젝트 목표',
    'football.goals.subtitle': '2026년까지 달성하고자 하는 구체적인 목표들',
    'football.goals.team': '정식 축구팀 창단',
    'football.goals.team.desc': '15명 이상 규모의 정식 청소년 축구팀을 구성하여 정기적인 훈련과 경기를 진행합니다.',
    'football.goals.health': '신체적 정신적 건강 증진',
    'football.goals.health.desc': '규칙적인 운동을 통해 체력을 기르고, 팀 활동을 통해 정신적 안정을 찾습니다.',
    'football.goals.community': '지역사회 연결',
    'football.goals.community.desc': '지역 축구 리그 참가를 통해 말레이시아 사회와의 연결고리를 만듭니다.',
    'football.goals.potential': '개인 역량 개발',
    'football.goals.potential.desc': '축구를 통해 리더십, 팀워크, 책임감 등 인생 기술을 배웁니다.',

    'football.effects.title': '기대 효과',
    'football.effects.subtitle': '축구팀 운영을 통해 얻을 수 있는 긍정적인 변화들',
    'football.effects.healing': '전쟁과 난민 생활로 인한 트라우마 치유',
    'football.effects.capacity': '신체 능력과 정신력 향상',
    'football.effects.social': '사회적 기술과 대인관계 능력 개발',
    'football.effects.identity': '정체성 확립과 자존감 향상',
    'football.effects.awareness': '말레이시아 사회의 난민에 대한 인식 개선',

    'football.program.title': '훈련 프로그램',
    'football.program.description': '체계적이고 전문적인 축구 훈련을 통해 선수들의 기술 향상과 인격 형성을 동시에 추구합니다.',
    'football.program.schedule': '주 2회 정기 훈련(화, 금)',
    'football.program.coaching': '전문 코치진과 자원봉사자',
    'football.program.league': '지역 리그 참가 목표',
    'football.program.support': '개별 맞춤 지원',

    'football.support.title': '후원 방법',
    'football.support.subtitle': '축구팀 운영을 위한 다양한 후원 방법이 있습니다',
    'football.support.financial': '재정 후원',
    'football.support.financial.desc': '훈련장 임대료, 장비 구입, 교통비 등을 후원해주세요',
    'football.support.equipment': '장비 후원',
    'football.support.equipment.desc': '축구공, 유니폼, 신발, 훈련 장비 등을 기부해주세요',
    'football.support.prayer': '기도 후원',
    'football.support.prayer.desc': '선수들과 프로그램을 위한 지속적인 기도를 부탁드립니다',
    'football.support.volunteer': '자원봉사',
    'football.support.volunteer.desc': '코치, 매니저, 운전자 등 다양한 역할로 참여해주세요',

    'football.volunteer.title': '자원봉사 기회',
    'football.volunteer.subtitle': '축구팀과 함께할 자원봉사자를 찾습니다',
    'football.volunteer.longterm': '장기 자원봉사',
    'football.volunteer.longterm.desc': '정기적으로 참여할 수 있는 자원봉사',
    'football.volunteer.longterm.duration': '최소 6개월 이상 참여',
    'football.volunteer.longterm.commitment': '주 1-2회 정기 참여',
    'football.volunteer.shortterm': '단기 자원봉사',
    'football.volunteer.shortterm.desc': '특별 이벤트나 행사 도움',
    'football.volunteer.shortterm.training': '훈련 보조 및 경기 지원',
    'football.volunteer.shortterm.cultural': '문화 교류 프로그램',
    'football.volunteer.online': '온라인 자원봉사',
    'football.volunteer.online.desc': '원격으로 도울 수 있는 활동',
    'football.volunteer.online.promotion': 'SNS 홍보 및 모금 활동',
    'football.volunteer.online.mentoring': '온라인 멘토링',

    'football.cta.title': '함께 만들어가는 꿈',
    'football.cta.description': '축구를 통해 난민 청소년들에게 새로운 희망과 기회를 선사하는 이 특별한 여정에 함께해주세요.',
    'football.cta.quote': '스포츠는 세상을 바꿀 힘이 있습니다. 그것은 희망을 불러일으키고, 편견을 무너뜨리며, 평화를 만들어냅니다.',
    'football.cta.verse': '- 넬슨 만델라',
    'football.cta.join': '팀 참가하기',
    'football.cta.support': '후원하기',
    'football.cta.contact': '문의하기',

    // Support page
    'support.hero.title': '지원하기',
    'support.hero.subtitle': '등대 말레이시아와 함께 난민 청소년들의 미래를 만들어가세요.',

    'support.info.title': '지원 방법',

    'support.student.title': '교육생 신청',
    'support.student.info': '14~17세 난민 청소년을 대상으로 한 무료 교육 프로그램에 참여하실 수 있습니다.',
    'support.student.requirements': `신청 자격:
• 나이: 14~17세
• 신분: 난민 또는 무국적자
• 거주지: 말레이시아 쿠알라룸푸르 및 인근 지역
• 학습 의지: 성실한 참여 의지

필요 서류:
• UNHCR 카드 또는 관련 서류
• 신분증명서
• 거주지 증명서
• 보호자 동의서

신청 방법:
이메일 또는 전화로 연락 후 면담 진행`,

    'support.volunteer.title': '자원봉사 신청',
    'support.volunteer.info': '다양한 분야에서 난민 청소년들을 도울 자원봉사자를 모집합니다.',
    'support.volunteer.requirements': `자원봉사 분야:
• 교육 지원: 한국어, 영어, 수학 등
• 직업 훈련: 바리스타, 제빵, 미용 등
• 상담 및 멘토링
• 행정 업무 지원
• 번역 및 통역
• 축구팀 코치 및 매니저

참여 조건:
• 최소 3개월 이상 참여 가능
• 주 1-2회 정기 참여
• 난민에 대한 이해와 관심
• 기본적인 의사소통 능력

신청 방법:
이메일로 이력서와 자기소개서 제출`,

    'support.partner.title': '파트너십 문의',
    'support.partner.info': '기업, 단체, 교회와의 파트너십을 통해 더 큰 영향력을 만들어갑니다.',
    'support.partner.requirements': `파트너십 유형:
• 기업 파트너십: 취업 연계, 인턴십 제공
• 교육 기관: 교육과정 개발, 강사 파견
• 교회 및 종교단체: 영적 지원, 자원봉사
• NGO 및 사회단체: 프로그램 협력

혜택:
• 사회적 책임 실현
• 우수 인재 발굴 기회
• 세제 혜택 (해당시)
• 홍보 및 마케팅 효과

문의 방법:
이메일로 파트너십 제안서 제출`,

    'support.contact.methods': '연락 방법',
    'support.contact.hours': '운영 시간',
    'support.contact.response': '월-금: 오후 2시반~5시 | 토.일: 휴무',

    // About page
    'about.hero.title': '등대 말레이시아 소개',
    'about.hero.subtitle': '난민 청소년들에게 희망의 빛을 비추는 등대가 되겠습니다.',

    'about.mission.title': '우리의 사명',
    'about.mission.description': '등대 말레이시아는 말레이시아에 거주하는 난민 청소년들에게 교육과 직업훈련을 통해 자립할 수 있는 능력을 기르고, 희망찬 미래를 만들어가도록 돕는 것을 사명으로 합니다.',
    'about.mission.point1': '무료 교육을 통한 기회 평등 실현',
    'about.mission.point2': '실용적 기술 교육으로 경제적 자립 지원',
    'about.mission.point3': '정서적 안정과 사회적 통합 도모',

    'about.vision.title': '우리의 비전',
    'about.vision.description': '모든 난민 청소년이 출신과 배경에 관계없이 교육받을 권리를 누리고, 자신의 꿈을 실현할 수 있는 세상을 만들어가겠습니다.',
    'about.vision.point1': '교육을 통한 사회 통합',
    'about.vision.point2': '지속가능한 자립 기반 구축',
    'about.vision.point3': '차세대 리더 양성',

    'about.values.title': '우리의 가치',
    'about.values.subtitle': '등대 말레이시아가 추구하는 핵심 가치들',
    'about.values.love': '사랑',
    'about.values.love.desc': '무조건적인 사랑과 관심으로 청소년들을 돌봅니다',
    'about.values.practical': '실용성',
    'about.values.practical.desc': '실제 생활에 도움이 되는 교육을 제공합니다',
    'about.values.inclusion': '포용성',
    'about.values.inclusion.desc': '모든 배경의 청소년들을 환영합니다',
    'about.values.innovation': '혁신성',
    'about.values.innovation.desc': '창의적이고 효과적인 교육 방법을 추구합니다',

    'about.journey.title': '우리의 여정',
    'about.journey.subtitle': '등대 말레이시아의 성장 과정',

    'about.milestone.2022.10': '난민청소년들 미팅',
    'about.milestone.2023.3': '가정에서 1:1 맞춤형 교육 시작',
    'about.milestone.2024.5': 'OFPA직업학교 개교(1기 3명)',
    'about.milestone.2024.10': '2기 교육생 3명 모집',
    'about.milestone.2025.7': '암팡지역 센타 계약&인테리어',
    'about.milestone.2025.10': '등대 말레이시아 오픈',
    'about.milestone.2025.12': '라이트하우스FC 창단',

    'about.team.title': '우리 팀',
    'about.team.subtitle': '헌신적인 팀원들이 함께 만들어가는 변화',

    'about.team.christina.name': 'Christina Kim',
    'about.team.christina.role': '센터장',
    'about.team.christina.desc': '말레이시아 장기거주자, 수학.반주 전문가',

    'about.team.noah.name': 'Jimmy',
    'about.team.noah.role': '책임리더',
    'about.team.noah.desc': '해외교육경력 20년, LHMY FC담당',

    'about.team.grace.name': 'Melony',
    'about.team.grace.role': '총무',
    'about.team.grace.desc': '영어.간호보건 교육, 회원관리담당',

    'about.team.paul.name': 'Paul Cho',
    'about.team.paul.role': 'IT팀장',
    'about.team.paul.desc': '컴퓨터.AI.마케팅 교육, 홈페이지관리담당',

    'about.team.sema.name': 'Sema Kim',
    'about.team.sema.role': '관리팀장',
    'about.team.sema.desc': '한국어 교육, 집기.문서관리담당',

    'about.cta.title': '함께해주세요',
    'about.cta.subtitle': '등대 말레이시아의 사명에 동참하여 난민 청소년들의 미래를 밝혀주세요.',
    'about.cta.join': '참여하기',
    'about.cta.contact': '문의하기',

    // Contact page
    'contact.hero.title': '연락처',
    'contact.hero.subtitle': '언제든지 편하게 연락주세요. 성심껏 도와드리겠습니다.',

    'contact.info.title': '연락 정보',

    'contact.address.title': '주소',
    'contact.address.detail': '15-1F, Jalan Perubatan 4,\nTaman Pandan Indah,\n55100 Kuala Lumpur, Selangor, Malaysia',

    'contact.phone.title': '전화번호',
    'contact.phone.number': '+60 11-2079-8850',
    'contact.phone.hours': '24시간 응답 가능 (긴급시)',

    'contact.email.title': '이메일',
    'contact.email.address': 'lhmy.kr@gmail.com',

    'contact.hours.title': '운영 시간',
    'contact.hours.weekdays': '월.화.목.금: 오후2시~오후5시',
    'contact.hours.field': '화.금: 오후5시반~오후7시(운동장)',
    'contact.hours.closed': '토.일: 휴무',

    'contact.location.title': '찾아오시는 길',
    'contact.location.subtitle': '대중교통이나 자가용으로 쉽게 오실 수 있습니다',

    'contact.inquiry.title': '문의하기',
    'contact.inquiry.info': '교육 프로그램 신청, 자원봉사, 후원 등 모든 문의를 환영합니다.',
    'contact.inquiry.methods': `연락 방법:
• 이메일: lhmy.kr@gmail.com
• 전화/문자: +60 11-2079-8850
• 직접 방문: 사전 연락 후 방문`,

    'contact.inquiry.include': '문의시 포함할 정보',
    'contact.inquiry.requirements': `필수 정보:
• 성명
• 연락처 (전화번호)
• 이메일 주소
• 문의 내용

선택 정보:
• 나이 (교육생 신청시)
• 거주 지역
• 관심 프로그램
• 자원봉사 가능 시간`,

    'contact.response': '이메일: 24시간 내 답변 | 전화: 즉시 상담',

    // Donate page
    'donate.hero.title': '후원하기',
    'donate.hero.subtitle': '여러분의 소중한 후원이 난민 청소년들의 미래를 밝힙니다.',

    'donate.impact.title': '후원의 영향',
    'donate.impact.subtitle': '지금까지 여러분의 후원으로 이룬 성과들',
    'donate.impact.students': '교육생',
    'donate.impact.meals': '제공된 식사',
    'donate.impact.programs': '운영 프로그램',
    'donate.impact.volunteers': '자원봉사자',

    'donate.info.title': '후원 안내',

    'donate.types.title': '후원 유형',
    'donate.types.monthly': '정기 후원',
    'donate.types.monthly.desc': '매월 일정 금액을 후원하여 지속적인 교육 운영을 지원합니다.',
    'donate.types.onetime': '일시 후원',
    'donate.types.onetime.desc': '필요에 따라 원하는 금액을 후원하여 특별한 프로젝트를 지원합니다.',

    'donate.amounts.title': '후원 금액별 효과',
    'donate.amounts.10000': '월 10,000원 → 교육생 1명의 교재비 지원',
    'donate.amounts.50000': '월 50,000원 → 교육생 1명의 한 달 교육비 전액 지원',
    'donate.amounts.200000': '월 200,000원 → 직업훈련 프로그램 운영비 지원',
    'donate.amounts.500000': '월 500,000원 → 센터 임대료 및 운영비 지원',
    'donate.amounts.1000000': '월 1,000,000원 → 새로운 교육 프로그램 개발 및 확장',
    'donate.amounts.custom': '원하시는 금액으로 자유롭게 후원 가능합니다',

    'donate.how.title': '후원 방법',
    'donate.how.info': '아래 계좌로 입금 후 연락주시면 확인 도와드리겠습니다.',
    'donate.how.requirements': `후원시 필요한 정보:
• 후원자 성명
• 연락처
• 후원 유형 (정기/일시)
• 후원 금액`,

    'donate.accounts.title': '후원 계좌',

    'donate.contact.title': '후원 문의',
    'donate.contact.email': 'lhmy.kr@gmail.com',
    'donate.contact.phone': '+60 11-2079-8850',

    'donate.thanks': '여러분의 소중한 마음에 깊이 감사드립니다.',

    // Footer
    'footer.mission': '말레이시아 난민 청소년들에게 교육과 희망을 제공하는 등대 말레이시아입니다.',
    'footer.quicklinks': '빠른 링크',
    'footer.contact': '연락처',
    'footer.copyright': '© 2024 등대 말레이시아. All rights reserved.',
    'footer.madewith': 'Made with',
    'footer.foryouth': 'for refugee youth',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.football': 'Football',
    'nav.news': 'News',
    'nav.newsletter': 'Newsletter',
    'nav.support': 'Support',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate',

    // Common
    'common.features': 'Features',
    'common.weekdays': 'Mon-Fri: 9 AM - 6 PM',
    'common.saturday': 'Sat: 9 AM - 2 PM',
    'common.sunday': 'Sun: Closed',

    // Home page
    'home.hero.title': 'Lighthouse Malaysia',
    'home.hero.subtitle': 'A Beacon of Hope for Refugee Youth',
    'home.hero.description': 'Providing education and vocational training to refugee youth in Malaysia, offering new hope and a brighter future.',
    'home.hero.programs': 'View Programs',
    'home.hero.support': 'Get Support',

    'home.stats.students': 'Students',
    'home.stats.programs': 'Programs',
    'home.stats.volunteers': 'Volunteers',
    'home.stats.years': 'Years',

    'home.mission.title': 'Our Mission',
    'home.mission.description': 'Lighthouse Malaysia empowers refugee youth in Malaysia through practical education and vocational training, helping them build self-reliance and create a hopeful future.',
    'home.mission.point1': 'Free educational programs',
    'home.mission.point2': 'Practical vocational training',
    'home.mission.point3': 'Continuous mentoring and support',

    'home.programs.title': 'Educational Programs',
    'home.programs.subtitle': 'Diverse educational opportunities for the future of refugee youth',
    'home.programs.basic': 'Basic Education',
    'home.programs.basic.desc': 'Korean, English, Math and fundamental learning skills',
    'home.programs.practical': 'Practical Skills (Preparing)',
    'home.programs.practical.desc': 'Job-linked technical education like barista, baking, beauty',
    'home.programs.it': 'IT Education',
    'home.programs.it.desc': 'Computer skills, programming, digital marketing',
    'home.programs.arts': 'Arts Activities',
    'home.programs.arts.desc': 'Emotional stability through music, art, and sports',
    'home.programs.viewall': 'View All Programs',

    'home.values.title': 'Our Values',
    'home.values.inclusion': 'Inclusion',
    'home.values.inclusion.desc': 'We welcome and embrace youth from all backgrounds',
    'home.values.practical': 'Practicality',
    'home.values.practical.desc': 'We provide education that helps in real life and employment',
    'home.values.love': 'Love',
    'home.values.love.desc': 'We care for youth with genuine interest and love',

    'home.cta.title': 'Building Hope Together',
    'home.cta.subtitle': 'With your interest and participation, we can bring hope to more youth.',

    // Programs page
    'programs.hero.title': 'Educational Programs',
    'programs.hero.subtitle': 'Systematic and practical educational programs for the future of refugee youth.',

    'programs.academic.title': 'Basic Learning Programs',
    'programs.academic.subtitle': 'Programs for improving language and fundamental learning abilities',

    'programs.korean.title': 'Korean Language',
    'programs.korean.desc': 'Systematic Korean learning from basic to advanced',
    'programs.korean.feature1': 'Basic Hangul reading/writing',
    'programs.korean.feature2': 'Daily conversation practice',
    'programs.korean.feature3': 'Korean culture understanding',
    'programs.korean.feature4': 'Job-oriented Korean',

    'programs.english.title': 'English Language',
    'programs.english.desc': 'Improving practical English communication skills',
    'programs.english.feature1': 'Basic grammar and vocabulary',
    'programs.english.feature2': 'Conversation-focused learning',
    'programs.english.feature3': 'Business English',
    'programs.english.feature4': 'English certification prep',

    'programs.math.title': 'Mathematics',
    'programs.math.desc': 'From basic math to real-life applications',
    'programs.math.feature1': 'Basic calculation skills',
    'programs.math.feature2': 'Practical mathematics',
    'programs.math.feature3': 'Logical thinking',
    'programs.math.feature4': 'Problem-solving skills',

    'programs.computer.title': 'Computer Basics',
    'programs.computer.desc': 'Computer skills needed in the digital age',
    'programs.computer.feature1': 'Basic program usage',
    'programs.computer.feature2': 'Internet utilization',
    'programs.computer.feature3': 'Document creation',
    'programs.computer.feature4': 'Online communication',

    'programs.duration.2months': '2 months',
    'programs.duration.3months': '3 months',
    'programs.duration.4months': '4 months',
    'programs.duration.6months': '6 months',
    'programs.duration.ongoing': 'Ongoing',

    'programs.level.beginner': 'Beginner',
    'programs.level.beginner-intermediate': 'Beginner-Intermediate',
    'programs.level.beginner-advanced': 'Beginner-Advanced',
    'programs.level.beginner-professional': 'Beginner-Professional',
    'programs.level.basic-advanced': 'Basic-Advanced',
    'programs.level.all': 'All Levels',

    'programs.vocational.title': 'Vocational Training Programs',
    'programs.vocational.subtitle': 'Practical skills education for employment and entrepreneurship',

    'programs.video.title': 'Lighthouse Malaysia Vocational School Promotional Video',
    'programs.video.subtitle': 'Meet our educational programs and student stories through video',
    'programs.video.click': 'Click to watch the video',
    'programs.video.date': 'Produced in October 2024',
    'programs.video.youtube': 'Watch on YouTube',

    'programs.barista.title': 'Barista Course (Teacher Recruiting)',
    'programs.barista.desc': 'Professional barista skills and cafe management know-how',
    'programs.barista.feature1': 'Coffee extraction techniques',
    'programs.barista.feature2': 'Basic latte art',
    'programs.barista.feature3': 'Cafe operation practice',
    'programs.barista.feature4': 'Customer service',

    'programs.baking.title': 'Baking Course (Teacher Recruiting)',
    'programs.baking.desc': 'From basic baking to professional baking',
    'programs.baking.feature1': 'Basic bread making',
    'programs.baking.feature2': 'Cake decoration',
    'programs.baking.feature3': 'Ingredient management',
    'programs.baking.feature4': 'Hygiene management',

    'programs.hair.title': 'Beauty Course (Teacher Recruiting)',
    'programs.hair.desc': 'Hair design and beauty skills education',
    'programs.hair.feature1': 'Basic cutting techniques',
    'programs.hair.feature2': 'Perming and coloring',
    'programs.hair.feature3': 'Customer consultation',
    'programs.hair.feature4': 'Salon operation',

    'programs.nursing.title': 'Nursing Course',
    'programs.nursing.desc': 'Elderly care and nursing service education',
    'programs.nursing.feature1': 'Basic nursing skills',
    'programs.nursing.feature2': 'First aid',
    'programs.nursing.feature3': 'Patient communication',
    'programs.nursing.feature4': 'Medical team cooperation',

    'programs.cuisine.title': 'Cooking Course (Teacher Recruiting)',
    'programs.cuisine.desc': 'Various cooking skills and food service',
    'programs.cuisine.feature1': 'Basic cooking skills',
    'programs.cuisine.feature2': 'Hygiene management',
    'programs.cuisine.feature3': 'Menu development',
    'programs.cuisine.feature4': 'Restaurant operation',

    'programs.marketing.title': 'Marketing Course',
    'programs.marketing.desc': 'Digital marketing and online business',
    'programs.marketing.feature1': 'SNS marketing',
    'programs.marketing.feature2': 'Online shopping mall',
    'programs.marketing.feature3': 'Customer management',
    'programs.marketing.feature4': 'Branding basics',

    'programs.enrichment.title': 'Cultural Activity Programs',
    'programs.enrichment.subtitle': 'Activities for emotional stability and social integration',

    'programs.music.title': 'Music Activities',
    'programs.music.desc': 'Emotional therapy through instrument playing and music',
    'programs.music.feature1': 'Guitar/Piano lessons',
    'programs.music.feature2': 'Choir activities',
    'programs.music.feature3': 'Music therapy',
    'programs.music.feature4': 'Performance opportunities',

    'programs.sports.title': 'Sports Activities',
    'programs.sports.desc': 'Physical activities centered around football',
    'programs.sports.feature1': 'Football team operation',
    'programs.sports.feature2': 'Physical fitness',
    'programs.sports.feature3': 'Teamwork improvement',
    'programs.sports.feature4': 'Competition participation',

    'programs.benefits.title': 'Program Benefits',
    'programs.benefits.free': 'Free Education',
    'programs.benefits.free.desc': 'All tuition and materials free',
    'programs.benefits.certificate': 'Certificate Issuance',
    'programs.benefits.certificate.desc': 'Official certificates and recommendation letters',
    'programs.benefits.job': 'Job Placement',
    'programs.benefits.job.desc': 'Employment opportunities with partner companies',
    'programs.benefits.mentoring': 'Continuous Mentoring',
    'programs.benefits.mentoring.desc': 'Ongoing support even after graduation',

    'programs.cta.title': 'Apply Now',
    'programs.cta.subtitle': 'Take the first step towards your future.',
    'programs.cta.apply': 'Apply',

    // Football page
    'football.hero.subtitle': 'Healing and Hope Through Football',
    'football.hero.description': 'A special project providing refugee youth in Malaysia with opportunities for physical and mental healing and social integration through football.',
    'football.hero.join': 'Join the Team',
    'football.hero.support': 'Support Us',

    'football.stats.players': 'Current Players',
    'football.stats.refugees': 'Refugees in Malaysia',
    'football.stats.youth': 'Youth Refugees',
    'football.stats.founded': 'To be Founded',

    'football.impact.title': 'Our Impact',
    'football.impact.subtitle': 'Positive changes created through football',

    'football.vision.title': 'Project Vision',
    'football.vision.description': 'Football is not just a sport. For us, it means healing, hope, and new beginnings.',
    'football.vision.healing': 'Trauma Healing',
    'football.vision.healing.desc': 'Mental recovery and healing through sports',
    'football.vision.integration': 'Social Integration',
    'football.vision.integration.desc': 'Connection with community and sense of belonging',
    'football.vision.hope': 'Providing Hope',
    'football.vision.hope.desc': 'Future planning through dreams and goals',
    'football.vision.unity': 'Cultural Harmony',
    'football.vision.unity.desc': 'Friendship among youth from diverse backgrounds',

    'football.goals.title': 'Project Goals',
    'football.goals.subtitle': 'Specific goals to achieve by 2026',
    'football.goals.team': 'Official Football Team Formation',
    'football.goals.team.desc': 'Form an official youth football team of 15+ members for regular training and matches.',
    'football.goals.health': 'Physical and Mental Health Improvement',
    'football.goals.health.desc': 'Build physical strength through regular exercise and find mental stability through team activities.',
    'football.goals.community': 'Community Connection',
    'football.goals.community.desc': 'Create connections with Malaysian society through participation in local football leagues.',
    'football.goals.potential': 'Personal Capacity Development',
    'football.goals.potential.desc': 'Learn life skills such as leadership, teamwork, and responsibility through football.',

    'football.effects.title': 'Expected Effects',
    'football.effects.subtitle': 'Positive changes through football team operation',
    'football.effects.healing': 'Healing trauma from war and refugee life',
    'football.effects.capacity': 'Improvement of physical abilities and mental strength',
    'football.effects.social': 'Development of social skills and interpersonal abilities',
    'football.effects.identity': 'Identity establishment and self-esteem improvement',
    'football.effects.awareness': 'Improving Malaysian society\'s awareness of refugees',

    'football.program.title': 'Training Program',
    'football.program.description': 'Through systematic and professional football training, we pursue both skill improvement and character development of players.',
    'football.program.schedule': 'Regular training 2 times a week (Tue, Fri)',
    'football.program.coaching': 'Professional coaches and volunteers',
    'football.program.league': 'Goal to participate in local league',
    'football.program.support': 'Individual customized support',

    'football.support.title': 'Support Methods',
    'football.support.subtitle': 'Various ways to support football team operation',
    'football.support.financial': 'Financial Support',
    'football.support.financial.desc': 'Support training ground rental, equipment purchase, transportation costs, etc.',
    'football.support.equipment': 'Equipment Support',
    'football.support.equipment.desc': 'Donate footballs, uniforms, shoes, training equipment, etc.',
    'football.support.prayer': 'Prayer Support',
    'football.support.prayer.desc': 'Please pray continuously for players and programs',
    'football.support.volunteer': 'Volunteer',
    'football.support.volunteer.desc': 'Participate in various roles such as coach, manager, driver, etc.',

    'football.volunteer.title': 'Volunteer Opportunities',
    'football.volunteer.subtitle': 'Looking for volunteers to join the football team',
    'football.volunteer.longterm': 'Long-term Volunteer',
    'football.volunteer.longterm.desc': 'Volunteer work that can participate regularly',
    'football.volunteer.longterm.duration': 'Participate for at least 6 months',
    'football.volunteer.longterm.commitment': 'Regular participation 1-2 times a week',
    'football.volunteer.shortterm': 'Short-term Volunteer',
    'football.volunteer.shortterm.desc': 'Help with special events or activities',
    'football.volunteer.shortterm.training': 'Training assistance and match support',
    'football.volunteer.shortterm.cultural': 'Cultural exchange programs',
    'football.volunteer.online': 'Online Volunteer',
    'football.volunteer.online.desc': 'Activities that can help remotely',
    'football.volunteer.online.promotion': 'SNS promotion and fundraising',
    'football.volunteer.online.mentoring': 'Online mentoring',

    'football.cta.title': 'Dreams We Build Together',
    'football.cta.description': 'Join this special journey of bringing new hope and opportunities to refugee youth through football.',
    'football.cta.quote': 'Sport has the power to change the world. It has the power to inspire, to break down prejudices, and to create peace.',
    'football.cta.verse': '- Nelson Mandela',
    'football.cta.join': 'Join the Team',
    'football.cta.support': 'Support Us',
    'football.cta.contact': 'Contact Us',

    // Support page
    'support.hero.title': 'Support',
    'support.hero.subtitle': 'Join Lighthouse Malaysia in creating the future of refugee youth.',

    'support.info.title': 'Support Methods',

    'support.student.title': 'Student Application',
    'support.student.info': 'Refugee youth aged 14-17 can participate in free educational programs.',
    'support.student.requirements': `Eligibility:
• Age: 14-17 years old
• Status: Refugee or stateless person
• Residence: Kuala Lumpur and nearby areas, Malaysia
• Learning motivation: Sincere participation

Required documents:
• UNHCR card or related documents
• Identity documents
• Proof of residence
• Guardian consent

Application method:
Contact by email or phone, then proceed with interview`,

    'support.volunteer.title': 'Volunteer Application',
    'support.volunteer.info': 'We recruit volunteers to help refugee youth in various fields.',
    'support.volunteer.requirements': `Volunteer areas:
• Educational support: Korean, English, Math, etc.
• Vocational training: Barista, baking, beauty, etc.
• Counseling and mentoring
• Administrative support
• Translation and interpretation
• Football team coach and manager

Participation conditions:
• Available for at least 3 months
• Regular participation 1-2 times a week
• Understanding and interest in refugees
• Basic communication skills

Application method:
Submit resume and self-introduction by email`,

    'support.partner.title': 'Partnership Inquiry',
    'support.partner.info': 'We create greater impact through partnerships with companies, organizations, and churches.',
    'support.partner.requirements': `Partnership types:
• Corporate partnership: Job placement, internship provision
• Educational institutions: Curriculum development, instructor dispatch
• Churches and religious organizations: Spiritual support, volunteering
• NGOs and social organizations: Program cooperation

Benefits:
• Social responsibility realization
• Opportunity to discover excellent talent
• Tax benefits (when applicable)
• Promotion and marketing effects

Inquiry method:
Submit partnership proposal by email`,

    'support.contact.methods': 'Contact Methods',
    'support.contact.hours': 'Operating Hours',
    'support.contact.response': 'Mon-Fri: 2:30 PM-5 PM | Sat.Sun: Closed',

    // About page
    'about.hero.title': 'About Lighthouse Malaysia',
    'about.hero.subtitle': 'We will be a lighthouse that shines the light of hope on refugee youth.',

    'about.mission.title': 'Our Mission',
    'about.mission.description': 'Lighthouse Malaysia\'s mission is to help refugee youth in Malaysia build self-reliance through education and vocational training, and create a hopeful future.',
    'about.mission.point1': 'Realizing equal opportunities through free education',
    'about.mission.point2': 'Supporting economic independence through practical skills education',
    'about.mission.point3': 'Promoting emotional stability and social integration',

    'about.vision.title': 'Our Vision',
    'about.vision.description': 'We will create a world where all refugee youth can enjoy the right to education regardless of their origin and background, and realize their dreams.',
    'about.vision.point1': 'Social integration through education',
    'about.vision.point2': 'Building sustainable self-reliance foundation',
    'about.vision.point3': 'Nurturing next-generation leaders',

    'about.values.title': 'Our Values',
    'about.values.subtitle': 'Core values pursued by Lighthouse Malaysia',
    'about.values.love': 'Love',
    'about.values.love.desc': 'We care for youth with unconditional love and interest',
    'about.values.practical': 'Practicality',
    'about.values.practical.desc': 'We provide education that helps in real life',
    'about.values.inclusion': 'Inclusion',
    'about.values.inclusion.desc': 'We welcome youth from all backgrounds',
    'about.values.innovation': 'Innovation',
    'about.values.innovation.desc': 'We pursue creative and effective educational methods',

    'about.journey.title': 'Our Journey',
    'about.journey.subtitle': 'The growth process of Lighthouse Malaysia',

    'about.milestone.2022.10': 'Meeting with refugee youth',
    'about.milestone.2023.3': 'Started personalized 1:1 education at home',
    'about.milestone.2024.5': 'Opened OFPA Vocational School (1st batch, 3 students)',
    'about.milestone.2024.10': 'Recruited 3 students for 2nd batch',
    'about.milestone.2025.7': 'Signed contract & renovation for Ampang center',
    'about.milestone.2025.10': 'Lighthouse Malaysia opened',
    'about.milestone.2025.12': 'Lighthouse FC founded',

    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Changes created together by dedicated team members',

    'about.team.christina.name': 'Christina Kim',
    'about.team.christina.role': 'Center Director',
    'about.team.christina.desc': 'Long-term Malaysia resident, Math & Accompaniment specialist',

    'about.team.noah.name': 'Jimmy',
    'about.team.noah.role': 'Lead Manager',
    'about.team.noah.desc': '20 years overseas education experience, LHMY FC manager',

    'about.team.grace.name': 'Melony',
    'about.team.grace.role': 'General Affairs',
    'about.team.grace.desc': 'English & Nursing education, Member management',

    'about.team.paul.name': 'Paul Cho',
    'about.team.paul.role': 'IT Team Leader',
    'about.team.paul.desc': 'Computer, AI, Marketing education, Website management',

    'about.team.sema.name': 'Sema Kim',
    'about.team.sema.role': 'Management Team Leader',
    'about.team.sema.desc': 'Korean education, Equipment & Document management',

    'about.cta.title': 'Join Us',
    'about.cta.subtitle': 'Join Lighthouse Malaysia\'s mission to brighten the future of refugee youth.',
    'about.cta.join': 'Participate',
    'about.cta.contact': 'Contact',

    // Contact page
    'contact.hero.title': 'Contact',
    'contact.hero.subtitle': 'Please feel free to contact us anytime. We will help you wholeheartedly.',

    'contact.info.title': 'Contact Information',

    'contact.address.title': 'Address',
    'contact.address.detail': '15-1F, Jalan Perubatan 4,\nTaman Pandan Indah,\n55100 Kuala Lumpur, Selangor, Malaysia',

    'contact.phone.title': 'Phone',
    'contact.phone.number': '+60 11-2079-8850',
    'contact.phone.hours': '24-hour response available (emergency)',

    'contact.email.title': 'Email',
    'contact.email.address': 'lhmy.kr@gmail.com',

    'contact.hours.title': 'Operating Hours',
    'contact.hours.weekdays': 'Mon.Tue.Thu.Fri: 2 PM-5 PM',
    'contact.hours.field': 'Tue.Fri: 5:30 PM-7 PM (field)',
    'contact.hours.closed': 'Sat.Sun: Closed',

    'contact.location.title': 'Directions',
    'contact.location.subtitle': 'Easy access by public transport or car',

    'contact.inquiry.title': 'Make an Inquiry',
    'contact.inquiry.info': 'We welcome all inquiries about educational program applications, volunteering, donations, etc.',
    'contact.inquiry.methods': `Contact methods:
• Email: lhmy.kr@gmail.com
• Phone/Text: +60 11-2079-8850
• Direct visit: Visit after prior contact`,

    'contact.inquiry.include': 'Information to include in inquiry',
    'contact.inquiry.requirements': `Required information:
• Full name
• Contact number (phone)
• Email address
• Inquiry content

Optional information:
• Age (when applying for education)
• Residential area
• Program of interest
• Available volunteer time`,

    'contact.response': 'Email: Response within 24 hours | Phone: Immediate consultation',

    // Donate page
    'donate.hero.title': 'Donate',
    'donate.hero.subtitle': 'Your precious donation brightens the future of refugee youth.',

    'donate.impact.title': 'Impact of Donations',
    'donate.impact.subtitle': 'Achievements made with your donations so far',
    'donate.impact.students': 'Students',
    'donate.impact.meals': 'Meals Provided',
    'donate.impact.programs': 'Operating Programs',
    'donate.impact.volunteers': 'Volunteers',

    'donate.info.title': 'Donation Guide',

    'donate.types.title': 'Donation Types',
    'donate.types.monthly': 'Monthly Donation',
    'donate.types.monthly.desc': 'Support continuous educational operation by donating a fixed amount monthly.',
    'donate.types.onetime': 'One-time Donation',
    'donate.types.onetime.desc': 'Support special projects by donating desired amounts as needed.',

    'donate.amounts.title': 'Impact by Donation Amount',
    'donate.amounts.10000': 'Monthly 10,000 KRW → Support textbook costs for 1 student',
    'donate.amounts.50000': 'Monthly 50,000 KRW → Full monthly education cost for 1 student',
    'donate.amounts.200000': 'Monthly 200,000 KRW → Support vocational training program operation',
    'donate.amounts.500000': 'Monthly 500,000 KRW → Support center rent and operation costs',
    'donate.amounts.1000000': 'Monthly 1,000,000 KRW → New educational program development and expansion',
    'donate.amounts.custom': 'Free donation with any amount you wish',

    'donate.how.title': 'How to Donate',
    'donate.how.info': 'Please contact us after depositing to the account below for confirmation.',
    'donate.how.requirements': `Information needed for donation:
• Donor name
• Contact number
• Donation type (monthly/one-time)
• Donation amount`,

    'donate.accounts.title': 'Donation Accounts',

    'donate.contact.title': 'Donation Inquiry',
    'donate.contact.email': 'lhmy.kr@gmail.com',
    'donate.contact.phone': '+60 11-2079-8850',

    'donate.thanks': 'We deeply appreciate your precious heart.',

    // Footer
    'footer.mission': 'Lighthouse Malaysia provides education and hope to refugee youth in Malaysia.',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 Lighthouse Malaysia. All rights reserved.',
    'footer.madewith': 'Made with',
    'footer.foryouth': 'for refugee youth',
  },
  my: {
    // Navigation
    'nav.home': 'Laman Utama',
    'nav.programs': 'Program',
    'nav.football': 'Bola Sepak',
    'nav.news': 'Berita',
    'nav.newsletter': 'Buletin',
    'nav.support': 'Sokongan',
    'nav.about': 'Tentang',
    'nav.contact': 'Hubungi',
    'nav.donate': 'Derma',

    // Common
    'common.features': 'Ciri-ciri',
    'common.weekdays': 'Isnin-Jumaat: 9 Pagi - 6 Petang',
    'common.saturday': 'Sabtu: 9 Pagi - 2 Petang',
    'common.sunday': 'Ahad: Tutup',

    // Home page
    'home.hero.title': 'Lighthouse Malaysia',
    'home.hero.subtitle': 'Mercusuar Harapan untuk Belia Pelarian',
    'home.hero.description': 'Menyediakan pendidikan dan latihan vokasional kepada belia pelarian di Malaysia, menawarkan harapan baru dan masa depan yang cerah.',
    'home.hero.programs': 'Lihat Program',
    'home.hero.support': 'Dapatkan Sokongan',

    'home.stats.students': 'Pelajar',
    'home.stats.programs': 'Program',
    'home.stats.volunteers': 'Sukarelawan',
    'home.stats.years': 'Tahun',

    'home.mission.title': 'Misi Kami',
    'home.mission.description': 'Lighthouse Malaysia memperkasakan belia pelarian di Malaysia melalui pendidikan praktikal dan latihan vokasional, membantu mereka membina kebergantungan diri dan mencipta masa depan yang penuh harapan.',
    'home.mission.point1': 'Program pendidikan percuma',
    'home.mission.point2': 'Latihan vokasional praktikal',
    'home.mission.point3': 'Bimbingan dan sokongan berterusan',

    'home.programs.title': 'Program Pendidikan',
    'home.programs.subtitle': 'Peluang pendidikan yang pelbagai untuk masa depan belia pelarian',
    'home.programs.basic': 'Pendidikan Asas',
    'home.programs.basic.desc': 'Korea, Inggeris, Matematik dan kemahiran pembelajaran asas',
    'home.programs.practical': 'Kemahiran Praktikal (Dalam Persediaan)',
    'home.programs.practical.desc': 'Pendidikan teknikal berkaitan pekerjaan seperti barista, pembakaran, kecantikan',
    'home.programs.it': 'Pendidikan IT',
    'home.programs.it.desc': 'Kemahiran komputer, pengaturcaraan, pemasaran digital',
    'home.programs.arts': 'Aktiviti Seni',
    'home.programs.arts.desc': 'Kestabilan emosi melalui muzik, seni, dan sukan',
    'home.programs.viewall': 'Lihat Semua Program',

    'home.values.title': 'Nilai Kami',
    'home.values.inclusion': 'Inklusif',
    'home.values.inclusion.desc': 'Kami mengalu-alukan belia dari semua latar belakang',
    'home.values.practical': 'Praktikal',
    'home.values.practical.desc': 'Kami menyediakan pendidikan yang membantu dalam kehidupan sebenar dan pekerjaan',
    'home.values.love': 'Kasih Sayang',
    'home.values.love.desc': 'Kami menjaga belia dengan minat dan kasih sayang yang tulen',

    'home.cta.title': 'Membina Harapan Bersama',
    'home.cta.subtitle': 'Dengan minat dan penyertaan anda, kami boleh membawa harapan kepada lebih ramai belia.',

    // Programs page
    'programs.hero.title': 'Program Pendidikan',
    'programs.hero.subtitle': 'Program pendidikan yang sistematik dan praktikal untuk masa depan belia pelarian.',

    'programs.academic.title': 'Program Pembelajaran Asas',
    'programs.academic.subtitle': 'Program untuk meningkatkan bahasa dan keupayaan pembelajaran asas',

    'programs.korean.title': 'Bahasa Korea',
    'programs.korean.desc': 'Pembelajaran Korea yang sistematik dari asas hingga lanjutan',
    'programs.korean.feature1': 'Asas membaca/menulis Hangul',
    'programs.korean.feature2': 'Latihan perbualan harian',
    'programs.korean.feature3': 'Pemahaman budaya Korea',
    'programs.korean.feature4': 'Korea berorientasikan pekerjaan',

    'programs.english.title': 'Bahasa Inggeris',
    'programs.english.desc': 'Meningkatkan kemahiran komunikasi Inggeris praktikal',
    'programs.english.feature1': 'Tatabahasa dan kosa kata asas',
    'programs.english.feature2': 'Pembelajaran berfokus perbualan',
    'programs.english.feature3': 'Inggeris perniagaan',
    'programs.english.feature4': 'Persediaan pensijilan Inggeris',

    'programs.math.title': 'Matematik',
    'programs.math.desc': 'Dari matematik asas hingga aplikasi kehidupan sebenar',
    'programs.math.feature1': 'Kemahiran pengiraan asas',
    'programs.math.feature2': 'Matematik praktikal',
    'programs.math.feature3': 'Pemikiran logik',
    'programs.math.feature4': 'Kemahiran menyelesaikan masalah',

    'programs.computer.title': 'Asas Komputer',
    'programs.computer.desc': 'Kemahiran komputer yang diperlukan dalam era digital',
    'programs.computer.feature1': 'Penggunaan program asas',
    'programs.computer.feature2': 'Penggunaan internet',
    'programs.computer.feature3': 'Penciptaan dokumen',
    'programs.computer.feature4': 'Komunikasi dalam talian',

    'programs.duration.2months': '2 bulan',
    'programs.duration.3months': '3 bulan',
    'programs.duration.4months': '4 bulan',
    'programs.duration.6months': '6 bulan',
    'programs.duration.ongoing': 'Berterusan',

    'programs.level.beginner': 'Pemula',
    'programs.level.beginner-intermediate': 'Pemula-Pertengahan',
    'programs.level.beginner-advanced': 'Pemula-Lanjutan',
    'programs.level.beginner-professional': 'Pemula-Profesional',
    'programs.level.basic-advanced': 'Asas-Lanjutan',
    'programs.level.all': 'Semua Tahap',

    'programs.vocational.title': 'Program Latihan Vokasional',
    'programs.vocational.subtitle': 'Pendidikan kemahiran praktikal untuk pekerjaan dan keusahawanan',

    'programs.video.title': 'Video Promosi Sekolah Vokasional Lighthouse Malaysia',
    'programs.video.subtitle': 'Temui program pendidikan dan cerita pelajar kami melalui video',
    'programs.video.click': 'Klik untuk menonton video',
    'programs.video.date': 'Dihasilkan pada Oktober 2024',
    'programs.video.youtube': 'Tonton di YouTube',

    'programs.barista.title': 'Kursus Barista (Mencari Guru)',
    'programs.barista.desc': 'Kemahiran barista profesional dan pengetahuan pengurusan kafe',
    'programs.barista.feature1': 'Teknik pengekstrakan kopi',
    'programs.barista.feature2': 'Seni latte asas',
    'programs.barista.feature3': 'Amalan operasi kafe',
    'programs.barista.feature4': 'Perkhidmatan pelanggan',

    'programs.baking.title': 'Kursus Pembakaran (Mencari Guru)',
    'programs.baking.desc': 'Dari pembakaran asas hingga pembakaran profesional',
    'programs.baking.feature1': 'Pembuatan roti asas',
    'programs.baking.feature2': 'Hiasan kek',
    'programs.baking.feature3': 'Pengurusan bahan',
    'programs.baking.feature4': 'Pengurusan kebersihan',

    'programs.hair.title': 'Kursus Kecantikan (Mencari Guru)',
    'programs.hair.desc': 'Pendidikan reka bentuk rambut dan kemahiran kecantikan',
    'programs.hair.feature1': 'Teknik potong asas',
    'programs.hair.feature2': 'Keriting dan pewarnaan',
    'programs.hair.feature3': 'Perundingan pelanggan',
    'programs.hair.feature4': 'Operasi salon',

    'programs.nursing.title': 'Kursus Kejururawatan',
    'programs.nursing.desc': 'Pendidikan penjagaan warga emas dan perkhidmatan kejururawatan',
    'programs.nursing.feature1': 'Kemahiran kejururawatan asas',
    'programs.nursing.feature2': 'Pertolongan cemas',
    'programs.nursing.feature3': 'Komunikasi pesakit',
    'programs.nursing.feature4': 'Kerjasama pasukan perubatan',

    'programs.cuisine.title': 'Kursus Masakan (Mencari Guru)',
    'programs.cuisine.desc': 'Pelbagai kemahiran masakan dan perkhidmatan makanan',
    'programs.cuisine.feature1': 'Kemahiran masakan asas',
    'programs.cuisine.feature2': 'Pengurusan kebersihan',
    'programs.cuisine.feature3': 'Pembangunan menu',
    'programs.cuisine.feature4': 'Operasi restoran',

    'programs.marketing.title': 'Kursus Pemasaran',
    'programs.marketing.desc': 'Pemasaran digital dan perniagaan dalam talian',
    'programs.marketing.feature1': 'Pemasaran media sosial',
    'programs.marketing.feature2': 'Pusat beli-belah dalam talian',
    'programs.marketing.feature3': 'Pengurusan pelanggan',
    'programs.marketing.feature4': 'Asas penjenamaan',

    'programs.enrichment.title': 'Program Aktiviti Budaya',
    'programs.enrichment.subtitle': 'Aktiviti untuk kestabilan emosi dan integrasi sosial',

    'programs.music.title': 'Aktiviti Muzik',
    'programs.music.desc': 'Terapi emosi melalui permainan alat muzik dan muzik',
    'programs.music.feature1': 'Pelajaran gitar/piano',
    'programs.music.feature2': 'Aktiviti koir',
    'programs.music.feature3': 'Terapi muzik',
    'programs.music.feature4': 'Peluang persembahan',

    'programs.sports.title': 'Aktiviti Sukan',
    'programs.sports.desc': 'Aktiviti fizikal berpusat pada bola sepak',
    'programs.sports.feature1': 'Operasi pasukan bola sepak',
    'programs.sports.feature2': 'Kecergasan fizikal',
    'programs.sports.feature3': 'Peningkatan kerja berpasukan',
    'programs.sports.feature4': 'Penyertaan pertandingan',

    'programs.benefits.title': 'Faedah Program',
    'programs.benefits.free': 'Pendidikan Percuma',
    'programs.benefits.free.desc': 'Semua yuran tuisyen dan bahan percuma',
    'programs.benefits.certificate': 'Pengeluaran Sijil',
    'programs.benefits.certificate.desc': 'Sijil rasmi dan surat pengesyoran',
    'programs.benefits.job': 'Penempatan Kerja',
    'programs.benefits.job.desc': 'Peluang pekerjaan dengan syarikat rakan kongsi',
    'programs.benefits.mentoring': 'Bimbingan Berterusan',
    'programs.benefits.mentoring.desc': 'Sokongan berterusan walaupun selepas tamat pengajian',

    'programs.cta.title': 'Mohon Sekarang',
    'programs.cta.subtitle': 'Ambil langkah pertama ke arah masa depan anda.',
    'programs.cta.apply': 'Mohon',

    // Football page
    'football.hero.subtitle': 'Penyembuhan dan Harapan Melalui Bola Sepak',
    'football.hero.description': 'Projek istimewa yang menyediakan belia pelarian di Malaysia dengan peluang untuk penyembuhan fizikal dan mental serta integrasi sosial melalui bola sepak.',
    'football.hero.join': 'Sertai Pasukan',
    'football.hero.support': 'Sokong Kami',

    'football.stats.players': 'Pemain Semasa',
    'football.stats.refugees': 'Pelarian di Malaysia',
    'football.stats.youth': 'Belia Pelarian',
    'football.stats.founded': 'Akan Ditubuhkan',

    'football.impact.title': 'Impak Kami',
    'football.impact.subtitle': 'Perubahan positif yang dicipta melalui bola sepak',

    'football.vision.title': 'Visi Projek',
    'football.vision.description': 'Bola sepak bukan sekadar sukan. Bagi kami, ia bermakna penyembuhan, harapan, dan permulaan baru.',
    'football.vision.healing': 'Penyembuhan Trauma',
    'football.vision.healing.desc': 'Pemulihan dan penyembuhan mental melalui sukan',
    'football.vision.integration': 'Integrasi Sosial',
    'football.vision.integration.desc': 'Hubungan dengan komuniti dan rasa kepunyaan',
    'football.vision.hope': 'Memberikan Harapan',
    'football.vision.hope.desc': 'Perancangan masa depan melalui impian dan matlamat',
    'football.vision.unity': 'Keharmonian Budaya',
    'football.vision.unity.desc': 'Persahabatan antara belia dari latar belakang yang pelbagai',

    'football.goals.title': 'Matlamat Projek',
    'football.goals.subtitle': 'Matlamat khusus untuk dicapai menjelang 2026',
    'football.goals.team': 'Pembentukan Pasukan Bola Sepak Rasmi',
    'football.goals.team.desc': 'Membentuk pasukan bola sepak belia rasmi sebanyak 15+ ahli untuk latihan dan perlawanan tetap.',
    'football.goals.health': 'Peningkatan Kesihatan Fizikal dan Mental',
    'football.goals.health.desc': 'Membina kekuatan fizikal melalui senaman tetap dan mencari kestabilan mental melalui aktiviti berpasukan.',
    'football.goals.community': 'Hubungan Komuniti',
    'football.goals.community.desc': 'Mencipta hubungan dengan masyarakat Malaysia melalui penyertaan dalam liga bola sepak tempatan.',
    'football.goals.potential': 'Pembangunan Kapasiti Peribadi',
    'football.goals.potential.desc': 'Belajar kemahiran hidup seperti kepimpinan, kerja berpasukan, dan tanggungjawab melalui bola sepak.',

    'football.effects.title': 'Kesan Yang Dijangka',
    'football.effects.subtitle': 'Perubahan positif melalui operasi pasukan bola sepak',
    'football.effects.healing': 'Menyembuhkan trauma dari perang dan kehidupan pelarian',
    'football.effects.capacity': 'Peningkatan keupayaan fizikal dan kekuatan mental',
    'football.effects.social': 'Pembangunan kemahiran sosial dan keupayaan interpersonal',
    'football.effects.identity': 'Pembentukan identiti dan peningkatan harga diri',
    'football.effects.awareness': 'Meningkatkan kesedaran masyarakat Malaysia terhadap pelarian',

    'football.program.title': 'Program Latihan',
    'football.program.description': 'Melalui latihan bola sepak yang sistematik dan profesional, kami mengejar peningkatan kemahiran dan pembentukan karakter pemain secara serentak.',
    'football.program.schedule': 'Latihan tetap 2 kali seminggu (Selasa, Jumaat)',
    'football.program.coaching': 'Jurulatih profesional dan sukarelawan',
    'football.program.league': 'Matlamat untuk menyertai liga tempatan',
    'football.program.support': 'Sokongan disesuaikan individu',

    'football.support.title': 'Kaedah Sokongan',
    'football.support.subtitle': 'Pelbagai cara untuk menyokong operasi pasukan bola sepak',
    'football.support.financial': 'Sokongan Kewangan',
    'football.support.financial.desc': 'Sokong sewa padang latihan, pembelian peralatan, kos pengangkutan, dll',
    'football.support.equipment': 'Sokongan Peralatan',
    'football.support.equipment.desc': 'Dermakan bola sepak, seragam, kasut, peralatan latihan, dll',
    'football.support.prayer': 'Sokongan Doa',
    'football.support.prayer.desc': 'Sila berdoa secara berterusan untuk pemain dan program',
    'football.support.volunteer': 'Sukarelawan',
    'football.support.volunteer.desc': 'Sertai dalam pelbagai peranan seperti jurulatih, pengurus, pemandu, dll',

    'football.volunteer.title': 'Peluang Sukarelawan',
    'football.volunteer.subtitle': 'Mencari sukarelawan untuk menyertai pasukan bola sepak',
    'football.volunteer.longterm': 'Sukarelawan Jangka Panjang',
    'football.volunteer.longterm.desc': 'Kerja sukarelawan yang boleh menyertai secara tetap',
    'football.volunteer.longterm.duration': 'Sertai sekurang-kurangnya 6 bulan',
    'football.volunteer.longterm.commitment': 'Penyertaan tetap 1-2 kali seminggu',
    'football.volunteer.shortterm': 'Sukarelawan Jangka Pendek',
    'football.volunteer.shortterm.desc': 'Bantu dengan acara atau aktiviti khas',
    'football.volunteer.shortterm.training': 'Bantuan latihan dan sokongan perlawanan',
    'football.volunteer.shortterm.cultural': 'Program pertukaran budaya',
    'football.volunteer.online': 'Sukarelawan Dalam Talian',
    'football.volunteer.online.desc': 'Aktiviti yang boleh membantu dari jauh',
    'football.volunteer.online.promotion': 'Promosi media sosial dan aktiviti pengumpulan dana',
    'football.volunteer.online.mentoring': 'Bimbingan dalam talian',

    'football.cta.title': 'Impian Yang Kami Bina Bersama',
    'football.cta.description': 'Sertai perjalanan istimewa ini untuk membawa harapan dan peluang baru kepada belia pelarian melalui bola sepak.',
    'football.cta.quote': 'Sukan mempunyai kuasa untuk mengubah dunia. Ia mempunyai kuasa untuk memberi inspirasi, meruntuhkan prasangka, dan mencipta keamanan.',
    'football.cta.verse': '- Nelson Mandela',
    'football.cta.join': 'Sertai Pasukan',
    'football.cta.support': 'Sokong Kami',
    'football.cta.contact': 'Hubungi Kami',

    // Support page
    'support.hero.title': 'Sokongan',
    'support.hero.subtitle': 'Sertai Lighthouse Malaysia dalam mencipta masa depan belia pelarian.',

    'support.info.title': 'Kaedah Sokongan',

    'support.student.title': 'Permohonan Pelajar',
    'support.student.info': 'Belia pelarian berumur 14-17 tahun boleh menyertai program pendidikan percuma.',
    'support.student.requirements': `Kelayakan:
• Umur: 14-17 tahun
• Status: Pelarian atau tidak berkewarganegaraan
• Kediaman: Kuala Lumpur dan kawasan berhampiran, Malaysia
• Motivasi pembelajaran: Niat penyertaan yang ikhlas

Dokumen yang diperlukan:
• Kad UNHCR atau dokumen berkaitan
• Dokumen pengenalan
• Bukti kediaman
• Persetujuan penjaga

Kaedah permohonan:
Hubungi melalui emel atau telefon, kemudian teruskan dengan temu duga`,

    'support.volunteer.title': 'Permohonan Sukarelawan',
    'support.volunteer.info': 'Kami merekrut sukarelawan untuk membantu belia pelarian dalam pelbagai bidang.',
    'support.volunteer.requirements': `Bidang sukarelawan:
• Sokongan pendidikan: Korea, Inggeris, Matematik, dll
• Latihan vokasional: Barista, pembakaran, kecantikan, dll
• Kaunseling dan bimbingan
• Sokongan pentadbiran
• Terjemahan dan penterjemahan
• Jurulatih dan pengurus pasukan bola sepak

Syarat penyertaan:
• Tersedia untuk sekurang-kurangnya 3 bulan
• Penyertaan tetap 1-2 kali seminggu
• Pemahaman dan minat terhadap pelarian
• Kemahiran komunikasi asas

Kaedah permohonan:
Hantar resume dan pengenalan diri melalui emel`,

    'support.partner.title': 'Pertanyaan Perkongsian',
    'support.partner.info': 'Kami mencipta impak yang lebih besar melalui perkongsian dengan syarikat, organisasi, dan gereja.',
    'support.partner.requirements': `Jenis perkongsian:
• Perkongsian korporat: Penempatan kerja, penyediaan latihan industri
• Institusi pendidikan: Pembangunan kurikulum, penghantaran pengajar
• Gereja dan organisasi agama: Sokongan rohani, sukarelawan
• NGO dan organisasi sosial: Kerjasama program

Faedah:
• Realisasi tanggungjawab sosial
• Peluang untuk menemui bakat cemerlang
• Faedah cukai (jika berkenaan)
• Kesan promosi dan pemasaran

Kaedah pertanyaan:
Hantar cadangan perkongsian melalui emel`,

    'support.contact.methods': 'Kaedah Hubungan',
    'support.contact.hours': 'Waktu Operasi',
    'support.contact.response': 'Isnin-Jumaat: 2:30 PTG-5 PTG | Sabtu.Ahad: Tutup',

    // About page
    'about.hero.title': 'Tentang Lighthouse Malaysia',
    'about.hero.subtitle': 'Kami akan menjadi mercusuar yang menyinari cahaya harapan kepada belia pelarian.',

    'about.mission.title': 'Misi Kami',
    'about.mission.description': 'Misi Lighthouse Malaysia adalah membantu belia pelarian di Malaysia membina kebergantungan diri melalui pendidikan dan latihan vokasional, dan mencipta masa depan yang penuh harapan.',
    'about.mission.point1': 'Merealisasikan peluang sama rata melalui pendidikan percuma',
    'about.mission.point2': 'Menyokong kemerdekaan ekonomi melalui pendidikan kemahiran praktikal',
    'about.mission.point3': 'Menggalakkan kestabilan emosi dan integrasi sosial',

    'about.vision.title': 'Visi Kami',
    'about.vision.description': 'Kami akan mencipta dunia di mana semua belia pelarian boleh menikmati hak untuk pendidikan tanpa mengira asal usul dan latar belakang mereka, dan merealisasikan impian mereka.',
    'about.vision.point1': 'Integrasi sosial melalui pendidikan',
    'about.vision.point2': 'Membina asas kebergantungan diri yang mampan',
    'about.vision.point3': 'Memupuk pemimpin generasi akan datang',

    'about.values.title': 'Nilai Kami',
    'about.values.subtitle': 'Nilai teras yang dikejar oleh Lighthouse Malaysia',
    'about.values.love': 'Kasih Sayang',
    'about.values.love.desc': 'Kami menjaga belia dengan kasih sayang dan minat tanpa syarat',
    'about.values.practical': 'Praktikal',
    'about.values.practical.desc': 'Kami menyediakan pendidikan yang membantu dalam kehidupan sebenar',
    'about.values.inclusion': 'Inklusif',
    'about.values.inclusion.desc': 'Kami mengalu-alukan belia dari semua latar belakang',
    'about.values.innovation': 'Inovasi',
    'about.values.innovation.desc': 'Kami mengejar kaedah pendidikan yang kreatif dan berkesan',

    'about.journey.title': 'Perjalanan Kami',
    'about.journey.subtitle': 'Proses pertumbuhan Lighthouse Malaysia',

    'about.milestone.2022.10': 'Mesyuarat dengan belia pelarian',
    'about.milestone.2023.3': 'Memulakan pendidikan peribadi 1:1 di rumah',
    'about.milestone.2024.5': 'Membuka Sekolah Vokasional OFPA (kumpulan pertama, 3 pelajar)',
    'about.milestone.2024.10': 'Mengambil 3 pelajar untuk kumpulan kedua',
    'about.milestone.2025.7': 'Menandatangani kontrak & pengubahsuaian pusat di Ampang',
    'about.milestone.2025.10': 'Lighthouse Malaysia dibuka',
    'about.milestone.2025.12': 'Lighthouse FC ditubuhkan',

    'about.team.title': 'Pasukan Kami',
    'about.team.subtitle': 'Perubahan yang dicipta bersama oleh ahli pasukan yang berdedikasi',

    'about.team.christina.name': 'Christina Kim',
    'about.team.christina.role': 'Pengarah Pusat',
    'about.team.christina.desc': 'Penduduk jangka panjang Malaysia, pakar Matematik & Iringan',

    'about.team.noah.name': 'Jimmy',
    'about.team.noah.role': 'Pengurus Utama',
    'about.team.noah.desc': '20 tahun pengalaman pendidikan luar negara, pengurus LHMY FC',

    'about.team.grace.name': 'Melony',
    'about.team.grace.role': 'Hal Ehwal Am',
    'about.team.grace.desc': 'Pendidikan Inggeris & Kejururawatan, Pengurusan ahli',

    'about.team.paul.name': 'Paul Cho',
    'about.team.paul.role': 'Ketua Pasukan IT',
    'about.team.paul.desc': 'Pendidikan Komputer, AI, Pemasaran, Pengurusan laman web',

    'about.team.sema.name': 'Sema Kim',
    'about.team.sema.role': 'Ketua Pasukan Pengurusan',
    'about.team.sema.desc': 'Pendidikan Korea, Pengurusan peralatan & dokumen',

    'about.cta.title': 'Sertai Kami',
    'about.cta.subtitle': 'Sertai misi Lighthouse Malaysia untuk mencerahkan masa depan belia pelarian.',
    'about.cta.join': 'Sertai',
    'about.cta.contact': 'Hubungi',

    // Contact page
    'contact.hero.title': 'Hubungi',
    'contact.hero.subtitle': 'Sila hubungi kami bila-bila masa. Kami akan membantu anda dengan sepenuh hati.',

    'contact.info.title': 'Maklumat Hubungan',

    'contact.address.title': 'Alamat',
    'contact.address.detail': '15-1F, Jalan Perubatan 4,\nTaman Pandan Indah,\n55100 Kuala Lumpur, Selangor, Malaysia',

    'contact.phone.title': 'Telefon',
    'contact.phone.number': '+60 11-2079-8850',
    'contact.phone.hours': 'Respons 24 jam tersedia (kecemasan)',

    'contact.email.title': 'Emel',
    'contact.email.address': 'lhmy.kr@gmail.com',

    'contact.hours.title': 'Waktu Operasi',
    'contact.hours.weekdays': 'Isnin.Selasa.Khamis.Jumaat: 2 PTG-5 PTG',
    'contact.hours.field': 'Selasa.Jumaat: 5:30 PTG-7 PTG (padang)',
    'contact.hours.closed': 'Sabtu.Ahad: Tutup',

    'contact.location.title': 'Arah',
    'contact.location.subtitle': 'Akses mudah dengan pengangkutan awam atau kereta',

    'contact.inquiry.title': 'Buat Pertanyaan',
    'contact.inquiry.info': 'Kami mengalu-alukan semua pertanyaan tentang permohonan program pendidikan, sukarelawan, derma, dll.',
    'contact.inquiry.methods': `Kaedah hubungan:
• Emel: lhmy.kr@gmail.com
• Telefon/Teks: +60 11-2079-8850
• Lawatan langsung: Lawat selepas hubungan awal`,

    'contact.inquiry.include': 'Maklumat untuk disertakan dalam pertanyaan',
    'contact.inquiry.requirements': `Maklumat yang diperlukan:
• Nama penuh
• Nombor hubungan (telefon)
• Alamat emel
• Kandungan pertanyaan

Maklumat pilihan:
• Umur (semasa memohon pendidikan)
• Kawasan kediaman
• Program yang diminati
• Masa sukarelawan yang tersedia`,

    'contact.response': 'Emel: Respons dalam 24 jam | Telefon: Perundingan segera',

    // Donate page
    'donate.hero.title': 'Derma',
    'donate.hero.subtitle': 'Derma berharga anda mencerahkan masa depan belia pelarian.',

    'donate.impact.title': 'Impak Derma',
    'donate.impact.subtitle': 'Pencapaian yang dibuat dengan derma anda setakat ini',
    'donate.impact.students': 'Pelajar',
    'donate.impact.meals': 'Hidangan Disediakan',
    'donate.impact.programs': 'Program Operasi',
    'donate.impact.volunteers': 'Sukarelawan',

    'donate.info.title': 'Panduan Derma',

    'donate.types.title': 'Jenis Derma',
    'donate.types.monthly': 'Derma Bulanan',
    'donate.types.monthly.desc': 'Sokong operasi pendidikan berterusan dengan menderma jumlah tetap setiap bulan.',
    'donate.types.onetime': 'Derma Sekali',
    'donate.types.onetime.desc': 'Sokong projek khas dengan menderma jumlah yang diingini mengikut keperluan.',

    'donate.amounts.title': 'Impak Mengikut Jumlah Derma',
    'donate.amounts.10000': 'Bulanan 10,000 KRW → Sokong kos buku teks untuk 1 pelajar',
    'donate.amounts.50000': 'Bulanan 50,000 KRW → Kos pendidikan bulanan penuh untuk 1 pelajar',
    'donate.amounts.200000': 'Bulanan 200,000 KRW → Sokong operasi program latihan vokasional',
    'donate.amounts.500000': 'Bulanan 500,000 KRW → Sokong sewa pusat dan kos operasi',
    'donate.amounts.1000000': 'Bulanan 1,000,000 KRW → Pembangunan dan pengembangan program pendidikan baru',
    'donate.amounts.custom': 'Derma percuma dengan sebarang jumlah yang anda inginkan',

    'donate.how.title': 'Cara Menderma',
    'donate.how.info': 'Sila hubungi kami selepas mendepositkan ke akaun di bawah untuk pengesahan.',
    'donate.how.requirements': `Maklumat yang diperlukan untuk derma:
• Nama penderma
• Nombor hubungan
• Jenis derma (bulanan/sekali)
• Jumlah derma`,

    'donate.accounts.title': 'Akaun Derma',

    'donate.contact.title': 'Pertanyaan Derma',
    'donate.contact.email': 'lhmy.kr@gmail.com',
    'donate.contact.phone': '+60 11-2079-8850',

    'donate.thanks': 'Kami amat menghargai hati berharga anda.',

    // Footer
    'footer.mission': 'Lighthouse Malaysia menyediakan pendidikan dan harapan kepada belia pelarian di Malaysia.',
    'footer.quicklinks': 'Pautan Pantas',
    'footer.contact': 'Hubungi',
    'footer.copyright': '© 2024 Lighthouse Malaysia. Hak cipta terpelihara.',
    'footer.madewith': 'Dibuat dengan',
    'footer.foryouth': 'untuk belia pelarian',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
