/**
 * Array of routes that are used for authentication.
 * @type {string[]}
 *
 */
export const publicRoutes = ["/"];

/**
 * Array of routes that are used for authentication.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication
 *  @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";
