import type { ShellDesc } from "./defs";

/**
 * Communicates with a server via HTTP.
 */
export namespace Shell {
    export function Console(p: ShellDesc) {
        return <label>
            {p.title}
            <input type="text" formAction={p.action}/>
        </label>;
    }
}