import { useState } from 'react';
import { FabContext, type FabConfig } from './FabContext';

export function FabProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<FabConfig | null>(null);

    const register = (cfg: FabConfig) => setConfig(cfg);
    const unregister = () => setConfig(null);

    return (
        <FabContext.Provider value={{ config, register, unregister }}>
            {children}
        </FabContext.Provider>
    );
}
