import type { SiteSection } from '../types/cms';

export const SITE_SETTINGS_KEY = 'site.settings';

export interface HomeStatsSettings {
  students: string;
  programs: string;
  volunteers: string;
  years: string;
}

export interface ProgramTitleSettings {
  homePractical: string;
  barista: string;
  baking: string;
  hair: string;
  cuisine: string;
}

export interface FootballSettings {
  currentPlayers: string;
  foundedYear: string;
  goalsTargetYear: string;
  trainingSchedule: string;
}

export interface SupportSettings {
  studentAge: string;
  officeHours: string;
  visitWeekdays: string;
  visitClosed: string;
  guardianConsentLabel: string;
}

export interface ContactSettings {
  weekdays: string;
  field: string;
  closed: string;
  studentAge: string;
}

export interface DonateSettings {
  meals: string;
  programs: string;
  volunteers: string;
  amount10000: string;
  amount50000: string;
  amount200000: string;
  amount500000: string;
  amount1000000: string;
  amountCustom: string;
}

export interface MilestoneSetting {
  id: string;
  year: string;
  title: string;
}

export interface TeamMemberSetting {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
}

export interface SiteSettings {
  homeStats: HomeStatsSettings;
  programs: ProgramTitleSettings;
  football: FootballSettings;
  support: SupportSettings;
  contact: ContactSettings;
  donate: DonateSettings;
  milestones: MilestoneSetting[];
  team: TeamMemberSetting[];
}

export const defaultSiteSettings: SiteSettings = {
  homeStats: {
    students: '37+',
    programs: '5',
    volunteers: '8+',
    years: '2',
  },
  programs: {
    homePractical: '실용 기술(준비중)',
    barista: '바리스타 과정(교사모집중)',
    baking: '제빵 과정(교사모집중)',
    hair: '미용 과정(교사모집중)',
    cuisine: '요리 과정(교사모집중)',
  },
  football: {
    currentPlayers: '15+',
    foundedYear: '2025',
    goalsTargetYear: '2026',
    trainingSchedule: '주 2회 정기 훈련(화, 금)',
  },
  support: {
    studentAge: '14~17세',
    officeHours: '월-금: 오후 2시반~5시 | 토.일: 휴무',
    visitWeekdays: '오후 2시반 - 5시',
    visitClosed: '휴무',
    guardianConsentLabel: '보호자 동의서',
  },
  contact: {
    weekdays: '월.화.목.금: 오후2시~오후5시',
    field: '화.금: 오후5시반~오후7시(운동장)',
    closed: '토.일: 휴무',
    studentAge: '14~17세',
  },
  donate: {
    meals: '1,000+',
    programs: '5',
    volunteers: '8+',
    amount10000: '월 10,000원 → 교육생 1명의 교재비 지원',
    amount50000: '월 50,000원 → 교육생 1명의 월간 교육비 지원',
    amount200000: '월 200,000원 → 직업 훈련 프로그램 운영 지원',
    amount500000: '월 500,000원 → 새로운 교육 프로그램 개발 및 확장',
    amount1000000: '월 1,000,000원 → 센터 임대료 및 운영비 지원',
    amountCustom: '원하는 금액으로 자유롭게 후원',
  },
  milestones: [
    { id: '2022-10', year: '2022.10', title: '난민청소년들 미팅' },
    { id: '2023-03', year: '2023.3', title: '가정에서 1:1 맞춤형 교육 시작' },
    { id: '2024-05', year: '2024.5', title: 'OFPA직업학교 개교(1기 3명)' },
    { id: '2024-10', year: '2024.10', title: '2기 교육생 3명 모집' },
    { id: '2025-07', year: '2025.7', title: '암팡지역 센타 계약&인테리어' },
    { id: '2025-10', year: '2025.10', title: '등대 말레이시아 오픈' },
    { id: '2025-12', year: '2025.12', title: '라이트하우스FC 창단' },
  ],
  team: [
    {
      id: 'christina',
      name: 'Christina',
      role: '센터장',
      description: '말레이시아 장기거주자, 수학.반주 전문가',
      emoji: '👩',
    },
    {
      id: 'jimmy',
      name: 'Jimmy',
      role: '책임리더',
      description: '해외교육경력 20년, LHMY FC담당',
      emoji: '👨',
    },
    {
      id: 'melony',
      name: 'Melony',
      role: '총무',
      description: '영어.간호보건 교육, 회원관리담당',
      emoji: '👩',
    },
    {
      id: 'paul',
      name: 'Paul',
      role: 'IT팀장',
      description: '컴퓨터.AI.마케팅 교육, 홈페이지관리담당',
      emoji: '👨‍💻',
    },
    {
      id: 'sema',
      name: 'Sema',
      role: '관리팀장',
      description: '한국어 교육, 집기.문서관리담당',
      emoji: '👩',
    },
  ],
};

type SettingsRecord = Partial<{
  homeStats: Partial<HomeStatsSettings>;
  programs: Partial<ProgramTitleSettings>;
  football: Partial<FootballSettings>;
  support: Partial<SupportSettings>;
  contact: Partial<ContactSettings>;
  donate: Partial<DonateSettings>;
  milestones: MilestoneSetting[];
  team: TeamMemberSetting[];
}>;

function normalizeTeamName(name: string) {
  const replacements: Record<string, string> = {
    'Christina Kim': 'Christina',
    'Paul Cho': 'Paul',
    'Sema Kim': 'Sema',
  };

  return replacements[name] || name;
}

export function mergeSiteSettings(settings?: SettingsRecord | null): SiteSettings {
  return {
    homeStats: { ...defaultSiteSettings.homeStats, ...(settings?.homeStats || {}) },
    programs: { ...defaultSiteSettings.programs, ...(settings?.programs || {}) },
    football: { ...defaultSiteSettings.football, ...(settings?.football || {}) },
    support: { ...defaultSiteSettings.support, ...(settings?.support || {}) },
    contact: { ...defaultSiteSettings.contact, ...(settings?.contact || {}) },
    donate: { ...defaultSiteSettings.donate, ...(settings?.donate || {}) },
    milestones: settings?.milestones?.length ? settings.milestones : defaultSiteSettings.milestones,
    team: settings?.team?.length
      ? settings.team.map((member) => ({ ...member, name: normalizeTeamName(member.name) }))
      : defaultSiteSettings.team,
  };
}

export function getSettingsSection(sections: SiteSection[]) {
  return sections.find((section) => section.section_key === SITE_SETTINGS_KEY && section.locale === 'ko');
}

export function resolveSiteSettings(sections: SiteSection[]) {
  const section = getSettingsSection(sections);
  if (!section?.body) return defaultSiteSettings;

  try {
    return mergeSiteSettings(JSON.parse(section.body) as SettingsRecord);
  } catch {
    return defaultSiteSettings;
  }
}

export function settingsToSiteSection(settings: SiteSettings, existing?: SiteSection): SiteSection {
  return {
    ...existing,
    section_key: SITE_SETTINGS_KEY,
    locale: 'ko',
    title: '사이트 설정',
    body: JSON.stringify(settings, null, 2),
  };
}

export function createMilestone(): MilestoneSetting {
  const id = `milestone-${Date.now()}`;
  return { id, year: '', title: '' };
}

export function createTeamMember(): TeamMemberSetting {
  const id = `team-${Date.now()}`;
  return { id, name: '', role: '', description: '', emoji: '👤' };
}
