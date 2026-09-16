import PropTypes from 'prop-types';

export default function Field({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  children,
  hint,
  badge,
  inputRef,
  disabled = false,
}) {
  const isInvalid = Boolean(touched && error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [
    hint ? hintId : null,
    isInvalid ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`form-group ${isInvalid ? 'form-group--error' : ''}`}>
      <div className="form-label-row">
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
        {badge && <span className="telebirr-pill">{badge}</span>}
      </div>

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          ref={inputRef}
          className={`form-input form-select ${isInvalid ? 'form-input--error' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
        >
          {children}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          ref={inputRef}
          className={`form-input form-textarea ${isInvalid ? 'form-input--error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
          rows={3}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          ref={inputRef}
          className={`form-input ${isInvalid ? 'form-input--error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
        />
      )}

      {hint && !isInvalid && (
        <span id={hintId} className="field-hint">
          {hint}
        </span>
      )}

      {isInvalid && (
        <span id={errorId} className="field-error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  hint: PropTypes.string,
  badge: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  disabled: PropTypes.bool,
};
