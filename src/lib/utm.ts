// UTM Parameter Tracking Utility
// Captures UTM params from URL, stores them in sessionStorage, and integrates with GA4

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const UTM_STORAGE_KEY = 'medispero_utm_params';

export type UtmParams = Partial<Record<typeof UTM_PARAMS[number], string>>;

/**
 * Capture UTM parameters from the current URL and store in sessionStorage.
 * Called once on app mount.
 */
export const captureUtmParams = (): UtmParams | null => {
  try {
    const url = new URL(window.location.href);
    const params: UtmParams = {};
    let hasUtm = false;

    for (const key of UTM_PARAMS) {
      const value = url.searchParams.get(key);
      if (value) {
        params[key] = value;
        hasUtm = true;
      }
    }

    if (hasUtm) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
      // Send to GA4 as campaign details
      if (typeof window.gtag === 'function') {
        window.gtag('set', {
          campaign_source: params.utm_source,
          campaign_medium: params.utm_medium,
          campaign_name: params.utm_campaign,
          campaign_term: params.utm_term,
          campaign_content: params.utm_content,
        });
      }
      return params;
    }

    return getStoredUtmParams();
  } catch {
    return null;
  }
};

/**
 * Get stored UTM params from the current session.
 */
export const getStoredUtmParams = (): UtmParams | null => {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

/**
 * Generate a UTM-tagged URL for marketing campaigns.
 */
export const buildUtmUrl = (
  baseUrl: string,
  params: {
    source: string;
    medium: string;
    campaign: string;
    term?: string;
    content?: string;
  }
): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);
  if (params.term) url.searchParams.set('utm_term', params.term);
  if (params.content) url.searchParams.set('utm_content', params.content);
  return url.toString();
};
