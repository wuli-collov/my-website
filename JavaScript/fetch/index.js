const response = await fetch('http://localhose:1134/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llam3',
    prompt,
    stream: false,
  }),
});

const result = await response.json();
