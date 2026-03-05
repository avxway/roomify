import puter from "@heyputer/puter.js";
import {getOrCreateHostingConfig, uploadImageToHosting} from "./puter.hosting";
import {isHostedUrl} from "./utils";

const PROJECT_PREFIX = 'roomify_project_';

const getUserId = async (userPuter: any) => {
    try {
        const user = await userPuter.auth.getUser();

        return user?.uuid || null;
    } catch {
        return null;
    }
}

export const signIn = async () => {
    try {
        return await puter.auth.signIn();
    } catch (e) {
        console.error("Puter sign in error:", e);
        throw e;
    }
};

export const signOut = async () => {
    try {
        return await puter.auth.signOut();
    } catch (e) {
        console.error("Puter sign out error:", e);
        throw e;
    }
};

export const getCurrentUser = async () => {
    try{
        return await puter.auth.getUser();
    } catch {
        return null;
    }
}

export const createProject = async ({ item, visibility = "private" }: CreateProjectParams): Promise<DesignItem | null | undefined> => {
    const projectId = item.id;

    const hosting = await getOrCreateHostingConfig();

    const hostedSource = projectId ? await uploadImageToHosting({
        hosting, url: item.sourceImage, projectId, label: "source",
    }) : null;

    const hostedRender = projectId && item.renderedImage ? await uploadImageToHosting({
        hosting, url: item.renderedImage, projectId, label: "rendered",}) : null;

    const resolvedSource = hostedSource?.url || (isHostedUrl(item.sourceImage) ? item.sourceImage : '');

    if(!resolvedSource) {
        console.warn('Failed to host source image, skipping save.');
        return null;
    }

    const resolvedRender = hostedRender?.url
        ? hostedRender?.url
        : item.renderedImage && isHostedUrl(item.renderedImage)
            ? item.renderedImage
            : undefined;

    const {
        sourcePath: _sourcePath,
        renderedPath: _renderedPath,
        publicPath: _publicPath,
        ...rest
    } = item;

    const payload = {
        ...rest,
        sourceImage: resolvedSource,
        renderedImage: resolvedRender,
        updatedAt: new Date().toISOString(),
    }

    try{
        const userId = await getUserId(puter);
        if(!userId) {
            console.error('Authentication Failed');
            return null;
        }

        const key = `${PROJECT_PREFIX}${item.id}`;
        await puter.kv.set(key, payload);

        return payload as DesignItem;
    } catch(e: any) {
        console.error(`Failed to save the project`, e);
        return null;
    }
}

export const getProjects = async () => {
    try {
        const userId = await getUserId(puter);
        if(!userId) {
            console.error('Authentication Failed');
            return [];
        }

        const projects = (await puter.kv.list(PROJECT_PREFIX, true))
            .map(({value}: any) => ({ ...value, isPublic: true}))

        return Array.isArray(projects) ? projects as DesignItem[] : [];
    } catch(e) {
        console.error('Failed to fetch projects', e);
        return [];
    }
}

export const getPublicProjects = async () => {
    try {
        const userId = await getUserId(puter);
        if(!userId) {
            console.error('Authentication Failed');
            return [];
        }

        const projects = (await puter.kv.list(PROJECT_PREFIX, true))
            .map(({value}: any) => ({ ...value, isPublic: true}))

        return Array.isArray(projects) ? projects as DesignItem[] : [];
    } catch(e) {
        console.error('Failed to fetch public projects', e);
        return [];
    }
}

export const getProjectById = async ({ id }: { id: string }) => {
    console.log("Fetching project with ID:", id);

    try {
        const userId = await getUserId(puter);
        if(!userId) {
            console.error('Authentication Failed');
            return null;
        }

        const key = `${PROJECT_PREFIX}${id}`;
        const project = await puter.kv.get(key);

        if (!project) {
            console.error("Project not found");
            return null;
        }

        console.log("Fetched project data:", project);

        return project as DesignItem;
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return null;
    }
};