
export interface MilitaryType {
  id: string;
  name: string;
  colorClass: string;
}

export const militaryTypes: MilitaryType[] = [
  { id: "陸軍", name: "陸軍", colorClass: "bg-military-army" },
  { id: "navy", name: "海軍", colorClass: "bg-military-navy" },
  { id: "airForce", name: "空軍", colorClass: "bg-military-airForce" },
  { id: "marines", name: "海軍陸戰隊", colorClass: "bg-military-marines" },
  { id: "alternative", name: "替代役", colorClass: "bg-military-alternative" },
  { id: "armyTraining", name: "陸軍軍訓", colorClass: "bg-military-armyTraining" },
  { id: "airForceTraining", name: "空軍軍訓", colorClass: "bg-military-airForceTraining" },
  { id: "supplementary", name: "補充兵", colorClass: "bg-military-supplementary" },
  { id: "navyShipTraining", name: "海艦軍訓", colorClass: "bg-military-navyShipTraining" },
  { id: "navyShipMan", name: "海軍艦艇兵", colorClass: "bg-military-navyShipMan" }
];
