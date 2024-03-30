interface KButtonProps {
  className?: string
  label?: string
  icon?: JSX.Element
  onClick?: () => void
}

export const KButton = (props: KButtonProps): JSX.Element => {
  return (
    <button
      className={'p-2 bg-cyan-700 hover:bg-cyan-900 transition-colors duration-300 ' + props?.className}
      onClick={props?.onClick}
    >
      {props?.icon}
      {props?.label}
    </button>
  )
}
