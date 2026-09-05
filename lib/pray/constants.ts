export const prayerDirections = ["身体安康", "心情安稳", "学业顺利", "事业平稳", "家庭和睦", "出行平安"] as const;

export type PrayerDirection = (typeof prayerDirections)[number];
