/** */
export const RuleBuilders: RuleBuilder[] = [];

export interface RuleBuilder {
	readonly selectors: string[],
	readonly declarations: string,
}