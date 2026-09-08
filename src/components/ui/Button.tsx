import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-accent bg-accent text-accent-foreground hover:border-accent-hover hover:bg-accent-hover',
  secondary: 'border-border-strong bg-surface text-text-primary hover:border-accent hover:text-accent',
  ghost: 'border-transparent bg-transparent text-text-primary hover:bg-accent-soft hover:text-accent-hover',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-11 px-4 text-sm',
  large: 'min-h-12 px-5 text-base',
}

function getButtonClassName(variant: ButtonVariant, size: ButtonSize, className: string) {
  return `inline-flex items-center justify-center gap-2 rounded-control border font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
}

export function Button({ variant = 'primary', size = 'default', icon: Icon, className = '', children, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(variant, size, className)}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4.5 shrink-0" /> : null}
      {children}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
}

export function ButtonLink({ variant = 'primary', size = 'default', icon: Icon, className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link className={getButtonClassName(variant, size, className)} {...props}>
      {Icon ? <Icon aria-hidden="true" className="size-4.5 shrink-0" /> : null}
      {children}
    </Link>
  )
}
