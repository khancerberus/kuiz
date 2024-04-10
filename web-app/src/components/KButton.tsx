interface KButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  label?: string
  icon?: JSX.Element
}

export const KButton = (props: KButtonProps): JSX.Element => {
  return (
    <button
      className={
        'p-2 bg-cyan-700 enabled:hover:bg-cyan-900 transition-colors duration-300 disabled:opacity-75 ' +
        props?.className
      }
      {...props}
    >
      {props?.icon}
      {props?.label}
    </button>
  )
}
