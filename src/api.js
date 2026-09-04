export async function loadDishes(category = 'All', { signal } = {}) {
  const response = await fetch('/dishes.json', { signal });

  if (!response.ok) {
    throw new Error(`Failed to load dishes (${response.status}: ${response.statusText || 'Response not ok'})`);
  }

  const dishes = await response.json();

  if (!category || category.toLowerCase() === 'all') {
    return dishes;
  }

  return dishes.filter(
    (dish) =>
      dish.category &&
      dish.category.toLowerCase() === category.toLowerCase()
  );
}

export default loadDishes;
