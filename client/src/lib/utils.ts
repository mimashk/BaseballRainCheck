import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format temperature with degree symbol
export function formatTemperature(temp: number): string {
  return `${temp}°C`;
}

// Format precipitation with units
export function formatPrecipitation(precip: number): string {
  return `${precip} mm/h`;
}

// Format humidity with percentage
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

// Format wind speed with units
export function formatWindSpeed(speed: number): string {
  return `${speed} m/s`;
}

// Format date for display (YYYY/MM/DD)
export function formatDate(date: string): string {
  return date.replace(/-/g, "/");
}

// Format matchup teams
export function formatMatchup(homeTeam: string, awayTeam: string): string {
  return `${homeTeam} vs ${awayTeam}`;
}

// Convert JSON date string to formatted date
export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  
  return `${year}年${month}月${day}日 (${dayOfWeek}) ${hours}:${minutes}`;
}

// Get current date time in Japanese format
export function getCurrentDateTime(): string {
  return formatDateString(new Date().toISOString());
}
