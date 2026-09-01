import Header from './Header';
import Dish from './Dish';
import './App.css';

const dishes = [
  {
    id: 'dish-1',
    name: 'Doro Wat',
    price: 18.50,
    category: 'Traditional Stew',
    description: 'Slow-simmered chicken drumstick in rich berbere sauce with caramelized onions and a hard-boiled egg.',
    isSpecial: true,
  },
  {
    id: 'dish-2',
    name: 'Special Kitfo',
    price: 19.95,
    category: 'Beef Specialty',
    description: 'Minced prime lean beef warmed in spiced clarified butter (niter kibbeh) and fiery mitmita, served with ayib and gomen.',
    isSpecial: true,
  },
  {
    id: 'dish-3',
    name: 'Beyaynetu (Veggie Feast)',
    price: 16.50,
    category: 'Vegetarian / Vegan',
    description: 'Vibrant platter of yellow split peas (kik alicha), spicy red lentils (misir wat), collard greens (gomen), and cabbage.',
    isSpecial: false,
  },
  {
    id: 'dish-4',
    name: 'Sizzling Beef Tibs',
    price: 17.50,
    category: 'Pan Sautéed',
    description: 'Tender beef cubes flash-sautéed with sweet onions, garlic, fresh rosemary, and sliced jalapeño peppers.',
    isSpecial: false,
  },
  {
    id: 'dish-5',
    name: 'Shiro Tegabino',
    price: 14.00,
    category: 'Vegetarian / Vegan',
    description: 'Flavorful spiced chickpea and split pea flour stew, served bubbling hot in a traditional earthenware bowl.',
    isSpecial: false,
  },
  {
    id: 'dish-6',
    name: 'Lamb Awaze Tibs',
    price: 18.95,
    category: 'Pan Sautéed',
    description: 'Succulent cuts of lamb cooked with aromatic onions, garlic, and our signature spicy Awaze pepper paste.',
    isSpecial: false,
  },
  {
    id: 'dish-7',
    name: 'Crispy Veggie Sambusa',
    price: 7.50,
    category: 'Appetizer',
    description: 'Golden, flaky pastry triangles stuffed with delicately seasoned green lentils, onions, and fresh herbs.',
    isSpecial: false,
  },
  {
    id: 'dish-8',
    name: 'Kategna with Ayib',
    price: 8.50,
    category: 'Appetizer',
    description: 'Toasted injera strips glazed with berbere spice and niter kibbeh, paired with fresh mild Ethiopian cottage cheese.',
    isSpecial: false,
  },
  {
    id: 'dish-9',
    name: 'Traditional Coffee Ceremony',
    price: 6.00,
    category: 'Beverage & Tradition',
    description: 'Freshly roasted Ethiopian Arabica coffee brewed in a clay pot (jebena), served with lightly salted popped corn.',
    isSpecial: false,
  },
];

export default function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="menu-container">
        <div className="menu-heading">
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">
            All entrées are served with freshly made teff injera.
          </p>
        </div>

        <section className="dishes-grid" aria-label="Addis Eats Menu Items">
          {dishes.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              category={dish.category}
              description={dish.description}
              isSpecial={dish.isSpecial}
            />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Addis Eats. Made with Vite & React.</p>
      </footer>
    </div>
  );
}
