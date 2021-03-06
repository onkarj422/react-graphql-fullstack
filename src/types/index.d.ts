/* eslint-disable @typescript-eslint/naming-convention */
declare const __CLIENT__: boolean;
declare const __SERVER__: boolean;
declare const __DEV__: boolean;

declare module '*.svg';
declare module '*.gif';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.css';
declare module '*.scss';

declare global {
    namespace NodeJS {
        interface Global {
            __CLIENT__: boolean;
            __SERVER__: boolean;
            __DEV__: boolean;
        }
    }
}
