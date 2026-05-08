<!-- Copilot Custom Instructions for Portfolio Project -->

# Portfolio Website - Development Instructions

This is a modern, dark-themed personal portfolio website for Mantripragada Rama Naga Sai Abhinav. The project uses HTML5, CSS3, JavaScript, and Three.js for 3D animations.

## Project Overview

- **Type**: Static Personal Portfolio Website
- **Framework**: Vanilla HTML5, CSS3, JavaScript (no build tools required)
- **Styling**: GitHub-inspired dark theme with blue accents (#0A74DA)
- **Animations**: CSS animations + Three.js for 3D hero background
- **Responsiveness**: Mobile-first, fully responsive design

## File Structure

```
Portfolio/
├── index.html              # Main HTML file with all sections
├── css/
│   ├── styles.css         # Core styling (1200+ lines)
│   └── animations.css     # Animation keyframes
├── js/
│   ├── main.js           # Navigation, scroll, interactions
│   └── three-setup.js    # Three.js 3D background setup
├── assets/               # For images and icons (currently empty)
├── README.md            # Comprehensive documentation
└── .github/
    └── copilot-instructions.md (this file)
```

## Key Features Implemented

✅ Sticky navigation with active section indicators
✅ Smooth scroll behavior throughout
✅ Responsive hamburger menu for mobile
✅ Dark theme with blue accent color
✅ 7 main sections: Hero, About, Skills, Projects, Services, Experience, Contact
✅ CSS animations with Intersection Observer
✅ 3D hero background (Three.js with SVG fallback)
✅ Contact form with validation
✅ Accessibility features (WCAG compliant)
✅ Mobile-first responsive design
✅ Parallax mouse tracking effects

## Development Guidelines

### Adding New Content

1. **Hero Section**: Edit the hero content directly in HTML
2. **About Section**: Modify text and info cards in index.html
3. **Skills**: Add/modify skill items in the skills-grid
4. **Projects**: Add new project-card divs with details
5. **Services**: Add service-card elements for new services
6. **Experience**: Add experience-item divs to timeline
7. **Contact**: Update email, phone, and social links

### Customizing Styles

**Color Scheme**: Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0A74DA;
    --dark-bg: #0d1117;
    --text-primary: #c9d1d9;
    /* etc. */
}
```

**Spacing**: Modify `--spacing-*` variables
**Typography**: Update `--font-body` and `--font-code`
**Animations**: Adjust timing in `--transition-*` variables

### JavaScript Enhancements

- **main.js**: Handles navigation, scrolling, form validation
- **three-setup.js**: Manages 3D background and parallax effects
- All functions are modular and well-commented

### Adding Three.js

Currently, Three.js animations use a fallback SVG if library isn't loaded. To enable full 3D:

Add before closing `</body>` tag in index.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

## Integration Points

### Contact Form

Currently shows success/error notifications. To make it functional:

**Option 1: Formspree**
```javascript
// In js/main.js, modify form submission
form.action = "https://formspree.io/f/YOUR_FORM_ID";
form.method = "POST";
```

**Option 2: EmailJS**
- Add EmailJS script before main.js
- Update contact form handler with EmailJS API calls

**Option 3: Backend Service**
- Point form submission to your backend endpoint
- Handle validation server-side

### Adding Images

1. Place images in `assets/images/` folder
2. Update profile placeholder SVG or add `<img>` tags
3. Use lazy loading for performance:
```html
<img src="image.jpg" loading="lazy" alt="description">
```

## Performance Optimization

- Minify CSS/JS for production
- Optimize images (WebP format recommended)
- Enable gzip compression on server
- Use CDN for external resources (Google Fonts, Three.js)
- Implement caching headers

## Browser Compatibility

- Chrome, Firefox, Safari, Edge: Full support
- IE 11: Partial support (no Three.js animations)
- Mobile: Tested on iOS Safari, Chrome Mobile

## Accessibility Checklist

✅ Semantic HTML structure
✅ Proper color contrast (WCAG AA)
✅ Keyboard navigation support
✅ ARIA labels where needed
✅ Focus indicators visible
✅ Prefers-reduced-motion supported
✅ Mobile touch targets (48px minimum)

## Testing Recommendations

1. **Responsive**: Test at 320px, 768px, 1024px, 1920px widths
2. **Performance**: Run through Google PageSpeed Insights
3. **Accessibility**: Use axe DevTools browser extension
4. **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
5. **Mobile**: Test on actual devices or emulators

## Deployment Checklist

- [ ] Update all personal links (GitHub, LinkedIn, email)
- [ ] Add profile image to assets/images/
- [ ] Integrate contact form backend
- [ ] Test all forms and interactions
- [ ] Run accessibility audit
- [ ] Optimize images
- [ ] Enable HTTPS
- [ ] Set up DNS records
- [ ] Configure CDN if needed
- [ ] Add analytics (Google Analytics, Vercel Analytics)

## Common Customizations

### Change accent color from blue to another color:
1. Replace `#0A74DA` with new color in CSS variables
2. Update all references in animations and hover states

### Remove Three.js background:
1. Comment out `<script src="js/three-setup.js"></script>`
2. The hero section will use gradient CSS fallback

### Add dark/light mode toggle:
1. Create toggle button in navbar
2. Add JS to switch between CSS variable sets
3. Save preference in localStorage

### Add blog section:
1. Create new section in HTML
2. Add styling to css/styles.css
3. Link blog posts or embed medium.com feeds

## Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "Initial portfolio setup"

# Making changes
git checkout -b feature/feature-name
git add .
git commit -m "Description of changes"
git push origin feature/feature-name

# Deploy
git checkout main
git merge feature/feature-name
git push origin main
```

## Maintenance

- Update project dates and descriptions periodically
- Refresh links to GitHub repositories
- Update skills as you learn new technologies
- Add new projects as you complete them
- Monitor for broken links quarterly
- Keep dependencies updated (if using package manager)

## Support Resources

- Three.js Documentation: https://threejs.org/docs/
- CSS Tricks: https://css-tricks.com/
- MDN Web Docs: https://developer.mozilla.org/
- Web Accessibility: https://www.w3.org/WAI/

## Future Enhancements

- Blog section with markdown support
- Dark/light mode toggle
- Multilingual support
- Blog comments system
- Project filtering by technology
- Testimonials section
- Newsletter signup
- API-driven content from GitHub/LinkedIn

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready
