interface CopyButtonProps {
  message: string;
  type?: "text" | "icon";
}
export function CopyButton({ message, type = "icon" }: CopyButtonProps) {
  function copy() {
    navigator.clipboard.writeText(message);
  }
  return (
    <button
      className="cursor-pointer text-gray-900 bg-gray-300 active:scale-95 duration-75"
      title="Copy to clipboard"
      onClick={copy}
    >
      {type === "text" && "Copy"}
      {type === "icon" && <img src="/copy.svg" />}
    </button>
  );
}
