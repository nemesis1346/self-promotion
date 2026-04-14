
# 🎨 Self-Promotion Portfolio  
This is a **React application** showcasing my personal portfolio. It pulls content from my blog and links all my projects and works. The project utilizes:  

- **Firebase**  
- **React** & **Redux-Thunk**  
- **Materialize-CSS**  

---

## 🚀 Versions  
Make sure to use the specified versions below when working within Docker containers to avoid compatibility issues:  

| **Tool**        | **Version**    | **Notes**                                  |
|-----------------|----------------|--------------------------------------------|
| Node            | 20.18.0        |                                             |
| NPM             | 10.8.2         |                                             |
| Sass            | 1.79.5         | Updated to avoid previous compatibility issues |
| NVM             | Node 20.18.0   | Ensure the correct Node version is used    |

---

## 🛠 Installation Steps  

1. From the project root, build and start the container:
```bash
docker compose up --build
```

2. Wait for the output line:
```
Compiled successfully!
```

3. Open your browser at:
```
http://localhost:8080
```

> **Note:** On subsequent runs you can skip `--build` and just use `docker compose up`.

---

## 🌐 Deployment on GitHub Pages  
1. From the project root, run:  

```bash
npm run build
npm run deploy
```

⚠️ **Note:** The DNS configuration is specified in the `package.json`. Make sure to review it before deploying.

---

