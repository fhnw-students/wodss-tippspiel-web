import { platforms } from "./../models/platforms";

// -------------------------------------------------------------------------
// Global config values
// -------------------------------------------------------------------------

declare var NAME: string;
declare var VERSION: string;
declare var PLATFORM: string;
declare var CONFIG: AppConfigEnv;

// -------------------------------------------------------------------------
// Environment configuration
// -------------------------------------------------------------------------

export interface AppConfigEnv {
  NAME: string;
  API_MAIN_URL: string;
  API_UAM_URL: string;
  LOG_LEVEL: string;
}

// -------------------------------------------------------------------------
// Config helper functions
// -------------------------------------------------------------------------

export const getAppName = (): string => NAME;
export const getAppVersion = (): string => VERSION;
export const getAppPlatform = (): string => PLATFORM;
export const getAppConfig = (): AppConfigEnv => CONFIG;
export const platformIsBrowser = (): boolean => getAppPlatform() === platforms.BROWSER;
export const platformIsMobile = (): boolean => getAppPlatform() === platforms.MOBILE;
