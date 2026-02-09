<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1gciQf79QX27-RdYgyOjzK9z0lQhgrNDt

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `YOUR_GEMINI_API_KEY` in [app.tsx](app.tsx) to your Gemini API key
3. Run the app:
   `npm run dev`


## Inspiration
Home is more than just a physical space; it’s a reflection of our identity. Yet, the bridge between *imagining* a better space and *seeing* it is often broken. Traditional interior design tools are clunky, static, and require 3D modeling skills. We wanted to build something "Miraculous"—an interface that feels less like software and more like an extension of your imagination. Inspired by the principles of Spatial Computing and Generative UI, we set out to create a tool that respects the soul of a room while reimagining its potential.

## What it does
LUMA is a spatial intelligence engine for interior design.
* **Instant Redesign:** Users upload a photo of their room, and LUMA analyzes the geometry, lighting, and context to "dream" up new versions in seconds.
* **Style Traversing:** With a single click, users can jump between aesthetics—from "Modern Minimalist" to "Neo-Tokyo Cyberpunk."
* **The Compare Slider:** A frictionless way to drift between the current reality and the future design, allowing for pixel-perfect comparison.
* **Context-Aware Consultant:** A built-in AI assistant (powered by Gemini) that explains design choices and offers advice, acting as a high-end interior architect.

## How we built it
We prioritized a "High-Fidelity" user experience.
* **The Core:** Built on **React** and **Vite** for blazing-fast performance.
* **The Brain:** We utilized the **Google Gemini API** (Multimodal capabilities) to "see" the uploaded room images and understand spatial context.
* **The Physics:** We used **Framer Motion** extensively to create the "living" interface—parallax tilt effects, magnetic cursors, and fluid layout transitions that give the app its "Apple-like" premium feel.
* **The Aesthetic:** Styled with **Tailwind CSS**, focusing on a "Glassmorphism" design language (blur filters, translucent layers) to create depth and modern elegance.

## Challenges we ran into
* **The "Uncanny Valley" of UI:** Making a web app feel like a native spatial experience was difficult. We spent hours tuning the physics of the animations so they felt "heavy" and tactile, rather than jittery.
* **Image Alignment:** Ensuring the "Before" and "After" images aligned perfectly for the slider required precise CSS positioning and layout handling.
* **Balancing Latency:** We wanted the experience to feel "Zero Latency." Optimizing the loading states with "Dreaming..." animations helped maintain immersion even while data was processing.

## Accomplishments that we're proud of
* **The "Miraculous" UI:** We successfully achieved a level of visual fidelity that stands out from standard SaaS dashboards. The glass effects and parallax depth truly make the app feel alive.
* **Seamless Comparisons:** The implementation of the drag slider is buttery smooth and visually satisfying.
* **Gemini Integration:** Successfully leveraging multimodal AI to analyze room context.

## What we learned
We learned that **Generative UI** is the future of design. It's not just about generating text or images; it's about generating an *experience* that adapts to the user's intent. We also deepened our mastery of React physics-based animations.

## What's next for LUMA
* **Real-Time Generation:** Integrating faster diffusion models for sub-second rendering.
* **Shoppable Context:** Connecting the AI's suggestions to real furniture APIs so users can buy the items they see.
* **AR Integration:** Letting users project the new designs onto their room through their phone camera.
