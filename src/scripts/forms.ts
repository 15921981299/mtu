function getResultEl(form: HTMLFormElement) {
  return form.querySelector<HTMLElement>('.form-result');
}

function showResult(form: HTMLFormElement, html: string, type: 'success' | 'error' | 'info' = 'success') {
  const result = getResultEl(form);
  if (!result) return;
  result.className = `form-result is-visible is-${type}`;
  result.innerHTML = html;
}

function setLoading(form: HTMLFormElement, loading: boolean) {
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"], .service-form-button');
  if (!submit) return;
  submit.disabled = loading;
  submit.dataset.originalText ??= submit.textContent ?? '';
  submit.textContent = loading ? 'Please wait...' : submit.dataset.originalText;
}

async function handleQuote(form: HTMLFormElement) {
  const name = form.querySelector<HTMLInputElement>('[name="name"]')?.value.trim();
  const email = form.querySelector<HTMLInputElement>('[name="email"]')?.value.trim();
  const message = form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value.trim();

  if (!name || !email || !message) {
    showResult(form, '<strong>Please fill in all fields</strong> to request a quote.', 'error');
    return;
  }

  const endpoint = form.dataset.endpoint ?? '/api/rfq';
  const fallbackEmail = form.dataset.fallbackEmail ?? 'charles@engine-family.com';

  setLoading(form, true);

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);
  formData.append('source', `sidebar:${window.location.pathname}`);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      window.location.href = '/thank-you/?source=sidebar';
      return;
    }

    throw new Error('Server error');
  } catch {
    showResult(
      form,
      `<strong>Something went wrong.</strong> Please email us at <a href="mailto:${fallbackEmail}">${fallbackEmail}</a> or use our <a href="/contact/">full RFQ form</a> to upload a drawing.`,
      'error'
    );
    setLoading(form, false);
  }
}

function trackFormStart(form: HTMLFormElement) {
  let started = false;
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener(
      'focus',
      () => {
        if (started || typeof window.gtag !== 'function') return;
        started = true;
        window.gtag('event', 'form_start', {
          event_category: 'RFQ',
          event_label: `sidebar:${window.location.pathname}`,
        });
      },
      { once: true }
    );
  });
}

document.querySelectorAll<HTMLFormElement>('[data-form="quote"]').forEach((form) => {
  trackFormStart(form);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleQuote(form);
  });
});

