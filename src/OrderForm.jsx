import { useState } from 'react';
import PropTypes from 'prop-types';

const DELIVERY_AREAS = [
  'Bole',
  'Kazanchis',
  'Sarbet',
  'Piazza',
  'Old Airport',
  'Gerji',
  'CMC',
  'Lebu',
  'Summit',
  'Megenagna',
];

export default function OrderForm({ orderTotal = 0, onOrderSuccess }) {
  // Controlled fields stored in one state object
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    area: false,
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Validation logic
  // Ethiopian TeleBirr format: 09xxxxxxxx or 07xxxxxxxx (10 digits) or +2519xxxxxxxx / +2517xxxxxxxx
  const cleanPhone = formData.phone.replace(/[\s-]/g, '');
  const isPhoneValid = /^(?:(?:\+251)|0)[79]\d{8}$/.test(cleanPhone);
  const isNameValid = formData.name.trim().length >= 2;
  const isAreaValid = formData.area.trim().length > 0;

  const isFormValid = isNameValid && isPhoneValid && isAreaValid;
  const canSubmit = isFormValid && orderTotal > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setOrderSubmitted(true);
    if (onOrderSuccess) {
      onOrderSuccess({ ...formData, orderTotal });
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', area: '' });
    setTouched({ name: false, phone: false, area: false });
    setOrderSubmitted(false);
  };

  if (orderSubmitted) {
    return (
      <div className="order-confirmation" role="alert">
        <div className="confirmation-icon">✓</div>
        <h3 className="confirmation-title">TeleBirr Order Placed!</h3>
        <p className="confirmation-subtitle">
          Thank you, <strong>{formData.name}</strong>. A TeleBirr payment prompt of{' '}
          <strong>{orderTotal.toLocaleString()} ETB</strong> has been sent to{' '}
          <strong>{formData.phone}</strong>.
        </p>
        <p className="confirmation-meta">
          Delivery destination: <strong>{formData.area}</strong>, Addis Ababa.
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
        <h3 className="order-form-title">TeleBirr Instant Delivery</h3>
        <p className="order-form-subtitle">
          Complete your delivery details. Pay securely via TeleBirr.
        </p>
      </div>

      {/* Name Input */}
      <div className="form-group">
        <label htmlFor="customer-name" className="form-label">
          Full Name <span className="required-star">*</span>
        </label>
        <input
          id="customer-name"
          type="text"
          name="name"
          className={`form-input ${touched.name && !isNameValid ? 'form-input--error' : ''}`}
          placeholder="e.g. Abebe Bikila"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.name && !isNameValid && (
          <span className="field-error-message">Please enter a valid full name.</span>
        )}
      </div>

      {/* Phone Input with TeleBirr validation */}
      <div className="form-group">
        <div className="form-label-row">
          <label htmlFor="telebirr-phone" className="form-label">
            TeleBirr Mobile Number <span className="required-star">*</span>
          </label>
          <span className="telebirr-pill">telebirr</span>
        </div>
        <input
          id="telebirr-phone"
          type="tel"
          name="phone"
          className={`form-input ${touched.phone && !isPhoneValid ? 'form-input--error' : ''}`}
          placeholder="e.g. 0911223344 or 0712345678"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {formData.phone && !isPhoneValid ? (
          <span className="field-error-message">
            Must be a valid Ethiopian number starting with 09 or 07 (10 digits).
          </span>
        ) : (
          <span className="field-hint">Format: 09xxxxxxxx or 07xxxxxxxx</span>
        )}
      </div>

      {/* Delivery Area Dropdown */}
      <div className="form-group">
        <label htmlFor="delivery-area" className="form-label">
          Delivery Area (Addis Ababa) <span className="required-star">*</span>
        </label>
        <select
          id="delivery-area"
          name="area"
          className={`form-input form-select ${touched.area && !isAreaValid ? 'form-input--error' : ''}`}
          value={formData.area}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">Select your neighborhood...</option>
          {DELIVERY_AREAS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {touched.area && !isAreaValid && (
          <span className="field-error-message">Please select a delivery area.</span>
        )}
      </div>

      {/* Summary and Submit Button */}
      <div className="order-form-footer">
        <div className="order-summary-row">
          <span className="summary-label">Order Total:</span>
          <span className="summary-value">
            {orderTotal.toLocaleString()} ETB
          </span>
        </div>

        {orderTotal === 0 && (
          <p className="order-warning-text">
            Add at least one dish from the menu above to proceed.
          </p>
        )}

        <button
          type="submit"
          className="btn-submit-order"
          disabled={!canSubmit}
        >
          Pay with TeleBirr ({orderTotal.toLocaleString()} ETB)
        </button>
      </div>
    </form>
  );
}

OrderForm.propTypes = {
  orderTotal: PropTypes.number.isRequired,
  onOrderSuccess: PropTypes.func,
};
