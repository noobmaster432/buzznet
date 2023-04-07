interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, disabled, onChange }) => {
  return (
    <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 text-base bg-black border-2 border-neutral-800 rounded-md outline-none focus:border-2 focus:border-sky-500 transition disabled:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70"
    />
  )
}

export default Input