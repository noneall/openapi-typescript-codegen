import type { Service } from '../client/interfaces/Service';
import { postProcessServiceImports } from './postProcessServiceImports';
import { postProcessServiceOperations } from './postProcessServiceOperations';

export const postProcessService = (service: Service): Service => {
    const clone = { ...service };
    clone.operations = postProcessServiceOperations(clone);
    clone.operations.forEach(operation => {
        clone.imports.push(...operation.imports);
    });
    clone.imports = postProcessServiceImports(clone);
    clone.name = clone.name ? `${clone.name.charAt(0).toLowerCase()}${clone.name.slice(1)}` : clone.name;

    return clone;
};
