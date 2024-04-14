
const data = fs.readFileSync('./imgs/CSS.png');
//读取资源 
const { mtime } = fs.statSync('./imgs/CSS.png');
//读取修改的时间 
const ifModifiedSince = req.headers['if-modified-since'];
//读取请求头携带的时间（第一次返回给客户端的文件修改时间） 
if (ifModifiedSince === mtime.toUTCString()) {
    // 如果两个时间一致，则文件没被修改过，返回304         
    res.statusCode = 304;
    res.end();//因为缓存生效，不需要返回数据         
    return;// 避免返回新的last-modified
}
res.setHeader('last-modified', mtime.toUTCString())
// 设置文件最后修改时间 
res.setHeader('Cache-Control', 'no-cache');
// 强制设置为协商缓存 
res.end(data);