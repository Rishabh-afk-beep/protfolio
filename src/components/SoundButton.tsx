import { ReactNode, forwardRef } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SoundButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  onHoverSound?: boolean;
  onClickSound?: boolean;
  [key: string]: any;
}

const SoundButton = forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ children, onClick, className = '', onHoverSound = true, onClickSound = true, ...props }, ref) => {
    const { playHover, playClick } = useSoundEffects();

    const handleMouseEnter = () => {
      if (onHoverSound) playHover();
    };

    const handleClick = () => {
      if (onClickSound) playClick();
      onClick?.();
    };

    return (
      <button
        ref={ref}
        className={className}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SoundButton.displayName = 'SoundButton';

export default SoundButton;
