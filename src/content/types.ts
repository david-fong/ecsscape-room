

export interface EnumDesc {
	/** Must only be specified for one entry in the group. */
	readonly default?: boolean;
	readonly field: string;
	readonly id: string;
	readonly title: string;
	readonly svgId: string;
}

export interface PlayerDesc extends EnumDesc {
	readonly field: "player";
	readonly items: readonly EnumDesc[];
}

export interface ShellDesc {
	readonly formId?: string;
	readonly action: string;
	readonly title: string;
}
