import { Link } from 'react-router-dom';

const categoriesFixture = [
  {
    name: 'Animaux',
  },
  {
    name: 'Art',
  },
];

export const CategoriesPage = () => {
  return (
    <div className="container mx-auto mt-24">
      <div className="grid grid-cols-4 gap-12">
        {categoriesFixture.map((category, index) => (
          <Link
            to={`/categories/${category.name.toLowerCase()}/quizz`}
            key={index}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
