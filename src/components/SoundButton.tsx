import { ReactNode, forwardRef } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onHoverSound?: boolean;
  onClickSound?: boolean;
}

const SoundButton = forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ children, onClick, className = '', onHoverSound = true, onClickSound = true, ...props }, ref) => {
    const { playHover, playClick } = useSoundEffects();

    const handleMouseEnter = () => {
      if (onHoverSound) playHover();
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClickSound) playClick();
      onClick?.(event);
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
