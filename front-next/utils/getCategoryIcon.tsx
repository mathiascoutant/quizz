import {
  FaBook,
  FaBookOpen,
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
} from 'react-icons/fa';

export const getCategoryIcon = (name: string): JSX.Element => {
  switch (name.toLowerCase()) {
    case 'animaux':
      return <FaPaw size={30} className="text-amber-600" />;
    case 'archéologie':
      return <FaSkull size={30} className="text-sand-500" />;
    case 'arts':
      return <FaPalette size={30} className="text-pink-500" />;
    case 'bd':
      return <FaBook size={30} className="text-orange-500" />;
    case 'célébrités':
      return <FaStar size={30} className="text-yellow-500" />;
    case 'cinéma':
      return <FaFilm size={30} className="text-red-500" />;
    case 'culture':
      return <FaTheaterMasks size={30} className="text-purple-500" />;
    case 'gastronomie':
      return <FaUtensils size={30} className="text-green-500" />;
    case 'géographie':
      return <FaGlobeAmericas size={30} className="text-blue-500" />;
    case 'histoire':
      return <FaLandmark size={30} className="text-gray-700" />;
    case 'informatique':
      return <FaLaptopCode size={30} className="text-blue-600" />;
    case 'internet':
      return <FaGlobe size={30} className="text-blue-300" />;
    case 'littérature':
      return <FaBook size={30} className="text-indigo-500" />;
    case 'loisirs':
      return <FaGamepad size={30} className="text-pink-600" />;
    case 'monde':
      return <FaFlag size={30} className="text-green-600" />;
    case 'musique':
      return <FaMusic size={30} className="text-purple-500" />;
    case 'nature':
      return <FaLeaf size={30} className="text-green-400" />;
    case 'quotidien':
      return <FaCalendarDay size={30} className="text-teal-500" />;
    case 'sciences':
      return <FaFlask size={30} className="text-green-500" />;
    case 'sports':
      return <FaFutbol size={30} className="text-blue-500" />;
    case 'télévision':
      return <FaTv size={30} className="text-gray-600" />;
    case 'tourisme':
      return <FaPlane size={30} className="text-cyan-500" />;
    case 'légendes':
      return <FaBookOpen size={30} className="text-indigo-500" />;
    default:
      return <FaQuestionCircle size={30} className="text-gray-500" />;
  }
};
