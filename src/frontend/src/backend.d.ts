import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Email = string;
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    getTotalWaitlistCount(): Promise<bigint>;
    getUserPosition(email: Email): Promise<bigint>;
    submitEmail(email: Email): Promise<bigint>;
}
