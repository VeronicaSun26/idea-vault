# English Practice Tool

一个面向「疗愈 + 学习成长」场景的英文沉浸式练习网站。当前项目基于 React + Vite，可在本机和局域网内访问。

## 1) 环境要求

- Node.js 20 或更高版本（推荐 LTS）
- npm 10 或更高版本

如果你电脑还没有 Node.js：

- 方案 A（推荐）：到 [Node.js 官网](https://nodejs.org/) 下载 LTS 安装包并安装
- 安装后执行以下命令确认：

```bash
node -v
npm -v
```

## 2) 安装依赖

在项目根目录执行：

```bash
npm install
```

## 3) 启动开发环境（局域网可访问）

```bash
npm run dev
```

或显式使用局域网脚本：

```bash
npm run dev:lan
```

启动后你会看到类似输出：

- Local: `http://localhost:5173/`
- Network: `http://192.168.x.x:5173/`

同一局域网内的其他设备可直接访问 `Network` 地址。

## 4) 生产预览（可选）

如果你希望先构建再预览：

```bash
npm run build
npm run preview
```

或：

```bash
npm run preview:lan
```

预览服务同样支持局域网访问（默认端口 `4173`）。

## 5) 常见问题

- 其他设备打不开页面：
  - 确认设备和你的电脑在同一个 Wi-Fi/局域网
  - 确认你电脑防火墙允许 Node.js 入站访问
  - 重新查看终端输出里的 `Network` 地址
- 端口占用：
  - 修改 [vite.config.ts](./vite.config.ts) 中 `server.port` / `preview.port`

## 6) 项目来源

该代码由设计稿生成，原始设计参考：

- https://www.figma.com/design/IpsyzwOo7OiBjeoKAUd6Sh/English-Practice-Tool
