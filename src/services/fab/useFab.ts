import { useContext, useEffect } from 'react';
import { FabContext, type FabConfig } from './FabContext';

export function useFab(config?: FabConfig) {
    const ctx = useContext(FabContext);

    useEffect(() => {
        if (!config) return;
        ctx.register(config);
        return () => ctx.unregister();
    }, [config, ctx]);

    return {
        register: ctx.register,
        unregister: ctx.unregister,
    };
}
