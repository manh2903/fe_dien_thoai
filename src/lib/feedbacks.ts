export interface Feedback {
  id: number;
  name: string;
  rating: number;
  content: string;
  product: string;
  city: string;
  date: string;
}

export function pickRandomFeedbacks(
  feedbacks: Feedback[],
  min = 10,
  max = 20
): Feedback[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...feedbacks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
