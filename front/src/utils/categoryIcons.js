import {
  FaBook,
  FaCalendarDay,
  FaFilm,
  FaFlag,
  FaFlask,
  FaFutbol,
  FaGamepad,
  FaGlobe,
  FaGlobeAmericas,
  FaLandmark,
  FaLaptopCode,
  FaLeaf,
  FaMusic,
  FaPalette,
  FaPaw,
  FaPlane,
  FaQuestionCircle,
  FaSkull,
  FaStar,
  FaTheaterMasks,
  FaTv,
  FaUtensils,
  FaBookOpen,
} from 'react-icons/fa';

export const getCategoryIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'animaux':
      return <FaPaw className="text-5xl text-brown-500" />;
    case 'archéologie':
      return <FaSkull className="text-5xl text-sand-500" />;
    case 'arts':
      return <FaPalette className="text-5xl text-pink-500" />;
    case 'bd':
      return <FaBook className="text-5xl text-orange-500" />;
    case 'célébrités':
      return <FaStar className="text-5xl text-yellow-500" />;
    case 'cinéma':
      return <FaFilm className="text-5xl text-red-500" />;
    case 'culture':
      return <FaTheaterMasks className="text-5xl text-purple-500" />;
    case 'gastronomie':
      return <FaUtensils className="text-5xl text-green-500" />;
    case 'géographie':
      return <FaGlobeAmericas className="text-5xl text-blue-500" />;
    case 'histoire':
      return <FaLandmark className="text-5xl text-gray-700" />;
    case 'informatique':
      return <FaLaptopCode className="text-5xl text-blue-600" />;
    case 'internet':
      return <FaGlobe className="text-5xl text-blue-400" />;
    case 'littérature':
      return <FaBook className="text-5xl text-indigo-500" />;
    case 'loisirs':
      return <FaGamepad className="text-5xl text-pink-600" />;
    case 'monde':
      return <FaFlag className="text-5xl text-green-600" />;
    case 'musique':
      return <FaMusic className="text-5xl text-purple-500" />;
    case 'nature':
      return <FaLeaf className="text-5xl text-green-400" />;
    case 'quotidien':
      return <FaCalendarDay className="text-5xl text-teal-500" />;
    case 'sciences':
      return <FaFlask className="text-5xl text-green-500" />;
    case 'sports':
      return <FaFutbol className="text-5xl text-blue-500" />;
    case 'télévision':
      return <FaTv className="text-5xl text-gray-600" />;
    case 'tourisme':
      return <FaPlane className="text-5xl text-cyan-500" />;
    case 'légendes':
      return <FaBookOpen className="text-5xl text-indigo-500" />;
    default:
      return <FaQuestionCircle className="text-5xl text-gray-500" />;
  }
};
