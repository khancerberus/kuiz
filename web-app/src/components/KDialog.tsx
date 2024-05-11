import { useEffect, useRef } from 'react'
import { CircleX } from 'lucide-react'

interface KDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  isOpened: boolean
  onHide?: () => void
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

  return (
    <dialog
      ref={dialogRef}
      {...props}
      className={
        'w-full md:max-w-screen-md rounded-2xl bg-[#1D2B53CC] backdrop:bg-slate-900 backdrop:bg-opacity-70 backdrop:backdrop-blur-md transition-all ' +
        props?.className
      }
    >
      <div className="flex flex-col w-100">
        <header className="flex p-5 w-100 items-center justify-between bg-[#7E2553]">
          <h3 className="flex text-3xl md:text-6xl font-bold">
            {props?.title}
          </h3>
          <CircleX
            onClick={() => {
              props?.onHide?.()
            }}
            className="flex justify-center items-center w-8 h-8 text-3xl hover:text-red-500 transition-all duration-200 rounded-sm hover:cursor-pointer"
          />
        </header>
        <section className="flex flex-col p-5 gap-5">
          {props?.children}
        </section>
      </div>
    </dialog>
  )
}
