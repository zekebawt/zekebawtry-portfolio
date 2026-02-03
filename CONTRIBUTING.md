# Contributing to Zeke Bawtrey Portfolio

First off, thank you for considering contributing to this project! It's people like you that make this portfolio better.

## Code of Conduct

This project and everyone participating in it is governed by a spirit of respect and collaboration. Be kind, constructive, and professional.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Ensure your code follows the existing code style
5. Run the linter:
   ```bash
   npm run lint
   ```
6. Test your changes locally:
   ```bash
   npm run build
   ```
7. Commit your changes with a clear commit message:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```
8. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
9. Open a Pull Request

#### Pull Request Guidelines

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the TypeScript and React styleguides
- End all files with a newline

## Development Setup

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Setup Steps

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file if needed (see README for environment variables)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing type patterns
- Use strict TypeScript configuration
- Prefer `interface` over `type` for object definitions
- Use explicit return types on exported functions

### React Styleguide

- Use functional components with hooks
- Use the `function` keyword for component declarations
- Place hooks at the top of the component
- Use destructuring for props
- Follow the existing component structure

### CSS/Tailwind Styleguide

- Use Tailwind CSS utility classes
- Use CSS variables for theming
- Follow mobile-first responsive design
- Keep custom CSS to a minimum

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## Questions?

Feel free to open an issue with your question or reach out directly.

Thank you for contributing! 🎉
