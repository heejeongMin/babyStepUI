import { MonthInfo } from "@shared/schema";

export const monthsData: MonthInfo[] = [
  {
    month: 0,
    ageLabel: "Newborn",
    title: "Welcome to the World",
    description:
      "The first month is all about adjustment, bonding, and establishing basic routines.",
    checklists: [
      {
        id: "0-s1",
        title: "Vitamin K shot",
        description: "Usually given at birth to prevent bleeding",
        completed: false,
        category: "supplements",
      },
      {
        id: "0-s2",
        title: "Vitamin D drops",
        description: "Start 400 IU daily for breastfed babies",
        completed: false,
        category: "supplements",
      },
      {
        id: "0-p1",
        title: "Tummy time",
        description: "Start with 2-3 minutes, 2-3 times per day",
        completed: false,
        category: "play",
      },
      {
        id: "0-p2",
        title: "High contrast images",
        description: "Black and white patterns stimulate vision",
        completed: false,
        category: "play",
      },
      {
        id: "0-m1",
        title: "Track head turning",
        description: "Baby should turn head side to side",
        completed: false,
        category: "movement",
      },
      {
        id: "0-sl1",
        title: "Sleep 14-17 hours",
        description: "Broken into short periods throughout day and night",
        completed: false,
        category: "sleep",
      },
      {
        id: "0-f1",
        title: "Feed every 2-3 hours",
        description: "8-12 times per day for breastfed babies",
        completed: false,
        category: "feeding",
      },
      {
        id: "0-sf1",
        title: "Safe sleep setup",
        description: "Firm mattress, no blankets or pillows",
        completed: false,
        category: "safety",
      },
    ],
    milestones: [
      "Recognizes parent's voice",
      "Makes eye contact",
      "Responds to loud sounds",
      "Moves arms and legs equally",
    ],
    tips: [
      "Skin-to-skin contact promotes bonding",
      "White noise can help with sleep",
      "Track feeding and diaper changes",
    ],
  },
  {
    month: 1,
    ageLabel: "1 Month",
    title: "Growing Awareness",
    description:
      "Baby is becoming more alert and starting to track objects with their eyes.",
    checklists: [
      {
        id: "1-s1",
        title: "Continue Vitamin D",
        description: "400 IU daily",
        completed: false,
        category: "supplements",
      },
      {
        id: "1-p1",
        title: "Increase tummy time",
        description: "Work up to 5 minutes, 3-4 times per day",
        completed: false,
        category: "play",
      },
      {
        id: "1-p2",
        title: "Talk and sing",
        description: "Narrate daily activities",
        completed: false,
        category: "play",
      },
      {
        id: "1-m1",
        title: "Observe tracking",
        description: "Baby should follow objects 90 degrees",
        completed: false,
        category: "movement",
      },
      {
        id: "1-m2",
        title: "Check reflexes",
        description: "Grasp reflex should be strong",
        completed: false,
        category: "movement",
      },
      {
        id: "1-sl1",
        title: "Establish bedtime routine",
        description: "Bath, feeding, quiet time",
        completed: false,
        category: "sleep",
      },
      {
        id: "1-f1",
        title: "Feed on demand",
        description: "Still 8-12 times per day",
        completed: false,
        category: "feeding",
      },
    ],
    milestones: [
      "Lifts head briefly during tummy time",
      "Focuses on faces",
      "Begins to smile",
      "Makes cooing sounds",
    ],
    tips: [
      "Watch for first social smile",
      "Baby may sleep longer stretches at night",
      "Respond quickly to cries to build trust",
    ],
  },
  {
    month: 6,
    ageLabel: "6 Months",
    title: "Sitting & Starting Solids",
    description:
      "A major milestone month with sitting up and beginning solid foods.",
    checklists: [
      {
        id: "6-s1",
        title: "Iron-rich foods",
        description: "Start iron-fortified cereals or purées",
        completed: false,
        category: "supplements",
      },
      {
        id: "6-s2",
        title: "Continue Vitamin D",
        description: "400 IU daily",
        completed: false,
        category: "supplements",
      },
      {
        id: "6-p1",
        title: "Sitting practice",
        description: "Support sitting with pillows",
        completed: false,
        category: "play",
      },
      {
        id: "6-p2",
        title: "Introduce textured toys",
        description: "Different materials for exploration",
        completed: false,
        category: "play",
      },
      {
        id: "6-p3",
        title: "Mirror play",
        description: "Let baby see their reflection",
        completed: false,
        category: "play",
      },
      {
        id: "6-m1",
        title: "Rolling both ways",
        description: "Front to back and back to front",
        completed: false,
        category: "movement",
      },
      {
        id: "6-m2",
        title: "Passing objects",
        description: "Transfer toys between hands",
        completed: false,
        category: "movement",
      },
      {
        id: "6-f1",
        title: "Introduce solids",
        description: "Start with single-ingredient purées",
        completed: false,
        category: "feeding",
      },
      {
        id: "6-f2",
        title: "Offer water in cup",
        description: "Small amounts during meals",
        completed: false,
        category: "feeding",
      },
      {
        id: "6-sf1",
        title: "Babyproof home",
        description: "Start preparing for mobility",
        completed: false,
        category: "safety",
      },
    ],
    milestones: [
      "Sits without support",
      "Reaches for objects",
      "Responds to own name",
      "Begins to babble with consonants",
    ],
    tips: [
      "Watch for signs of readiness for solids",
      "Start one new food at a time",
      "Expect sleep regression around this time",
    ],
  },
  {
    month: 12,
    ageLabel: "12 Months",
    title: "First Birthday!",
    description:
      "One year old with big developmental leaps and possibly first steps.",
    checklists: [
      {
        id: "12-s1",
        title: "Whole milk transition",
        description: "Switch from formula to whole milk",
        completed: false,
        category: "supplements",
      },
      {
        id: "12-s2",
        title: "Continue Vitamin D",
        description: "400 IU daily",
        completed: false,
        category: "supplements",
      },
      {
        id: "12-p1",
        title: "Simple puzzles",
        description: "Shape sorters and stacking toys",
        completed: false,
        category: "play",
      },
      {
        id: "12-p2",
        title: "Reading together",
        description: "Board books with simple pictures",
        completed: false,
        category: "play",
      },
      {
        id: "12-p3",
        title: "Music and dancing",
        description: "Move to rhythm together",
        completed: false,
        category: "play",
      },
      {
        id: "12-m1",
        title: "First steps",
        description: "May start walking independently",
        completed: false,
        category: "movement",
      },
      {
        id: "12-m2",
        title: "Pincer grasp",
        description: "Pick up small objects with thumb and finger",
        completed: false,
        category: "movement",
      },
      {
        id: "12-f1",
        title: "Table foods",
        description: "Eating similar foods to family",
        completed: false,
        category: "feeding",
      },
      {
        id: "12-f2",
        title: "Self-feeding",
        description: "Using fingers and practicing with spoon",
        completed: false,
        category: "feeding",
      },
      {
        id: "12-sf1",
        title: "Outlet covers",
        description: "Cover all accessible outlets",
        completed: false,
        category: "safety",
      },
      {
        id: "12-sf2",
        title: "Gate stairs",
        description: "Install safety gates",
        completed: false,
        category: "safety",
      },
    ],
    milestones: [
      "Says first words",
      "Waves bye-bye",
      "Stands alone",
      "Understands simple commands",
    ],
    tips: [
      "Celebrate this amazing milestone!",
      "Keep encouraging walking but don't push",
      "Introduce cow's milk gradually",
    ],
  },
];

export function getMonthData(month: number): MonthInfo | undefined {
  return monthsData.find((m) => m.month === month);
}

export function getAllMonths(): number[] {
  return monthsData.map((m) => m.month);
}
