import { useState } from 'react'
import { Link } from 'react-router-dom'

function AuthFormCard({
  title,
  subtitle,
  fields,
  buttonLabel,
  helperText,
  helperLinkText,
  helperLinkTo,
  onSubmit,
  error,
}) {
  const [wait, setWait] = useState(false)

  function onFormSubmit(e) {
    e.preventDefault()
    if (onSubmit == null) {
      return
    }
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    setWait(true)
    const result = onSubmit(data)
    if (result != null && typeof result.then === 'function') {
      result.finally(function () {
        setWait(false)
      })
    } else {
      setWait(false)
    }
  }

  return (
    <section className="mx-auto mt-6 w-full max-w-[min(100%,30rem)] text-white sm:mt-9 md:mt-12">
      <h1 className="mb-2 break-words text-white">{title}</h1>
      <p className="mb-6 font-medium leading-snug text-zinc-200">{subtitle}</p>

      {error && error !== '' ? (
        <p className="note-text mb-4 text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <form className="flex flex-col gap-3" onSubmit={onFormSubmit} noValidate>
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            className="min-h-12 w-full touch-manipulation rounded-sm border border-white/35 bg-black/30 px-4 text-base font-normal text-white placeholder:text-zinc-300 sm:min-h-[52px] sm:text-[15px]"
            inputMode={field.type === 'email' ? 'email' : undefined}
          />
        ))}

        <button
          type="submit"
          disabled={wait}
          className="mt-1 min-h-12 w-full touch-manipulation rounded-sm bg-[#0d9488] text-[1.35rem] font-semibold leading-none tracking-[-0.01em] text-white enabled:hover:opacity-95 disabled:opacity-60 sm:min-h-[52px] sm:text-[1.6rem] md:text-[1.75rem]"
        >
          {wait ? 'Please wait…' : buttonLabel}
        </button>
      </form>

      {helperText && helperLinkText && helperLinkTo ? (
        <p className="note-text mt-4 text-zinc-300">
          {helperText}{' '}
          <Link to={helperLinkTo} className="font-medium text-white no-underline hover:text-zinc-100">
            {helperLinkText}
          </Link>
        </p>
      ) : null}
    </section>
  )
}

export default AuthFormCard
