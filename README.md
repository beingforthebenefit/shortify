# Shortify

Shortify is a URL shortening service built with a modern tech stack including Next.js for the frontend, Node.js with Express for the backend, and Prisma for database management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shorten long URLs
- Copy shortened URLs to clipboard
- Generate QR code for shortened URLs
- Redirect to the original URL when accessing the shortened URL

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Prerequisites

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **Docker**: Install Docker from [docker.com](https://www.docker.com/).
- **Docker Compose**: Install Docker Compose from [docker.com](https://www.docker.com/products/docker-desktop).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/beingforthebenefit/shortify.git
   cd shortify
   ```

2. Install dependencies for both backend and frontend:

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    cd ..
    ```

## Running Locally

1. Ensure Docker is running on your machine.

2. Start the services using Docker Compose:

  ```bash
  docker-compose up --build
  ```

3. The backend will be running on http://localhost:5000 and the frontend will be running on http://localhost:3000.

4. Open http://localhost:3000 in your browser to use the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.
