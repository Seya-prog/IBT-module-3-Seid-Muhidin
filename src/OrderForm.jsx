import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from './cart/CartProvider';

const ADDIS_NEIGHBORHOODS = [
  'Bole',
  'Kazanchis',
  'Piazza',
  'Sarbet',
  'Megenagna',
  'CMC',
  'Old Airport',
  'Gotera',
  'Gerji',
  'Summit',
];

export default function OrderForm({ orderTotal = 0 }) {
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const isPhoneValid = /^(09|07)\d{8}$/.test(formData.phone.trim());
  const isNameValid = formData.name.trim().length >= 2;
  const isAreaValid = formData.area !== '';
  const isTotalValid = orderTotal > 0;

  const isFormValid = isNameValid && isPhoneValid && isAreaValid && isTotalValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newOrder = {
      ...formData,
      total: orderTotal,
      orderNumber: 'AE-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubmittedOrder(newOrder);
    setIsSubmitted(true);
    clearCart();
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', area: '' });
    setIsSubmitted(false);
    setSubmittedOrder(null);
  };

  if (isSubmitted && submittedOrder) {
    return (
      <div className="order-confirmation" role="alert">
        <div className="confirmation-icon">✓</div>
        <h3 className="confirmation-title">Order Confirmed!</h3>
        <p className="confirmation-subtitle">
          Thank you, <strong>{submittedOrder.name}</strong>! Your order <strong>#{submittedOrder.orderNumber}</strong> has been received via TeleBirr.
        </p>
        <p className="confirmation-meta">
          Delivery to <strong>{submittedOrder.area}</strong> • Total Paid: <strong>{submittedOrder.total.toLocaleString()} ETB</strong>
        </p>
        <button
          type="button"
          className="btn-order-new"
          onClick={handleReset}
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <div className="order-form-header">
        <h3 className="order-form-title">TeleBirr Quick Delivery</h3>
        <p className="order-form-subtitle">
          Fast delivery across Addis Ababa. Pay securely upon delivery with TeleBirr.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="customer-name" className="form-label">
          Full Name <span className="required-star">*</span>
        </label>
        <input
          id="customer-name"
          name="name"
          type="text"
          className={'form-input ' + (formData.name.trim() !== '' && !isNameValid ? 'form-input--error' : '')}
          placeholder="e.g. Abebe Kebede"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {formData.name.trim() !== '' && !isNameValid && (
          <span className="field-error-message">Please enter at least 2 characters.</span>
        )}
      </div>

      <div className="form-group">
        <div className="form-label-row">
          <label htmlFor="customer-phone" className="form-label">
            TeleBirr Phone Number <span className="required-star">*</span>
          </label>
          <span className="telebirr-pill">telebirr</span>
        </div>
        <input
          id="customer-phone"
          name="phone"
          type="tel"
          className={'form-input ' + (formData.phone.trim() !== '' && !isPhoneValid ? 'form-input--error' : '')}
          placeholder="09XXXXXXXX or 07XXXXXXXX"
          value={formData.phone}
          onChange={handleChange}
          maxLength={10}
          required
        />
        {formData.phone.trim() !== '' && !isPhoneValid ? (
          <span className="field-error-message">Must be a valid 10-digit number starting with 09 or 07.</span>
        ) : (
          <span className="field-hint">Format: 10 digits starting with 09 or 07</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="delivery-area" className="form-label">
          Delivery Neighborhood <span className="required-star">*</span>
        </label>
        <select
          id="delivery-area"
          name="area"
          className="form-input form-select"
          value={formData.area}
          onChange={handleChange}
          required
        >
          <option value="">Select your neighborhood...</option>
          {ADDIS_NEIGHBORHOODS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="order-form-footer">
        <div className="order-summary-row">
          <span className="summary-label">Order Total:</span>
          <span className="summary-value">{orderTotal.toLocaleString()} ETB</span>
        </div>

        {orderTotal === 0 && (
          <p className="order-warning-text">⚠️ Please add at least one dish to your order before submitting.</p>
        )}

        <button
          type="submit"
          className="btn-submit-order"
          disabled={!isFormValid}
        >
          Complete Order ({orderTotal.toLocaleString()} ETB)
        </button>
      </div>
    </form>
  );
}

OrderForm.propTypes = {
  orderTotal: PropTypes.number,
};
