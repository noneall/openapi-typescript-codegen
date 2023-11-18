import type { Model } from '../client/interfaces/Model';

export const sortModelsByName = (models: Model[]): Model[] => {
    const seen = new Set();

    return models
        .filter(model => {
            const key = model.name + '|' + model.export;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        })
        .sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA.localeCompare(nameB, 'en');
        });
};
