# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0]

### CHORE: Updating backend url to point to render - 2023-05-23

- Heroku free tier have been discontinued
- moved deployment to Render https://dashboard.render.com/select-repo?type=web
- Added new render hosted url https://orange-backend.onrender.com/graphqlapi

### OT-3: Added Typescript support and other version updates - 2023-05-22

- Replace Webpack 3 with Webpack 5 using latest CRA with TS
- Convert all js files to ts/tsx
- Suppress TS error in many places (to be fixed in OT-21)
- Introduce few types where applicable
- Added:
  - Side fix: Orange logo alighment fix
  - CHANGELOG.md file
  - Various library type definition files
