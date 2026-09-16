import { useState, useRef } from 'react';
import Field from './Field';
import { validate } from './validate';
import { placeOrder } from '../api/orders';
import { useCartStore, selectTotal } from '../cart/cartStore';
import { useAuth } from '../auth/useAuth';

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

export default function Checkout() {
  const total = useCartStore(selectTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const { user } = useAuth();

  // 1. Four fields in one state object
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    area: '',
    notes: '',
  });

  // 2. Touched fields tracking on blur
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    area: false,
    notes: false,
  });

  // 3. Submitting and feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Field refs for error focusing
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const areaInputRef = useRef(null);
  const notesInputRef = useRef(null);

  const fieldRefs = {
    name: nameInputRef,
    phone: phoneInputRef,
    area: areaInputRef,
    notes: notesInputRef,
  };

  // 4. Pure validation derived on every render
  const errors = validate(form, total);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (serverError) setServerError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const focusFirstBadField = (activeErrors) => {
    const errorFieldOrder = ['name', 'phone', 'area', 'notes'];
    for (const fieldName of errorFieldOrder) {
      if (activeErrors[fieldName] && fieldRefs[fieldName]?.current) {
        fieldRefs[fieldName].current.focus();
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched on submit attempt
    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    if (!isValid) {
      focusFirstBadField(errors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const orderPayload = {
        ...form,
        total,
      };

      const result = await placeOrder(orderPayload);
      setConfirmedOrder(result);
      clearCart();
    } catch (err) {
      setServerError(err.message || 'Failed to place order. Please try again.');
      if (err.fieldErrors) {
        focusFirstBadField(err.fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: user?.name || '',
      phone: '',
      area: '',
      notes: '',
    });
    setTouched({
      name: false,
      phone: false,
      area: false,
      notes: false,
    });
    setServerError(null);
    setConfirmedOrder(null);
  };

  if (confirmedOrder) {
    return (
      <div className="order-confirmation" role="alert">
        <div className="confirmation-icon">✓</div>
        <h3 className="confirmation-title">Order Confirmed!</h3>
        <p className="confirmation-subtitle">
          Thank you, <strong>{confirmedOrder.customer}</strong>! Your order <strong>#{confirmedOrder.orderNumber}</strong> has been received via TeleBirr.
        </p>
        <p className="confirmation-meta">
          Delivery to <strong>{confirmedOrder.area}</strong> • Total Paid: <strong>{confirmedOrder.total.toLocaleString()} ETB</strong>
        </p>
        {confirmedOrder.notes && (
          <p className="confirmation-notes">
            <em>Instructions: &ldquo;{confirmedOrder.notes}&rdquo;</em>
          </p>
        )}
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

      {serverError && (
        <div className="form-server-error" role="alert">
          <span className="error-icon">⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Field 1: Name */}
      <Field
        id="checkout-name"
        name="name"
        label="Full Name"
        type="text"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        required
        placeholder="e.g. Abebe Kebede"
        inputRef={nameInputRef}
        disabled={isSubmitting}
      />

      {/* Field 2: TeleBirr Phone */}
      <Field
        id="checkout-phone"
        name="phone"
        label="TeleBirr Phone Number"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        touched={touched.phone}
        required
        placeholder="09XXXXXXXX or 07XXXXXXXX"
        badge="telebirr"
        hint="Format: 10 digits starting with 09 or 07"
        inputRef={phoneInputRef}
        disabled={isSubmitting}
      />

      {/* Field 3: Delivery Area */}
      <Field
        id="checkout-area"
        name="area"
        label="Delivery Neighborhood"
        type="select"
        value={form.area}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.area}
        touched={touched.area}
        required
        inputRef={areaInputRef}
        disabled={isSubmitting}
      >
        <option value="">Select your neighborhood...</option>
        {ADDIS_NEIGHBORHOODS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </Field>

      {/* Field 4: Optional Delivery Notes */}
      <Field
        id="checkout-notes"
        name="notes"
        label="Special Delivery Instructions"
        type="textarea"
        value={form.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.notes}
        touched={touched.notes}
        placeholder="e.g. Near Edna Mall, 3rd gate (optional)"
        hint="Optional notes for our courier (max 200 chars)"
        inputRef={notesInputRef}
        disabled={isSubmitting}
      />

      <div className="order-form-footer">
        <div className="order-summary-row">
          <span className="summary-label">Order Total:</span>
          <span className="summary-value">{total.toLocaleString()} ETB</span>
        </div>

        {total <= 0 && (
          <p className="order-warning-text" role="alert">
            ⚠️ Please add at least one dish to your order before submitting.
          </p>
        )}

        <button
          type="submit"
          className="btn-submit-order"
          disabled={isSubmitting || total <= 0}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="btn-loading-content">
              <span className="btn-spinner"></span>
              Placing Order...
            </span>
          ) : (
            `Place Order • ${total.toLocaleString()} ETB`
          )}
        </button>
      </div>
    </form>
  );
}
