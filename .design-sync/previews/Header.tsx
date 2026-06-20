import { Header } from 'jeisson-rodriguez-resume';

// Header takes no props — content comes from i18next + the router context,
// both wired into every card via .design-sync/config.json (extraEntries +
// provider). Real nav links, real brand mark, real language/theme toggles.
export function Default() {
    return <Header />;
}
