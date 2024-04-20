import { useEffect, useRef } from 'react'

interface KDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  isOpened: boolean
}

export const KDialog = (props: KDialogProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (props.isOpened) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [props.isOpened])
  return <dialog ref={dialogRef} {...props}>{props.children}</dialog>
}
