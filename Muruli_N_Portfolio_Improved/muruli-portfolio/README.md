# Muruli N — Full-stack Developer Portfolio

A responsive, dark-first developer portfolio built with semantic HTML, CSS, and native JavaScript modules. It highlights Muruli's supplied experience, education, skills, credentials, and three projects. No framework, package installation, API key, or build step is required.

## Run locally

```sh
cd dist
python -m http.server 8080
```

Open http://localhost:8080. Use a local server because the site loads JavaScript as ES modules.

## Deploy

Publish the contents of `dist/` to any static hosting provider (for example, GitHub Pages, Netlify, or Vercel). Set the publish/output directory to `dist` if deploying from the repository root.

## Project structure

- `dist/index.html` — page structure, metadata, accessible landmarks, content sections, and project dialog.
- `dist/style.css` — responsive dark-first design system, layout, interactions, reduced-motion handling, and optional light theme.
- `dist/app.js` — project/skill/credential rendering, navigation, theme toggle, project dialog, copy-email action, and scroll effects.
- `dist/content.js` — editable profile, project, skill, and credential data.
- `dist/assets/Muruli_N_Resume.pdf` — supplied résumé, retained unchanged.
- `dist/assets/muruli-portrait-480.webp`, `muruli-portrait-800.webp` — supplied responsive portrait assets.

## Editing content

Update `dist/content.js` to change profile details, project descriptions, skills, or credentials. Update `dist/index.html` for section copy and `dist/style.css` for visual changes. Keep project IDs in `content.js` unique because they are used by the project detail dialog.

## Accuracy notes

- Profile, academic, internship, project, and credential details are based on the supplied résumé and original portfolio content.
- The project diagrams are original CSS illustrations, not product screenshots or evidence of production deployment.
- No project-specific repository or live-demo URLs were supplied. The portfolio links to the supplied GitHub profile, without inventing project URLs.
- The Blue-Green project is described as a deployment pattern; no production uptime or deployment-speed measurements are claimed.
- The Sentiment Analysis project has no supplied benchmark score, so no model accuracy is claimed.
- Deloitte is described as a virtual job simulation, not employment.
- The résumé PDF and portrait images were retained from the uploaded archive.

## Accessibility and behavior

- Semantic landmarks, skip link, visible keyboard focus, descriptive image text, and responsive navigation.
- Mobile navigation opens/closes with a button and Escape key.
- Project details use a native dialog, support Escape, and return focus to the triggering button.
- Theme preference is stored locally when browser storage is available.
- Reduced-motion preferences are respected.
- Email uses a real `mailto:` link; the copy button reports clipboard success or failure.
- The site has no contact form that pretends to submit data.
