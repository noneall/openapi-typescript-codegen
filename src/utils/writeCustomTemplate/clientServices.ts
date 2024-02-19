import { readFile, remove } from 'fs-extra';
import Handlebars from 'handlebars';
import { resolve } from 'path';

import { Client } from '../../client/interfaces/Client';
import { HttpClient } from '../../HttpClient';
import { Indent } from '../../Indent';
import { mkdir, writeFile } from '../fileSystem';
import { formatCode } from '../formatCode';
import { formatIndentation } from '../formatIndentation';
import { isDefined } from '../isDefined';
import { registerHandlebarTemplates } from '../registerHandlebarTemplates';

export const writeClientServicesCustomTemplate = async (
    client: Client,
    outputPath: string,
    httpClient: HttpClient,
    useOptions: boolean,
    useUnionTypes: boolean,
    indent: Indent,
    postfixServices: string,
    postfixModels: string,
    templatePath: string,
    exportClient: boolean,
    exportModels: boolean,
    exportSchemas: boolean,
    clientName?: string
) => {
    registerHandlebarTemplates({
        httpClient,
        useUnionTypes,
        useOptions,
        handlebars: Handlebars, // since we're not using precompiled templates, we need a different object here
    });

    const serviceTemplate = Handlebars.compile(await readFile(templatePath, 'utf8'));

    const servicesDir = resolve(outputPath, 'store');
    // await remove(servicesDir);
    await mkdir(servicesDir);

    for (const service of client.services) {
        const file = resolve(outputPath, `store/${service.name}${postfixServices}.ts`);
        const templateResult = serviceTemplate({
            ...service,
            serviceBaseUrl: client.server,
            httpClient,
            useUnionTypes,
            useOptions,
            postfixServices,
            postfixModels,
            exportClient: isDefined(clientName) && exportClient,
            exportModels,
            exportSchemas,
        });
        await writeFile(file, formatIndentation(formatCode(templateResult), indent));
    }
};