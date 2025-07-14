const express = require('express');
const router = express.Router();
router.post('/ask', async function (req, res) {
  const question = req.body.question || '';
  const prompt = `
  你是一个中文智能助手，请使用中文回答用户的问题。
  问题：${question}
  `;
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.1',
      prompt,
      stream: true,
    }),
  });
  //   const result = await response.json();
  //   res.json({ anser: result.response });

  //   处理流式返回数据
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  //   获取一个可读流
  const reader = response.body.getReader();
  //   创建一个解码器
  const decoder = new TextDecoder('utf-8');
  //   不断读取 ollama
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    // 有可能包含空行字符 \n
    const lines = chunk.split('\n').filter((line) => line.trim());
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        console.log(data, ':data');
        if (data.response) {
          res.write(`${JSON.stringify({ response: data.response })}\n`);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  res.end();
});
module.exports = router;
