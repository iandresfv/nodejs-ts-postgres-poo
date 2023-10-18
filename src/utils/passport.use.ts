import passport, { type Strategy } from 'passport';

export type TypeStrategy<T, U, X> = { new (params: U, callback: X): T };

export function passportUse<T extends Strategy, U, X>(
    name: string,
    Strategy: TypeStrategy<T, U, X>,
    params: U,
    callback: X,
) {
    passport.use(name, new Strategy(params, callback));
}
