# MIRAI - Premium Car Dealership Landing Page

A modern, responsive landing page for MIRAI car dealership featuring a sophisticated black and gold color scheme, custom logo, and cutting-edge web technologies.

## 🚗 Features

### Design & Branding
- **Custom MIRAI Logo**: Elegant SVG logo with automotive-inspired design
- **Black & Gold Theme**: Premium color scheme using CSS custom properties
- **Typography**: Beautiful font combinations with Playfair Display and Inter
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox

### Modern Web Features
- **Interactive Carousel**: Auto-rotating vehicle showcase with manual controls
- **Smooth Animations**: CSS animations and JavaScript-powered scroll effects
- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Form Handling**: Contact forms with validation and success notifications
- **Search Functionality**: Real-time vehicle search in inventory
- **Test Drive Modal**: Interactive scheduling system
- **Statistics Counter**: Animated counters for company achievements

### Technical Features
- **CSS Custom Properties**: Consistent theming and easy customization
- **Intersection Observer API**: Performance-optimized scroll animations
- **Modern JavaScript**: ES6+ features and modular code structure
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Accessibility**: Proper semantic HTML and focus management

## 🎨 Color Palette

```css
--primary-black: #0a0a0a      /* Main background */
--secondary-black: #1a1a1a    /* Secondary backgrounds */
--accent-black: #2a2a2a      /* Card backgrounds */
--primary-gold: #D4AF37      /* Primary accent */
--secondary-gold: #B8860B    /* Secondary accent */
--accent-gold: #FFD700       /* Highlight gold */
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### File Structure
```
mirai-landing-page/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎯 Key Sections

### 1. Hero Section
- Compelling headline with MIRAI branding
- Call-to-action buttons
- Rotating vehicle showcase
- Subtle grid pattern background

### 2. Features
- Premium Selection
- Expert Service
- Warranty Protection
- Personal Touch

### 3. Inventory Preview
- Featured vehicles with specifications
- Interactive hover effects
- Search functionality
- View details overlay

### 4. Services
- Vehicle Sales
- Maintenance
- Financing
- Trade-In

### 5. About
- Company story and mission
- Animated statistics
- Professional imagery

### 6. Contact
- Contact information
- Interactive contact form
- Business hours
- Location details

## 🔧 Customization

### Changing Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-gold: #YOUR_COLOR;
    --secondary-gold: #YOUR_COLOR;
    /* ... other colors */
}
```

### Adding Vehicles
Update the inventory section in `index.html`:

```html
<div class="vehicle-card">
    <div class="vehicle-image">
        <img src="path/to/image.jpg" alt="Vehicle Name">
        <div class="vehicle-overlay">
            <button class="btn btn-primary">View Details</button>
        </div>
    </div>
    <div class="vehicle-info">
        <h3>Vehicle Name</h3>
        <p class="vehicle-price">$Price</p>
        <div class="vehicle-specs">
            <span><i class="fas fa-tachometer-alt"></i> HP</span>
            <!-- ... other specs -->
        </div>
    </div>
</div>
```

### Modifying Logo
The logo is an SVG embedded in the HTML. Edit the `logo-svg` elements in both the navigation and footer:

```html
<svg class="logo-svg" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Modify the path and text elements -->
</svg>
```

## 🌟 Modern Features Explained

### Intersection Observer
Used for scroll-triggered animations without performance impact:

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
});
```

### CSS Custom Properties
Dynamic theming and consistent styling:

```css
.btn-primary {
    background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
    box-shadow: var(--shadow-gold);
}
```

### Smooth Scrolling
Enhanced user experience with smooth navigation:

```javascript
window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
});
```

## 📊 Performance Features

- **Lazy Loading**: Images load as needed
- **CSS Grid**: Efficient layout system
- **Optimized Animations**: Hardware-accelerated transforms
- **Minimal JavaScript**: Lightweight and fast
- **Efficient Selectors**: Optimized DOM queries

## 🔒 Browser Support

- **Modern Browsers**: Full support
- **IE11+**: Partial support (some CSS features may not work)
- **Mobile Browsers**: Full responsive support

## 🚀 Deployment

### Static Hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Server Requirements
- Any web server supporting static files
- HTTPS recommended for production
- Gzip compression for better performance

## 📝 License

This project is created for demonstration purposes. Feel free to use and modify for your own projects.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the code comments or create an issue in the project repository.

---

**MIRAI** - Where automotive dreams become reality. 🚗✨
