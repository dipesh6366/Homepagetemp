export const marathiMonths = [
  "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
  "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"
];

export const marathiDays = [
  "रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"
];

export const toMarathiNumbers = (numStr: string | number): string => {
  const map: { [key: string]: string } = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };
  return String(numStr).replace(/[0-9]/g, (char) => map[char] || char);
};

export const getMarathiDateString = (dateInput?: number | Date | string): string => {
  const d = dateInput ? new Date(dateInput) : new Date();
  const dayName = marathiDays[d.getDay()];
  const dateNum = toMarathiNumbers(d.getDate());
  const monthName = marathiMonths[d.getMonth()];
  const year = toMarathiNumbers(d.getFullYear());

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
};

export const getMarathiTimeString = (dateInput?: number | Date | string): string => {
  const d = dateInput ? new Date(dateInput) : new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const ampm = hours >= 12 ? 'म.उ.' : 'म.पू.';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const hStr = toMarathiNumbers(hours.toString().padStart(2, '0'));
  const mStr = toMarathiNumbers(minutes.toString().padStart(2, '0'));
  const sStr = toMarathiNumbers(seconds.toString().padStart(2, '0'));

  return `${hStr}:${mStr}:${sStr} ${ampm}`;
};
