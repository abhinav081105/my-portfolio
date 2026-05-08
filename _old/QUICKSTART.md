# 🚀 Quick Start Guide

## Get Your Portfolio Online in 3 Steps

### Step 1: Open the Portfolio
Simply open the `index.html` file in your web browser:
- **Windows**: Double-click `index.html`
- **Mac**: Double-click `index.html` or `right-click → Open With → Browser`
- **Linux**: Double-click `index.html` or use `xdg-open index.html`

Or serve locally with a simple HTTP server:

**Using Python 3:**
```bash
cd "c:\Users\mantr\OneDrive\Desktop\Portfolio"
python -m http.server 8000
# Visit http://localhost:8000 in your browser
```

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd "c:\Users\mantr\OneDrive\Desktop\Portfolio"
http-server
# Visit http://localhost:8080 in your browser
```

### Step 2: Customize Your Content
Edit `index.html` to update:
- Your name and bio
- Project details and links
- Skills and experience
- Contact information
- Social media links

Edit `css/styles.css` to customize:
- Color theme (change `--primary-color: #0A74DA` to any hex color)
- Fonts and spacing
- Any design elements

### Step 3: Deploy Online

**Option A: GitHub Pages (FREE)**
1. Create a GitHub account at github.com
2. Create a new repository named `portfolio`
3. Upload all files to the repository
4. Go to Settings → Pages → Select main branch
5. Your site will be live at `https://yourusername.github.io/portfolio`

**Option B: Netlify (FREE)**
1. Go to netlify.com and sign up
2. Click "New site from Git" or drag & drop the Portfolio folder
3. Your site will be deployed automatically
4. Free custom domain available

**Option C: Vercel (FREE)**
1. Go to vercel.com and sign up
2. Import the repository
3. One-click deployment
4. Automatic HTTPS and CDN

## 📋 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Main website structure (edit for content) |
| `css/styles.css` | All styling and layout |
| `css/animations.css` | Animation definitions |
| `js/main.js` | Navigation, scrolling, form handling |
| `js/three-setup.js` | 3D animations and effects |
| `README.md` | Complete documentation |
| `.github/copilot-instructions.md` | Development guidelines |

## 🎨 Easy Customizations

### Change the Blue Accent Color
Open `css/styles.css` and find this section:
```css
:root {
    --primary-color: #0A74DA;
```
Replace `#0A74DA` with any hex color code you like.

### Update Your Name
Open `index.html`, find this line:
```html
<h1 class="hero-title">Mantripragada Rama Naga Sai Abhinav</h1>
```
Replace with your name.

### Update Contact Info
Find these sections and update:
```html
<a href="mailto:mantripragadaabhinav@gmail.com">
<a href="tel:+918185923808">
<a href="https://github.com/abhinav081105">
<a href="https://www.linkedin.com/in/...">
```

### Add Your Profile Picture
1. Save your image to `assets/images/profile.jpg`
2. Find the profile placeholder (around line 60)
3. Replace the SVG with: `<img src="assets/images/profile.jpg" alt="Profile">`

## 🔧 Enable 3D Animations

Add this line before `</body>` in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

Without it, a fallback SVG animation runs automatically.

## 📊 Performance Tips

1. **Compress images**: Use TinyPNG or similar before uploading
2. **Minify CSS/JS**: Use minifiers for production
3. **Enable GZIP**: Ask your hosting provider
4. **Use CDN**: For Google Fonts and external libraries

## ✅ Testing Checklist

Before going live:
- [ ] All links work (test GitHub, LinkedIn, email)
- [ ] Form submissions work (integrate backend if needed)
- [ ] Mobile version looks good (test on phone)
- [ ] Scrolling is smooth
- [ ] All sections are visible
- [ ] Contact info is correct

## 🆘 Troubleshooting

**Animations not working?**
- Check browser console for errors (F12)
- Enable JavaScript in your browser
- Clear browser cache (Ctrl+Shift+Delete)

**Form not submitting?**
- This is normal - you need to integrate with a backend
- See README.md for Formspree or EmailJS setup

**Mobile menu not opening?**
- Try different browser
- Clear cache and reload
- Check if JavaScript is enabled

**Pages look broken?**
- Check that all files are in correct folders
- Verify CSS and JS file paths in HTML
- Use a different browser to test

## 📚 Learning Resources

- **HTML/CSS**: https://developer.mozilla.org/
- **JavaScript**: https://javascript.info/
- **Design**: https://css-tricks.com/
- **Deployment**: https://docs.github.com/pages

## 🎯 Next Steps

1. ✅ Customize your content
2. ✅ Add your profile picture
3. ✅ Integrate contact form (optional)
4. ✅ Test on mobile
5. ✅ Deploy to GitHub Pages, Netlify, or Vercel
6. ✅ Share your portfolio!

## 💡 Pro Tips

- Add Google Analytics for traffic tracking
- Use Google Fonts for better typography
- Optimize images with WebP format
- Test accessibility with axe DevTools
- Monitor performance with Lighthouse

---

**Need help?** Check the README.md file for more detailed documentation.

Happy coding! 🚀
