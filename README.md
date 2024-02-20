# Astral Accessibility: Open Source Accessibility Widget

![Astral Accessibility](docs/astral.png)

# Astral is in alpha

Astral is currently in an alpha phase. You can use it today with much of its feature set implemented, but it's a few features shy, along with some general polishing away from a 1.x release.

# Overview

Astral Accessibility is an open source accessibility widget that can be easily embedded to any website. It provides a set of
accessibility features that can be used by people with accessibility needs to improve their experience on the web. Read why we
started this project [here](https://blue.verto.health/advancing-accessibility-with-astral/).

[Click here](https://astral-accessibility.pages.dev/) for a demo!

## Features

- Screen Reader (text to speech)
- Contrast
- Saturation
- Text Size
- Text Spacing
- Screen Mask
- Line Height
- More to come!

| Key             | Capability                                                                                                                                                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Screen Reader` | Screen reader is a tool where it would reads out texts on screen where user clicks on. For any html elements, if an aria label is available, the content from aria label would be read out loud, otherwise, it reads the text content of the element. There are 3 different speeds, normal, fast and slow. |
| `Contrast`      | Contrast is a tool that removes background and replaces it with black or white to increase the difference in colours between text and the background to increase legibility. There are 3 modes, the invert colours, high contrast, and dark high contrast.                                                 |
| `Saturation`    | Saturation is a tool that adjusts how colourful the colours are on screen, it has 3 different modes to lower saturation, increase saturation, or remove all the colours on screen (black and white).                                                                                                       |
| `Bigger Text`   | Bigger Text is a tool that increases the size of the texts on screen.                                                                                                                                                                                                                                      |
| `Text Spacing`  | Text Spacing is a tool that increases the spacing between each character on the screen to increase legibility and readibility.                                                                                                                                                                             |
| `Screen Mask`   | Screen Mask is a tool which dims the background and has a smaller focused area which follows the cursor sliding up and down the page.                                                                                                                                                                      |
| `Line Spacing`  | Line Spacing is a tool which increases the space between lines for greater readability.                                                                                                                                                                                                                    |

## Usage

Astral is built with Angular Elements. You can use it in your website in under 30 seconds. To add it, simply include the Javascript and initialize it:

Note: By default this function all will add all available features, for enabling only certain features, see the section below on Customizing Widget.

```html
<script src="https://astral-accessibility.pages.dev/main.js"></script>
<script>
  initializeAstral();
</script>
```

## Customizing Widget

Astral-Accessibility allows you to customize the widget to your needs. This mean you can enable the features you want and hide the features you may not need.
You can choose which widgets should appear by passing an object inside of the `inititalizeAstral` function call. Inside the object include a key called `enabledFeatures` with the value of a list containing strings of which features you want enabled.

Here's an example:

```html
<script>
  initializeAstral({
    filterWidget: ["Contrast", "Bigger Text", "Screen Mask"],
  });
</script>
```

Optionally we can choose which widgets should appear by passing an object inside of function call:

```html
<script>
  initializeAstral({
    enabledFeatures: [
      "Screen Reader",
      "Contrast",
      "Saturation",
      "Bigger Text",
      "Text Spacing",
      "Screen Mask",
      "Line Height",
    ],
  });
</script>
```

## Development Setup

1. Clone the repository

```
git clone git@github.com:verto-health/astral-accessibility.git
```

2. Install dependencies

```
$ yarn install
```

3. Run the development server and visit `http://localhost:8000`

```bash
$ yarn run start:demo
```

This will watch for changes and automatically reload when you make changes in both Angular and the demo app under `projects/demo`.

### Running E2E Tests With Cypress

After running the steps above, you will have access to the Cypress test suite. To run Cypress locally, run the following command in your terminal

```
$ yarn cypress open
```

Choose E2E Testing, and select a browser to start running the Specs

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
