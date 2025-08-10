export type ReactState = 'PASSIVE' | 'DEFENSIVE' | 'AGGRESSIVE';
export declare function resolveReactState(state: ReactState): 2 | 0 | 1;
export declare function getReactState(id: number): ReactState;
