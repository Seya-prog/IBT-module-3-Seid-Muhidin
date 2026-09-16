export function validate(form, orderTotal = 0) {
  const errors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }

  const phonePattern = /^(09|07)\d{8}$/;
  if (!form.phone || !phonePattern.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid 10-digit TeleBirr number starting with 09 or 07.';
  }

  if (!form.area || form.area.trim() === '') {
    errors.area = 'Please select a delivery neighborhood in Addis Ababa.';
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = 'Special delivery instructions cannot exceed 200 characters.';
  }

  if (orderTotal <= 0) {
    errors.general = 'Your order is empty. Please add dishes to your cart before checking out.';
  }

  return errors;
}

export default validate;
