import { PredictionResult } from "./types";

// Function to get color based on probability
export function getProbabilityColor(probability: number): string {
  if (probability < 25) {
    return "bg-green-500";
  } else if (probability < 50) {
    return "bg-yellow-500";
  } else if (probability < 75) {
    return "bg-orange-500";
  } else {
    return "bg-red-500";
  }
}

// Function to get a simple text status based on probability
export function getProbabilityStatus(probability: number): string {
  if (probability < 25) {
    return "試合開催の可能性が高い";
  } else if (probability < 50) {
    return "試合は開催される可能性があります";
  } else if (probability < 75) {
    return "試合中止の可能性があります";
  } else {
    return "試合中止の可能性が高いです";
  }
}

// Function to get a gradient style for prediction meter
export function getPredictionGradient(probability: number): string {
  // Use different gradients based on the probability range
  if (probability < 25) {
    return "bg-gradient-to-r from-green-500 to-green-400";
  } else if (probability < 50) {
    return "bg-gradient-to-r from-green-400 to-yellow-500";
  } else if (probability < 75) {
    return "bg-gradient-to-r from-yellow-500 to-red-500";
  } else {
    return "bg-gradient-to-r from-orange-500 to-red-600";
  }
}

// Function to get the width style for the prediction meter
export function getPredictionWidth(probability: number): string {
  return `width: ${probability}%`;
}

// Function to get the recommendation based on prediction
export function getRecommendation(prediction: PredictionResult): string {
  const { cancellationProbability } = prediction;
  
  if (cancellationProbability < 25) {
    return "試合は予定通り行われる可能性が高いです。";
  } else if (cancellationProbability < 50) {
    return "試合は行われる可能性がありますが、天気の変化に注意してください。";
  } else if (cancellationProbability < 75) {
    return "試合が中止される可能性があります。公式発表を確認してください。";
  } else {
    return "試合が中止される可能性が高いです。他の予定を検討してください。";
  }
}
