# Zeke Bawtrey Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://zekebawtry.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A modern, responsive portfolio website that seamlessly merges personal portfolio presentation with dashboard functionality. Built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## 🚀 Live Demo

**[View Live Site →](https://zekebawtry.vercel.app)**

## ✨ Features

- **Hero Section** - Eye-catching introduction with animated elements
- **About** - Professional background and personal story
- **Skills** - Interactive visualization of technical expertise
- **Projects** - Showcase of work with detailed case studies
- **Dashboard** - Merged dashboard functionality for data visualization and analytics
- **Blog** - MDX-powered blog for sharing thoughts and tutorials
- **Contact** - Easy ways to get in touch

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Charts:** [Recharts](https://recharts.org/)
- **Content:** [MDX](https://mdxjs.com/) with gray-matter
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com)

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zekebawt/zekebawtry-portfolio.git
cd zekebawtry-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
zekebawtry-portfolio/
├── app/                 # Next.js app router pages
│   ├── blog/           # Blog pages
│   ├── about/          # About section
│   ├── projects/       # Projects showcase
│   ├── dashboard/      # Dashboard functionality
│   └── contact/        # Contact page
├── components/         # React components
│   └── ui/            # shadcn/ui components
├── content/           # MDX blog content
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/            # Global styles
```

## 🎨 Customization

### Colors & Theme

The project uses CSS variables for theming. Edit `app/globals.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... more variables */
}
```

### Content

- Update personal information in the relevant page components
- Add blog posts to the `content/` directory as MDX files
- Add projects to the projects data file

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com) for seamless deployment

---

Made with ❤️ by [Zeke Bawtrey](https://zekebawtry.vercel.app)
