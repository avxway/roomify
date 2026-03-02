import puter from "@heyputer/puter.js";

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