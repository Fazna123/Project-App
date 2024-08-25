
# Project App

This application allows the users to manage their activities and tasks efficiently. It allows the users to create projects and then add tasks and manage them within the project. Users can also export a secret gist for every project with a markdown file with all project details get downloaded along with gist creation.

## Features

-- **User Authentication**: Secure user authentication using JWT and cookies.

-- **Create New Project** : Users can create projects 

-- **Manage Todos**: Users can create todos within the project. Users can edit, delete and mark the todos done.

-- **Export Summary**: A project summary can be exported as secret gist in github. The gist url is automatically get copied to clipboard for further use.

-- **Markdown File**: A .md file of every project is getting downloaded automatically along with the gist export.

## Stack

- **Backend:** NodeJs , express;
- **Frontend:** JavaScript, React, Redux, TailwindCSS
- **Database:** Mongodb
- **GitHub API:** For exporting gists

## Setup and Installation

### Backend Setup

```
git clone https://github.com/Fazna123/Project-App.git
cd backend
npm install //To install dependencies
npm run dev //To start the server
```
### Frontend Setup

```
cd frontend
npm install
npm run dev
```

### Backend Environment Variables
```.Environment
MONGO_URL = '' //Mongodb connection string
JWT_SECRET_KEY = ''  //Your JWT secret
GIHUB_PERSONAL_ACCESS_TOKEN = '' //Github personal access token to create gist
```

### Frontend Environment Variables
```.Environment
VITE_BASE_URL = ' '  //Backend url
```


## Usage
1. Login to access the home page
1. Create a New Project:

- Go to the home page.
- Enter a project title and click "Create Project".
3. Manage Todos:

- Click on a project to view its details.
- Add, edit, or remove todos.
- Mark todos as pending or complete.
4. Export Project Summary:

- Click on "Export Gist" to generate and export the project summary.
- A Markdown file will be saved locally.
- The gist URL will be copied to your clipboard.


