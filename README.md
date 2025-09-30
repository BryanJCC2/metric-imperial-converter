# Metric-Imperial Converter

A full-stack JavaScript application for converting between metric and imperial units, built with Node.js, Express, and modern web technologies.

## Features

- **Full Unit Conversion Support**: Convert between gallons, liters, pounds, kilograms, miles, and kilometers
- **Flexible Input**: Accepts whole numbers, decimals, fractions, and mixed formats
- **RESTful API**: Clean API endpoints for programmatic access
- **Modern Web Interface**: Responsive design with smooth animations and user-friendly interface
- **Comprehensive Testing**: Unit and functional tests ensuring reliability
- **Error Handling**: Clear error messages for invalid inputs

## Supported Units

| Input Unit | Output Unit | Description |
|------------|-------------|-------------|
| gal        | L           | Gallons to Liters |
| L          | gal         | Liters to Gallons |
| lbs        | kg          | Pounds to Kilograms |
| kg         | lbs         | Kilograms to Pounds |
| mi         | km          | Miles to Kilometers |
| km         | mi          | Kilometers to Miles |

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/metric-imperial-converter.git
cd metric-imperial-converter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your preferences
```

4. Start the application:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

### Web Interface

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a value and unit (e.g., "10L", "5.5gal", "3/4mi")
3. Click "Convert" to see the result
4. Use the example buttons for quick testing

### API Usage

Convert units programmatically using the API endpoint:

```bash
GET /api/convert?input=10L
```

Response format:
```json
{
  "initNum": 10,
  "initUnit": "L",
  "returnNum": 2.64172,
  "returnUnit": "gal",
  "string": "10 liters converts to 2.64172 gallons"
}
```

Error responses:
```json
{
  "error": "invalid unit"
}
```

## Testing

Run all tests:
```bash
npm test
```

Run unit tests only:
```bash
npm run test:unit
```

Run functional tests only:
```bash
npm run test:functional
```

## Input Formats

The converter accepts various input formats:

- **Whole numbers**: `10L`, `5gal`
- **Decimals**: `10.5L`, `3.7gal`
- **Fractions**: `3/4mi`, `1/2kg`
- **Mixed fractions**: `3.5/2lbs`
- **No number**: `kg` (defaults to 1)

## Error Handling

The application handles various error scenarios:

- **Invalid number format**: Double fractions like `3/2/3`
- **Invalid units**: Unsupported units like `g`, `m`
- **Missing inputs**: Empty or malformed requests
- **Combined errors**: Both invalid number and unit

## Project Structure

```
metric-imperial-converter/
├── controllers/
│   └── convertHandler.js    # Core conversion logic
├── routes/
│   └── api.js              # API route definitions
├── tests/
│   ├── 1_unit-tests.js     # Unit tests
│   └── 2_functional-tests.js # Functional tests
├── views/
│   ├── index.html          # Main web interface
│   └── 404.html            # Error page
├── public/
│   ├── css/                # Static CSS files
│   └── js/                 # Static JavaScript files
├── server.js               # Main server file
├── package.json            # Project dependencies
├── .env                    # Environment variables
└── README.md               # Documentation
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Testing**: Mocha, Chai, Chai-HTTP
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FreeCodeCamp for the project inspiration
- The open-source community for the excellent tools and libraries

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.