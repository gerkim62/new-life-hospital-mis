const unauthorizedResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unauthorized Access</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
    }

    .container {
      background: rgba(255, 255, 255, 0.95);
      padding: 2.5rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      text-align: center;
      backdrop-filter: blur(10px);
      animation: fadeIn 0.8s ease-out;
      max-width: 90%;
      width: 400px;
    }

    .icon {
      font-size: 4rem;
      color: #e74c3c;
      margin-bottom: 1rem;
      animation: shake 0.5s ease-in-out;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: 600;
    }

    p {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.6;
      font-size: 1.1rem;
    }

    .button {
      background: linear-gradient(45deg, #2980b9, #3498db);
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 50px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      animation: pulse 2s infinite;
    }

    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    }

    .error-code {
      font-family: monospace;
      color: #95a5a6;
      margin-top: 1rem;
      font-size: 0.9rem;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <i class="fas fa-lock icon"></i>
    <h1>Access Denied</h1>
    <p> Please log in with your credentials to continue.</p>
    <button class="button" onclick="location.reload()">
      <i class="fas fa-sign-in-alt"></i>
      Login Now
    </button>
    <div class="error-code">Error 401: Unauthorized</div>
  </div>
</body>
</html>`;

export { unauthorizedResponse };
