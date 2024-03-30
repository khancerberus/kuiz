interface KButtonProps {
  className?: string
  label?: string
  icon?: JSX.Element
  onClick?: () => void
  disabled?: boolean
}

export const KButton = (props: KButtonProps): JSX.Element => {
  return (
    <button
      className={
        'p-2 bg-cyan-700 enabled:hover:bg-cyan-900 transition-colors duration-300 disabled:opacity-75 ' +
        props?.className
      }
      onClick={props?.onClick}
      disabled={props?.disabled}
    >
      {props?.icon}
      {props?.label}
    </button>
  )
}
