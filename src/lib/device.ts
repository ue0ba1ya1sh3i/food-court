export function isChromeBook() {
  const deviceInfo = navigator.userAgent

  // Chrome Bookかの判定
  return deviceInfo.includes("CrOS") || deviceInfo.includes("Chromebook")
}
