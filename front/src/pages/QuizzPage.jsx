import backgroundImage from '../assets/background.jpg';
import coinIcon from '../assets/coin.png';
import userIcon from '../assets/user.png';

function QuizzPage() {
  return (
    <div
      className="bg-black bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col justify-between px-5 pr-10 relative text-white overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <h1 className="text-center text-4xl mt-5 z-10 relative">
        En quelle année s'est déroulé la première guerre mondiale ?
      </h1>

      <div className="relative flex-grow flex justify-center items-center z-10">
        <div className="absolute h-0.5 bg-white transform -rotate-45 w-2/5"></div>
        <button className="absolute left-1/2 -translate-x-[calc(50%+150px)] py-2 px-5 border-2 border-white rounded bg-transparent text-white cursor-pointer text-lg transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20">
          1942
        </button>
        <button className="absolute right-1/2 translate-x-[calc(50%+150px)] py-2 px-5 border-2 border-white rounded bg-transparent text-white cursor-pointer text-lg transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20">
          1927
        </button>
      </div>

      <div className="flex justify-between items-end w-full py-2.5 z-10 relative">
        <div className="flex items-center">
          <span className="text-lg">John Doe</span>
          <img src={userIcon} alt="User" className="w-7 h-7 ml-1" />
        </div>

        <div className="flex flex-col items-center">
          <img src={coinIcon} alt="Coin" className="w-7 h-7" />
          <span className="text-lg">100</span>
        </div>
      </div>
    </div>
  );
}

export default QuizzPage;
