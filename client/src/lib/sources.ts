import { l, type L } from "./monthContent/types";

export type Source = { name: L; usedFor: L; url: string };

export const SOURCES: Source[] = [
  {
    name: l("CDC: Learn the Signs. Act Early. (발달 이정표 체크리스트, 2022)", "CDC: Learn the Signs. Act Early. (milestone checklists, 2022)"),
    usedFor: l("개월별 발달 이정표", "Developmental milestones by age"),
    url: "https://www.cdc.gov/act-early/milestones/index.html",
  },
  {
    name: l("미국소아과학회(AAP): HealthyChildren.org", "American Academy of Pediatrics: HealthyChildren.org"),
    usedFor: l("안전한 수면, 이유식, 비타민 D·철분, 영상 시청, 안전 수칙", "Safe sleep, starting solids, vitamin D and iron, screen time, safety"),
    url: "https://www.healthychildren.org",
  },
  {
    name: l("WHO: 5세 미만 아동의 신체활동·좌식행동·수면 지침 (2019)", "WHO: Guidelines on physical activity, sedentary behaviour and sleep for children under 5 (2019)"),
    usedFor: l("영상 시청과 수면 시간", "Screen time and sleep"),
    url: "https://www.who.int/publications/i/item/9789241550536",
  },
  {
    name: l("질병관리청 국가예방접종사업 (예방접종도우미)", "KDCA National Immunization Program (Korea)"),
    usedFor: l("예방접종 종류와 시기", "Vaccine types and timing"),
    url: "https://nip.kdca.go.kr",
  },
  {
    name: l("국민건강보험공단: 영유아 건강검진", "National Health Insurance Service: infant and child health checkups (Korea)"),
    usedFor: l("검진 시기와 K-DST 발달선별검사", "Checkup windows and the K-DST developmental screening"),
    url: "https://www.nhis.or.kr",
  },
  {
    name: l("로타바이러스 백신 접종 연령 기준 (CDC/ACIP, Immunize.org 정리)", "Rotavirus vaccine age limits (CDC/ACIP, summarized by Immunize.org)"),
    usedFor: l("로타바이러스 접종 기한", "Rotavirus vaccine deadlines"),
    url: "https://www.immunize.org/ask-experts/topic/rotavirus/vaccine-recommendations-rotavirus/",
  },
  {
    name: l("미국소아치과학회(AAPD)", "American Academy of Pediatric Dentistry (AAPD)"),
    usedFor: l("양치, 불소 치약, 첫 치과 방문 (미국 기준이라 치과에서 확인하세요)", "Brushing, fluoride toothpaste, first dental visit (US guidance; confirm with your dentist)"),
    url: "https://www.aapd.org",
  },
  {
    name: l("도로교통법: 만 6세 미만 어린이 카시트 의무", "Korean Road Traffic Act: child car seat required under age 6"),
    usedFor: l("카시트 안내", "Car seat advice"),
    url: "https://www.law.go.kr",
  },
];
