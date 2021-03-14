let url = '';
if (process.env.NODE_ENV === 'production') {
  url = 'http://119.3.211.106:80';
} else if (process.env.NODE_ENV === 'development') {
  url = '/api'
}

export {
  url
}