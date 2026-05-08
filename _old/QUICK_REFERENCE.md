# 🎯 QUICK REFERENCE GUIDE

## Where to Find Everything

```
Portfolio/
│
├─ 📄 index.html               ← MAIN WEBSITE
│  (Edit here for: name, bio, projects, links, contact)
│
├─ 📁 css/
│  ├─ styles.css               ← STYLING (Edit for: colors, layout, fonts)
│  └─ animations.css           ← ANIMATIONS (Edit for: animation speed)
│
├─ 📁 js/
│  ├─ main.js                  ← FUNCTIONALITY (Navigation, form, scroll)
│  └─ three-setup.js           ← 3D EFFECTS (3D animations, parallax)
│
├─ 📁 assets/
│  ├─ images/                  ← ADD YOUR PROFILE PICTURE HERE
│  └─ icons/
│
├─ 📖 DOCUMENTATION (Read these!)
│  ├─ INDEX.md                 ← START HERE (Navigation guide)
│  ├─ QUICKSTART.md            ← HOW TO GET STARTED
│  ├─ README.md                ← COMPLETE REFERENCE
│  ├─ CONFIGURATION.md         ← CUSTOMIZATION GUIDE
│  ├─ SUMMARY.md               ← PROJECT OVERVIEW
│  └─ PROJECT_COMPLETE.txt     ← COMPLETION REPORT
│
└─ 🔧 .github/
   └─ copilot-instructions.md  ← DEVELOPMENT GUIDELINES
```

---

## 🎨 EASIEST CUSTOMIZATIONS

### 1. Change Accent Color (5 seconds)
**File**: `css/styles.css`
**Line**: 9
**Change**: `--primary-color: #0A74DA;` to any hex color

```css
:root {
    --primary-color: #FF6B6B;  /* Change this to your color */
}
```

### 2. Update Your Name (10 seconds)
**File**: `index.html`
**Line**: ~50
**Change**: Hero title text

```html
<h1 class="hero-title">YOUR NAME HERE</h1>
```

### 3. Update Contact Info (1 minute)
**File**: `index.html`
**Lines**: ~410-425

```html
Email:     Line 410
Phone:     Line 412
GitHub:    Line 418
LinkedIn:  Line 419
```

### 4. Add Profile Picture (2 minutes)
1. Save your image: `assets/images/profile.jpg`
2. **File**: `index.html`
3. **Line**: ~62 (Replace SVG with your image)

```html
<img src="assets/images/profile.jpg" alt="Profile">
```

---

## 📋 BEFORE GOING LIVE CHECKLIST

- [ ] ✅ Opened and viewed locally
- [ ] ✅ Updated your name
- [ ] ✅ Changed accent color (optional)
- [ ] ✅ Added profile picture
- [ ] ✅ Updated email address
- [ ] ✅ Updated phone number
- [ ] ✅ Updated GitHub link
- [ ] ✅ Updated LinkedIn link
- [ ] ✅ Reviewed all project details
- [ ] ✅ Tested on mobile device
- [ ] ✅ Verified all links work
- [ ] ✅ Chosen deployment platform
- [ ] ✅ Deployed online

---

## 🚀 DEPLOYMENT IN 3 STEPS

### Option 1: GitHub Pages (Recommended)
```bash
1. Create GitHub account (free)
2. Create new repository "portfolio"
3. Upload all files from this folder
4. Go to Settings → Pages → main branch
5. Your site: https://yourusername.github.io/portfolio
```

### Option 2: Netlify
```bash
1. Go to netlify.com
2. Click "New site from Git"
3. Select GitHub repo
4. Deploy (automatic)
```

### Option 3: Vercel
```bash
1. Go to vercel.com
2. Import GitHub repository
3. Deploy (one-click)
```

---

## 🎯 FILE EDITING QUICK REFERENCE

### To Change... | Edit File | Line # | What to Search For
---|---|---|---
**Your Name** | index.html | ~50 | `hero-title`
**Your Title** | index.html | ~51 | `hero-subtitle`
**Your Bio** | index.html | ~108 | `about-content`
**Skills** | index.html | ~180 | `skills-grid`
**Projects** | index.html | ~240 | `projects-grid`
**Email** | index.html | ~410 | `mailto:`
**Phone** | index.html | ~412 | `tel:`
**GitHub** | index.html | ~418 | `github.com`
**LinkedIn** | index.html | ~419 | `linkedin.com`
**Color Theme** | css/styles.css | 9 | `--primary-color`
**Fonts** | css/styles.css | 22-23 | `--font-`
**Spacing** | css/styles.css | 25-32 | `--spacing-`
**Animations** | css/animations.css | Various | `@keyframes`

---

## 🔧 CODE SNIPPETS FOR COMMON EDITS

### Change accent color to red:
```css
--primary-color: #FF0000;
```

### Change accent color to green:
```css
--primary-color: #00FF00;
```

### Change accent color to purple:
```css
--primary-color: #9933FF;
```

### Add a new skill:
```html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar"><div class="skill-fill" style="width: 85%"></div></div>
</div>
```

### Add a new project:
```html
<div class="project-card">
    <div class="project-header">
        <h3 class="project-title">Project Name</h3>
        <span class="project-year">2026</span>
    </div>
    <p class="project-description">Description</p>
    <div class="project-tech">
        <span class="tech-badge">Tech1</span>
        <span class="tech-badge">Tech2</span>
    </div>
</div>
```

---

## 📱 HOW TO TEST

### Test Locally:
1. Double-click `index.html`
2. Website opens in browser
3. Make changes, refresh page to see updates

### Test on Phone:
1. Save portfolio to GitHub
2. Enable GitHub Pages
3. Visit your GitHub Pages URL on phone
4. Check if it looks good!

### Test Different Browsers:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

---

## 🐛 QUICK TROUBLESHOOTING

**Page looks broken?**
→ Check all files are in correct folders

**Images not showing?**
→ Verify path is correct (case-sensitive)

**Styles not applying?**
→ Clear browser cache (Ctrl+Shift+Delete)

**JavaScript errors?**
→ Open DevTools (F12) and check console

**Mobile menu not working?**
→ Check JavaScript is enabled

**3D animations not showing?**
→ Add Three.js CDN link (optional)

---

## 💡 QUICK TIPS

1. **Keyboard Shortcut**: Press F12 to open Developer Tools
2. **Live Preview**: Use Python server for live editing:
   ```bash
   python -m http.server 8000
   ```
3. **Image Optimization**: Compress images with TinyPNG
4. **Color Picker**: Use https://htmlcolorcodes.com/
5. **Test Performance**: Use Google Lighthouse

---

## 📚 DOCUMENTATION FILES

| File | Read This For... |
|------|------------------|
| **INDEX.md** | Navigation guide |
| **QUICKSTART.md** | Getting started fast |
| **README.md** | Complete reference |
| **CONFIGURATION.md** | Customization help |
| **SUMMARY.md** | Project overview |
| **PROJECT_COMPLETE.txt** | Completion report |

---

## 🎓 LEARNING RESOURCES

| Topic | Resource |
|-------|----------|
| **HTML** | https://developer.mozilla.org/en-US/docs/Web/HTML |
| **CSS** | https://css-tricks.com/ |
| **JavaScript** | https://javascript.info/ |
| **3D (Three.js)** | https://threejs.org/docs/ |
| **Colors** | https://htmlcolorcodes.com/ |
| **Fonts** | https://fonts.google.com/ |
| **Deployment** | https://pages.github.com/ |

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| Open locally | 30 seconds |
| Change color | 2 minutes |
| Update name | 1 minute |
| Add profile pic | 5 minutes |
| Update all links | 10 minutes |
| Test locally | 5 minutes |
| Deploy to GitHub | 15 minutes |
| **TOTAL** | **~40 minutes** |

---

## 🎉 YOU'RE READY!

Start here:
1. ✅ Read INDEX.md or QUICKSTART.md
2. ✅ Edit your information
3. ✅ Add your photo
4. ✅ Test locally
5. ✅ Deploy online
6. ✅ Share with world!

---

**Questions?** Check the documentation files!
**Good luck!** 🚀
