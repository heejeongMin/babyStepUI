import MilestoneCard from '../MilestoneCard';

export default function MilestoneCardExample() {
  const milestones = [
    "Sits without support",
    "Reaches for objects",
    "Responds to own name",
    "Begins to babble with consonants"
  ];

  const tips = [
    "Watch for signs of readiness for solids",
    "Start one new food at a time",
    "Expect sleep regression around this time"
  ];

  return <MilestoneCard milestones={milestones} tips={tips} />;
}
