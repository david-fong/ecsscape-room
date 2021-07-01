
export function Editable(p: { placeholder: string }) {
	return <span contentEditable suppressContentEditableWarning spellCheck="false" tabIndex={-1}>{p.placeholder}</span>
}
export function TextInput(p: React.InputHTMLAttributes<HTMLInputElement>) {
	p.size ??= 10;
	return <input type="text" tabIndex={-1} {...p}/>
}