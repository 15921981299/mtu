const STORAGE_KEY = 'ms_attribution_v1';

export type AttributionTouch = {
  page: string;
  stage: string;
  time: string;
};

export type AttributionData = {
  firstTouchPage: string;
  firstTouchStage: string;
  firstTouchTime: string;
  touches: AttributionTouch[];
};

function inferFunnelStage(path: string): string {
  if (path.startsWith('/contact')) return 'quote';
  if (path.startsWith('/compare')) return 'comparison';
  if (path.startsWith('/case-studies')) return 'signing';
  if (path.startsWith('/certifications')) return 'signing';
  if (path.startsWith('/terms')) return 'signing';
  if (path.startsWith('/standards')) return 'selection';
  if (
    path.startsWith('/products') ||
    path.startsWith('/materials') ||
    path.startsWith('/capabilities') ||
    path.startsWith('/industries') ||
    path.startsWith('/applications') ||
    path.startsWith('/features')
  ) {
    return 'selection';
  }
  if (path.startsWith('/resources')) return 'service';
  if (path.startsWith('/blog')) return 'awareness';
  if (path === '/') return 'awareness';
  return 'awareness';
}

function readAttribution(): AttributionData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : null;
  } catch {
    return null;
  }
}

function writeAttribution(data: AttributionData): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
}

export function trackPageAttribution(): AttributionData {
  const path = window.location.pathname;
  const stage = inferFunnelStage(path);
  const now = new Date().toISOString();
  let data = readAttribution();

  if (!data) {
    data = {
      firstTouchPage: path,
      firstTouchStage: stage,
      firstTouchTime: now,
      touches: [{ page: path, stage, time: now }],
    };
    writeAttribution(data);
    return data;
  }

  const last = data.touches[data.touches.length - 1];
  if (!last || last.page !== path) {
    data.touches.push({ page: path, stage, time: now });
    if (data.touches.length > 15) {
      data.touches = data.touches.slice(-15);
    }
    writeAttribution(data);
  }

  return data;
}

export function getAttributionSnapshot(): AttributionData | null {
  return readAttribution();
}

export function getTouchSummary(data: AttributionData): string {
  return data.touches.map((t) => t.page).join(' → ');
}

export function populateRfqAttributionFields(form: HTMLFormElement): void {
  const data = getAttributionSnapshot() ?? trackPageAttribution();
  const setHidden = (name: string, value: string) => {
    let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  };

  setHidden('first_touch_page', data.firstTouchPage);
  setHidden('first_touch_stage', data.firstTouchStage);
  setHidden('touch_count', String(data.touches.length));
  setHidden('touch_path', getTouchSummary(data));

  const params = new URLSearchParams(window.location.search);
  const urlSource = params.get('source');
  if (urlSource) {
    setHidden('url_source', urlSource);
    const sourceSelect = form.querySelector<HTMLSelectElement>('select[name="source"]');
    if (sourceSelect && !sourceSelect.value) {
      const match = Array.from(sourceSelect.options).find(
        (opt) => opt.value.toLowerCase() === urlSource.toLowerCase()
      );
      if (match) sourceSelect.value = match.value;
    }
  }
}

export function fireAttributionLeadEvent(extra: Record<string, string | number> = {}): void {
  const data = getAttributionSnapshot();
  if (!data || typeof window.gtag !== 'function') return;

  window.gtag('event', 'rfq_attribution', {
    event_category: 'Attribution',
    first_touch_page: data.firstTouchPage,
    first_touch_stage: data.firstTouchStage,
    touch_count: data.touches.length,
    touch_path: getTouchSummary(data).slice(0, 100),
    ...extra,
  });
}
