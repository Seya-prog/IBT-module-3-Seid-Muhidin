import { memo } from 'react';
import PropTypes from 'prop-types';

function CategoryBarComponent({
  categories = ['All'],
  selectedCategory = 'All',
  onSelect,
}) {
  return (
    <nav className="category-bar" aria-label="Menu categories">
      <div className="category-chips">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={'category-chip ' + (isSelected ? 'category-chip--active' : '')}
              onClick={() => onSelect && onSelect(category)}
              aria-pressed={isSelected}
            >
              {category}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

CategoryBarComponent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export const CategoryBar = memo(CategoryBarComponent);
export default CategoryBar;
