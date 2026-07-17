export interface PurchaseNotification {
  id: number;
  name: string;
  phone: string;
  product: string;
}

export interface PurchaseNotificationDisplay extends PurchaseNotification {
  maskedPhone: string;
  minutesAgo: number;
  timeLabel: string;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 7) return digits + "xxx";
  return digits.slice(0, 7) + "xxx";
}

export function formatTimeAgo(minutesAgo: number): string {
  if (minutesAgo < 1) return "Vừa xong";
  if (minutesAgo === 1) return "1 phút trước";
  if (minutesAgo < 60) return `${minutesAgo} phút trước`;
  return "1 giờ trước";
}

export function preparePurchaseNotifications(
  items: PurchaseNotification[]
): PurchaseNotificationDisplay[] {
  return items.map((item) => {
    const minutesAgo = Math.floor(Math.random() * 60);
    return {
      ...item,
      maskedPhone: maskPhone(item.phone),
      minutesAgo,
      timeLabel: formatTimeAgo(minutesAgo),
    };
  });
}

export function shuffleNotifications<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}
