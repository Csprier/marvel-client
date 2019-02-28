// REQUIRED
export const required = value => !value ? 'Required field' : undefined;

// If there is a value, check that it isn't jsut spaces
export const nonEmpty = value => {
	if(value) {
		return !value.trim()
			? 'Field can\'t be blank'
			: undefined;
	}
};

// If there is a value, check that there are no trailing or beginning spaces
export const isTrimmed = value => {
	if(value) {
		return value.trim() !== value
			? 'Cannot start or end with whitespace'
			: undefined;
	}
};

// Use regex to confirm the value looks like an email
export const validEmail = value =>
	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email'
		: undefined;

// Use regex to confirm the value looks like a phone number   
export const validPhone = value =>
	!/^\d{10}(?:\*55\d{0,4})?$/.test(value)
		? 'Invalid phone number'
		: undefined;

// check length is as long and short as it should be
export const length = length => value => {
	if (length.min && value.length < length.min) {
		return `Must be at least ${length.min} characters long`;
	}
	if (length.max && value.length > length.max) {
		return `Must be at most ${length.max} characters long`;
	}
};

// check that the field matches another field
export const matches = field => (value, allValues) =>
	field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Does not match';

export const passwordsMatch = field => (value, allValues) =>
	field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Passwords don\'t match'

// MASTER OBJECT
export const validators = {
	required: (value) => (value) ? undefined : 'Required',
	maxLength: (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined,
	number: (value) => (value) && isNaN(Number(value)) ? 'Must be a number' : undefined,
	minValue: (min) => (value) => value && value < min ? `Must be at least ${min}` : undefined,
	validEmail: (value) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : undefined,
	passwordsMatch: (field) => (value, allValues) =>
		field in allValues && value.trim() === allValues[field].trim()
			? undefined
			: 'Passwords don\'t match',
	matches: (field) => (value, allValues) =>
		field in allValues && value.trim() === allValues[field].trim()
			? undefined
			: 'Does not match',
	length: (length) => (value) => {
		if (length.min && value.length < length.min) {
			return `Must be at least ${length.min} characters long`;
		}
		if (length.max && value.length > length.max) {
			return `Must be at most ${length.max} characters long`;
		}
	},
	validPhone: (value) =>
		!/^\d{10}(?:\*55\d{0,4})?$/.test(value)
			? 'Invalid phone number'
			: undefined,
	isTrimmed: value => {
		if (value) {
			return value.trim() !== value
				? 'Cannot start or end with whitespace'
				: undefined;
		}
	},
	nonEmpty: (value) => {
		if (value) {
			return !value.trim()
				? 'Field can\'t be blank'
				: undefined;
		}
	}
}