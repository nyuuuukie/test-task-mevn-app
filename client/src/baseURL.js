let baseURL = '';

if (process.env.NODE_ENV === 'production') {
	baseURL = "http://localhost:5000"
} else {
	baseURL = "http://localhost:5000"
}

export default {
	baseURL: baseURL
}
