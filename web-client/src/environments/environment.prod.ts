export const environment = {
  production: true,
  SERVER_API_URL: 'http://localhost:8080',
  IMAGE_BASE_URL: 'http://localhost:8080/storage/images/',
  POSTS_PER_PAGE: 10,
  MONTHS: {
    en: [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ],
    ru: [
      'Январь', 'Февраль', 'Март', 'Апрель',
      'Май', 'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
  },
  QUILL_TOOLBAR: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  },
  COUNT_OF_SMART_BUTTON_ELEMENTS: 4,
  LANG_KEYS: ['en', 'ru'],
  LANGUAGES: {
    en: '🇺🇸',
    ru: '🇷🇺'
  }
}
