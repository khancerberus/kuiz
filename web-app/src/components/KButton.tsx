interface KButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  label?: string
  icon?: JSX.Element
}

export const KButton = (props: KButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={
        'p-2 rounded-lg bg-[#FF004D] enabled:hover:bg-[#7E255388] transition-colors duration-300 disabled:bg-slate-600 disabled:text-slate-400 ' +
        props?.className
      }
    >
      {props?.icon}
      {props?.label}
    </button>
  )
}
