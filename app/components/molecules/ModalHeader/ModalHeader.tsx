// ModalHeader.tsx
import Heading from '~/components/atoms/Heading/Heading'

interface ModalHeaderProps {
  title: string;
  onBack?: () => void;
  align?: 'left' | 'center' | 'right';
  backButtonTitle?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onBack, align = 'center', backButtonTitle = 'Back' }) => {
  const titleStyle: React.CSSProperties = {
    textAlign: align,
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Back button clicked');
    onBack && onBack();
  };

  const backButton = (
    <button
      className="cursor-pointer flex items-center"
      onClick={(e) => handleBackClick(e)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        style={{
          marginRight: '8px',
          transform: align === 'right' ? 'rotate(180deg)' : 'none',
        }}
      >
        <path
          d="M0.182616 9.42216C0.217836 9.37068 0.258351 9.32166 0.304163 9.27585L9.14259 0.43742C9.72568 -0.14567 10.6692 -0.147569 11.259 0.442302C11.8448 1.02809 11.8502 1.9724 11.2639 2.55874L3.82594 9.9967L11.2578 17.4286C11.8409 18.0117 11.8428 18.9552 11.2529 19.545C10.6672 20.1308 9.72285 20.1363 9.13651 19.5499L0.298085 10.7115C-0.0545897 10.3588 -0.0959125 9.8145 0.182616 9.42216Z"
          fill="currentColor"
        ></path>
      </svg>
      <span className="select-none">{backButtonTitle}</span>
    </button>
  );

  return (
    <div className="" style={{ width: '100%' }}>
      <div className="flex items-center form-header mb-4">
        {onBack && align !== 'center' && backButton}
        <div
          className="form-title-modal select-none"
          style={{
            ...titleStyle,
            ...(onBack && align === 'center' ? { textAlign: 'center' } : {}),
          }}
        >
          {title}
        </div>
        {onBack && align === 'center' && backButton}
      </div>
    </div>
  );
};

export default ModalHeader;