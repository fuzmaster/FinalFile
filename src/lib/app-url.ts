const FALLBACK_APP_URL = "http://localhost:3000";

export function getAppUrl() {
  const value = process.env.NEXT_PUBLIC_APP_URL?.trim();

  return value && value.length > 0
    ? value.replace(/\/$/, "")
    : FALLBACK_APP_URL;
}

export function getProjectDeliveryUrl(publicSlug: string) {
  return `${getAppUrl()}/deliver/${publicSlug}`;
}
