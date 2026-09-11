import en from '../assets/i18n/en.json';
import ar from '../assets/i18n/ar.json';

/**
 * Content lives in JSON, so nothing in the type system stops the two locales
 * drifting apart or a stale claim creeping back in. These assertions are the
 * guard rail: the CV is the single source of truth for roles and dates.
 */
describe('site content', () => {

  it('keeps English and Arabic key sets identical', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(ar).sort());
  });

  it('keeps the same number of roles and case studies in both locales', () => {
    expect((en as any)['Experience.Jobs'].length)
      .toBe((ar as any)['Experience.Jobs'].length);
    expect((en as any)['FeatureProjects.Projects'].length)
      .toBe((ar as any)['FeatureProjects.Projects'].length);
  });

  it('lists exactly the employers on the CV', () => {
    const employers = (en as any)['Experience.Jobs'].map((j: any) => j.Tab);
    expect(employers).toEqual([
      'Netsync',
      'Geidea',
      'Softec',
      'ITWORX Education',
      'MEITS',
      'Capital Link Globe',
    ]);
  });

  it('has exactly one current role', () => {
    const current = (en as any)['Experience.Jobs']
      .filter((j: any) => /Present/i.test(j.Date));
    expect(current.length).toBe(1);
    expect(current[0].Tab).toBe('Netsync');
  });

  it('does not understate years of experience', () => {
    const blob = JSON.stringify(en);
    expect(blob).not.toContain('+4 year');
    expect(blob).toContain('9+ years');
  });

  it('carries no leftover third-party attribution in content', () => {
    const blob = JSON.stringify(en) + JSON.stringify(ar);
    expect(blob).not.toContain('andresjosehr');
    expect(blob).not.toContain('muhmmad');
  });

  it('leads the homepage with the platform work', () => {
    const featured = (en as any)['FeatureProjects.Projects'].filter((p: any) => p.featured !== false);
    expect(featured.length).toBe(6);
    expect(featured[0].Title).toBe('Alto NX Platform');

    const arFeatured = (ar as any)['FeatureProjects.Projects'].filter((p: any) => p.featured !== false);
    expect(arFeatured.length).toBe(featured.length);
  });

  it('gives every case study a technology list', () => {
    for (const p of (en as any)['FeatureProjects.Projects']) {
      expect(p.Technologies?.length).toBeGreaterThan(0);
    }
  });
});
