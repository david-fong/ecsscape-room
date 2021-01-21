
export function Editable(p: { placeholder: string }) {
    return <span contentEditable suppressContentEditableWarning spellCheck="false" tabIndex={-1}>{p.placeholder}</span>
}