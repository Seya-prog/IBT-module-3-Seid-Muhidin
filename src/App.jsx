import Header from './Header';
import Menu from './Menu';
import { menuData } from './data';
import './App.css';

export default function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="menu-container">
        <div className="menu-heading">
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">
            Authentic delicacies freshly prepared with traditional spices. All entrées served with fresh injera.
          </p>
        </div>

        <Menu dishes={menuData} />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Addis Eats • Made with React & Vite • TeleBirr Delivery Service</p>
      </footer>
    </div>
  );
}
