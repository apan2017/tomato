### 关于

这是一个个人时间任务管理工具，功能模仿 【番茄土豆】，可以自行架设在自己的服务器上。

> 如果你有什么比较想要的功能或者意见，可以在 [github](https://github.com/aiasfina/tomato) 提交 issus :)

### 技术栈

1. Rails 5.0
2. Rails webpacker
3. mithril 1.x
4. mithril stream

### 部署

默认提供了 `docker` 构建，也可以使用本地环境运行。相关环境变量配置可以到 `dockerize/.env` 进行编辑

如果使用 `docker`，请直接运行 `rootPath/build.sh`。

如果手动运行，请先编辑 `rootPath/.env` 环境变量，再使用 `foreman start` 启动进程

> 请注意，由于个人需求，基于 `docker` 时数据库默认使用 `postgresql`，而手动运行则使用 `sqlite3`。

### DEMO
[demo](http://198.71.84.27:3000)

账号: test@sample.com

密码: 123456

### 预览
![](https://raw.githubusercontent.com/aiasfina/tomato/master/shotscreen/1.png)

### LICENSE

MIT
