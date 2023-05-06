import Styles from './LoadingButton.module.css';

const LoadingButton = ({ isLoading, setIsLoading, click, text }) => {

  const handleClick = (e) => {
    e.preventDefault();
    click();
  };

  return (
    <button
      className={`font-semibold flex items-center justify-center w-full text-center text-white h-12 py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${isLoading ? 'bg-gray-300' : 'bg-pink-500'}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className={Styles.dotFlashing}>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};


export default LoadingButton;
