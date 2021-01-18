
declare namespace TU {
	/**
	 * ### My alias for Readonly<T>
	 */
	type RoArr<T> = ReadonlyArray<T>;

	/**
	 * ### My No-Readonly<T>
	 */
	type NoRo<T extends object> = {
		-readonly [ K in keyof T ]: T[K];
	};

	// Same as ts3.5, but errs if K is not a key of T.
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

	// Same as ts builtin, but errs if K is not a key of T.
	type Pikk<T, K extends keyof T> = Pick<T, K>;

	// Same as ts builtin, but errs if K is not a key of T.
	type Xcld<T, K extends T> = Exclude<T, K>;

	// not used/needed yet.
	//type Modify<T, R extends Partial<Record<keyof T, any>>> = Omit<T, keyof R> & R;

	// not used/needed yet.
	//type Require<T, K extends keyof T> = T & Pick<Required<T>, K>;

	type Primitive = string | number | boolean | undefined | null | Function | symbol;

	/**
	 * Courtesy of [masterkidan](https://gist.github.com/masterkidan/7322752f569b1bba53e0426266768623).
	 */
	type DeepRo<T> =
		  T extends Map<infer U, infer V> ? ReadonlyMap<DeepRoObj<U>, DeepRoObj<V>>
		: T extends Set<infer U> ? ReadonlySet<DeepRoObj<U>>
		: T extends Promise<infer U> ? Promise<DeepRoObj<U>>
		: T extends Primitive ? T
		: T extends (infer A)[] ? DeepRoArr<A>
		: DeepRoObj<T>;
	interface DeepRoArr<T> extends RoArr<DeepRo<T>> {}
	type DeepRoObj<T> = { readonly [P in keyof T]: DeepRo<T[P]> };
}