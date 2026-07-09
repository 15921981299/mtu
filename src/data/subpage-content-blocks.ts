/** Shared HTML footers for capability/material/product subpages — avoid identical 4-box templates sitewide. */

export function subpageExperienceNote(text: string): string {
  return `<div class="shop-note" style="background:#f0f5ff;border-left:4px solid #146ef5;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;"><h4 style="margin:0 0 8px;color:#146ef5;font-size:16px;">From the shop floor</h4><p style="margin:0;line-height:1.6;">${text}</p></div>`;
}

export const subpageCaseStudyRef = `<div class="case-ref" style="background:#faf5ff;border-left:4px solid #8b5cf6;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;"><h4 style="margin:0 0 8px;color:#7c3aed;font-size:16px;">See it in practice</h4><p style="margin:0;">Browse <a href="/case-studies/" style="color:#146ef5;font-weight:500;">verified case studies</a> with tolerances, inspection scope, and measured outcomes — not generic marketing copy.</p></div>`;

export const subpageQuoteCta = `<p style="margin-top:20px;"><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">Request a Quote →</a></p>`;

export function subpageFooter(experienceNote: string): string {
  return `${subpageExperienceNote(experienceNote)}${subpageCaseStudyRef}${subpageQuoteCta}`;
}
