import { createApiInstance } from "../utils/createApiInstance";

const publicApi = createApiInstance({ isPublic: true });
const authApi = createApiInstance({ isPublic: false });

export { publicApi, authApi };
