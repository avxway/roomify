# Roomify | AI-powered Architectural Visualization App

## Table of Contents

- [Introduction](#-introduction)
- [Tech Stack](#️-tech-stack)
- [Features](#-features)
- [Quick Start](#-quick-start)




## Introduction

Roomify is an AI-driven architectural visualization platform built with React, TypeScript, and Puter. It leverages advanced AI models like Claude and Gemini to convert 2D floor plans into stunning, photorealistic 3D renders. The app includes permanent hosting, persistent metadata, serverless worker integration, and a global feed to showcase your creations.

## Tech Stack

- **React**: A component-based JavaScript library for building dynamic, high-performance user interfaces.
- **Vite**: A modern build tool that provides a lightning-fast development environment and optimized production bundles.
- **TypeScript**: Adds static typing to JavaScript, catching errors during development and improving code maintainability.
- **TailwindCSS**: A utility-first CSS framework for rapid UI design and consistent styling directly in your markup.
- **Puter**: A cloud OS providing serverless infrastructure, including Workers, KV storage, and persistent file hosting.
- **Puter.js SDK**: The official bridge for interacting with Puter's cloud services directly from your frontend code.
- **CodeRabbit**: An AI-powered review tool that enhances code quality with automated insights and security checks.
- **Junie by JetBrains**: An integrated AI assistant that automates complex refactoring and logic directly in the IDE.
- **Claude & Gemini**: Cutting-edge LLMs that power the core architectural transformation and image generation logic.

## Features

- **2D-to-3D Magic**: Instantly transform flat architectural sketches into immersive 3D renders using state-of-the-art AI.
- **Permanent Hosting**: Every render is stored permanently with public URLs, ensuring your work is always available.
- **Personal Project Hub**: A dedicated dashboard to track your history, manage projects, and access metadata instantly.
- **Transformation Comparison**: Interactive side-by-side views to visualize the leap from source sketch to AI masterpiece.
- **Community Showcase**: A global feed for sharing your architectural projects and discovering inspiration from others.
- **Granular Privacy**: Take control of your data with flexible public and private visibility settings for every project.
- **Metadata Ownership**: A robust system that maps projects to user IDs for seamless management and tracking.
- **One-Click Export**: High-performance tools to download and integrate AI-generated renders into your professional workflow.

And many more, including scalable architecture and reusable components.

## Quick Start

Get the project running on your local machine in just a few steps.

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm

### Cloning the Repository

```bash
git clone https://github.com/adrianhajdin/roomify
cd roomify
```

### Installation

Install the project dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_PUTER_WORKER_URL=""
```

Get your credentials by signing up at [Puter.com](https://puter.com).

### Running the Project

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to start visualizing!
