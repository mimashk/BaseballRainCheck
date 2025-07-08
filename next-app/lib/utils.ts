import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

export function formatPrecipitation(precip: number): string {
  return `${precip.toFixed(1)}mm`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)}m/s`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatMatchup(homeTeam: string, awayTeam: string): string {
  return `${homeTeam} vs ${awayTeam}`;
}

export function formatDateString(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP');
}

export function getCurrentDateTime(): string {
  return new Date().toISOString();
}